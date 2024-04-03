import React, { useEffect, useMemo, useState , useCallback} from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { useHistory } from "react-router-dom"
import { Box, makeStyles, Button, Typography } from '@material-ui/core'
import { useNotiStackContext } from 'ipretty/context/Notistack'
import { initialPramsCourse , sortFieldName} from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import IconImage from "ipretty/components/IconImage"
import Filter from 'ipretty/components/Filter'
import DataTable from 'ipretty/components/Table/DataTable'
import DiscountService from 'ipretty/services/DiscountService'
import Edit from 'public/icon_svg/Edit.svg'
import moment from 'moment';
import DiscountEdit from './DiscountEdit'
import DialogView from 'ipretty/components/Dialog/DialogView'

const useStyles = makeStyles(theme => ({
    managementView: {
        padding: 32,
        [theme.breakpoints.down('xs')]: {
            padding: 10,
         },
         [theme.breakpoints.up('sm')]: {
            padding: 20,
         },
        "& .view": {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(1),
            marginTop: 28,
        },
    },
   
}))

function DiscountView (props) {
    const {  setIsShowPopupAddDiscount , setIsShowPopupListDiscount  , isShowPopupAddDiscount} = props
    const classes = useStyles()
    const { makeShortMessage } = useNotiStackContext();
    const { getTranslation } = useAuth()
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const [dataDiscount , setDataDiscount] = useState([])
    let history = useHistory()
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [isFilterData, setIsFilterData] = useState(false)
    const [isSort, setIsSort] = useState(false)
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const [ids , setIds] = useState('')
    const status = useMemo(() => [
        { id: 0, name: getTranslation('Expires') },
        { id: 1, name: getTranslation('Present') },
        {id : 2 , name : getTranslation('notstartedyet')}
    ], [])
    const [isShowPopupEditDiscount, setIsShowPopupEditDiscount] = useState(false)
    const type = useMemo(() => [
        { id: 'percent', name: '%'},
        { id: 'money', name: 'VND' },
    ], [])

    const columns = useMemo(() => [
        { name: 'stt', title: getTranslation('Stt'), align: 'center' },
        { name: 'title', title: getTranslation('Programname'), icon: true ,sortData: handleSort },
        { name: 'discount_code', title: getTranslation('Discountcode'), icon: true ,sortData: handleSort },
        { name: 'expired_at', title: getTranslation('Endtime'), icon: true  ,sortData: handleSort},
        { name: 'sale_price', title: getTranslation('Discount'), icon: true  ,sortData: handleSort},
        { name: 'unit', title: getTranslation('Unit'), icon: true  ,sortData: handleSort},
        { name: 'status', title: getTranslation('status'), icon: true  ,sortData: handleSort},
        { name: "", title: "", type: "detail" , iconEdit: <IconImage srcIcon={Edit} /> }
    ], [dataDiscount])

    const filters = [
        { id: 1, list: type, fieldFilter: 'type', placeholder: getTranslation('Unit') + '---', widthItem: 160 },
        { id: 2, list: status, fieldFilter: 'status', placeholder: getTranslation('status') + '---', widthItem: 160 },
    ]

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSort) {
                        setLoading(true)
                        getListAllDiscount(params, isSort, fieldName, defautSort)
                    }
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [isSort]);

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isFilterData) {
                        setLoading(true);
                        getListAllDiscount(params);
                    }
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [isFilterData]);

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (reload) {
                        setLoading(true);
                        getListAllDiscount({ ...params, paging: 1 });
                    }
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [reload]);

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    getListAllDiscount(params);
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, []);

    function getListAllDiscount(params , sort, fieldName, defautSort) {
        DiscountService.getAllDiscount({ ...params },
            res => {
                handleShowData(res , sort, fieldName, defautSort)
            }),
            err => {
                console.log(err)
            }
    }

    function handleShowData(res, sort, fieldName, defautSort) {
        const discount = res.data.data.data
        const total = res.data.data.total
        const current_page = res.data.data.current_page;
        console.log(res)
        discount.map((data, index) => {
            data.stt = index + 1
            if (data.type === 'money') {
                data.unit = 'VND'
            } else {
                data.unit = '%'
            }
            if (moment(data.expired_at).valueOf() < moment(new Date()).valueOf()) {
                data.status =  getTranslation('Expires')
            } else if (moment(data.time_start).valueOf() < moment(new Date()).valueOf() &&  moment(new Date()).valueOf() < moment(data.expired_at).valueOf() ) {
                data.status =  getTranslation('Present')
            } else if (moment(data.time_start).valueOf() > moment(new Date()).valueOf() ) {
                data.status =  getTranslation('notstartedyet')
            }
             return data
        })
        if (sort) {
            discount.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
        }
        setDataDiscount(discount)
        setLoading(false)
        setIsFilterData(false)
        setIsSort(false)
        const _params = {
            ...params,
            page: current_page,
            total: total,
        };
        setParams(_params)
    }

    function handleSort (fieldNameSort) {
        if (currentFieldName == fieldNameSort) {
            setDefaultSort(defautSort + 1)
        } else {
            setDefaultSort(0)
        }
        setCurrenFieldName(fieldNameSort)
        setFieldName(fieldNameSort)
        setIsSort(true)
    }

    function handleSearch (value, fields) {
        const _params = { ...params, page: 1, keyword: value, fieldName: fields };
        setParams(_params)
        setIsFilterData(true)
    }
    
    function handleData(nameField, value) {
        if (nameField == 'status') {
            let ids = getListId(status, value)
            setParams({ ...params, [nameField]: ids })
        }else if (nameField == 'type') {
            let ids = getListId(type, value)
            setParams({ ...params, [nameField]: ids })
        }
    }

    function getListId(list, listChild) {
        let datas = list.filter(val => listChild.includes(val.name))
        return datas.map(item => item.id)
    }

    function handleCloseEditDiscount () {
        setIsShowPopupEditDiscount(false)
    }
    const getDataAfterSave = useCallback(e => {
        getListAllDiscount(params);
    }, [])

    function handleActionFilter() {
        setIsFilterData(true)
    }

    function redirectDetail(value ,row) {
        setIds(row.id)
        // setIsShowPopupListDiscount(false)
        setIsShowPopupEditDiscount(true)
    }

    const handlePageChange = (queryObj) => {
        setParams({ ...queryObj })
        setIsFilterData(true)
    }

    return (
        <div className={classes.managementView}>
                <div className="view">
                    <Filter
                        isSearch={true}
                        handleSearch={handleSearch}
                        filters={filters}
                        handleData={handleData}
                        handleActionFilter={handleActionFilter}
                    />
                    <DataTable
                        rows={dataDiscount}
                        columns={columns}
                        loading={loading}
                        optPaging={params}
                        getTranslation={getTranslation}
                        fieldId={'id'}
                        noSelection={true}
                        redirectDetail={redirectDetail}
                        handlePageChange={handlePageChange}
                    />
                </div>
                {isShowPopupEditDiscount && (
                    <DialogView 
                        maxWidth='md'
                        openDialog={isShowPopupEditDiscount}
                        handleClose={handleCloseEditDiscount}
                        title='Discountcodeinformation'
                    >
                        <DiscountEdit 
                            id={ids}
                            getDataAfterSave={getDataAfterSave}
                            setIsShowPopupEditDiscount={setIsShowPopupEditDiscount}
                            setIsShowPopupListDiscount={setIsShowPopupListDiscount}
                        />
                    </DialogView>
                )}
        </div>
    )
}

export default DiscountView