import React, {useEffect, useMemo, useState, useCallback} from 'react'
import {useAuth} from 'ipretty/context/AppProvider'
import {useHistory} from "react-router-dom"
import {Box, makeStyles, Button, Typography} from '@material-ui/core'
import {useNotiStackContext} from 'ipretty/context/Notistack'
import DetailPage from 'ipretty/components/DetailPage/DetailPage'
import {initialPramsCourse, sortFieldName} from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import IconImage from "ipretty/components/IconImage"
import Filter from 'ipretty/components/Filter'
import DataTable from 'ipretty/components/Table/DataTable'
import TransactionService from 'ipretty/services/TransactionService'
import Edit from '../../../public/icon_svg/Edit.svg'
import Duyent from '../../../public/icon_svg/Duyet.svg'
import Delete from '../../../public/icon_svg/Delete.svg'
import Dialog from 'ipretty/components/Dialog/Dialog'

const useStyles = makeStyles(theme => ({
    managementView: {
        padding: 32,
        [theme.breakpoints.down('xs')]: {
            padding: 10,
        },
        [theme.breakpoints.up('sm')]: {
            padding: 20,
        },
        "& .header__button--back": {
            "& .makeStyles-icon16-26": {
                display: "flex",
                width: 23,
                height: 19
            }
        },
        "& .button": {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'end',
            height: '40px',
            "& .tabs__action--dow": {
                padding: '0 24px'
            },
            "& .tabs__action--add": {
                padding: '0 48px 0 24px'
            }
        },
        "& .view": {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(1),
            padding: '10px 32px 32px',
            [theme.breakpoints.down('xs')]: {
                padding: '10px 0px 32px',
            },
            marginTop: 28,
        },
    },
    styleError: {
        marginTop: 10,
        "& .error-import": {
            color: '#DC4F68'
        }
    },
    CustomWidth: {
        maxWidth: 370
    }
}))

function TransactionView() {
    const classes = useStyles()
    const {makeShortMessage} = useNotiStackContext();
    const {getTranslation} = useAuth()
    const links = useMemo(() => [
        {title: getTranslation('Home'), path: '/'},
    ], [])
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, {arrayFormat: 'comma'})))
    const titlePage = getTranslation('transactionManagement')
    const [dataTransaction, setDataTransaction] = useState([])
    let history = useHistory()
    const [loadingFilter, setLoadingFilter] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [isSort, setIsSort] = useState(false)
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const [isFilterData, setIsFilterData] = useState(false)
    const [isShowPopupBrowser, setIsShowPopupBrowser] = useState(false)
    const [isShowPopupDelete, setIsShowPopupDelete] = useState(false)
    const [transactionId, setTransactionId] = useState('')
    const status = useMemo(() => [
        {id: 'approved', name: getTranslation('approved')},
        {id: 'processing', name: getTranslation('processing')},
        {id: 'rejected', name: getTranslation('rejected')},
    ], [])
    const payment_methods = useMemo(() => [
        {id: 'banking', name: getTranslation('Bankingtransfer')},
        {id: 'at_company', name: getTranslation('Directpayment')},
        // { id: 'point', name: getTranslation('Directpayment') },
    ])
    const ListTransaction = useMemo(() => [
        {id: 1, icon: Edit, action: handleDetail, title: getTranslation('examDetails')},
        {id: 2, icon: Duyent, action: handleBrowser, title: getTranslation('Browseorders'), disabled: true},
        {id: 3, icon: Delete, action: handleDelete, title: getTranslation('Cancelorder'), disabled: true},
    ], [])

    const ListTransactionProcessing = useMemo(() => [
        {id: 1, name: 'isDetail', icon: Edit, action: handleDetail, title: getTranslation('examDetails')},
        {id: 2, name: 'isApprove', icon: Duyent, action: handleBrowser, title: getTranslation('Browseorders')},
        {id: 3, name: 'isCancel', icon: Delete, action: handleDelete, title: getTranslation('Cancelorder')},
    ], [])

    const columns = useMemo(() => [
        {name: 'stt', title: getTranslation('Stt'), align: 'center'},
        {name: 'transaction_code', title: getTranslation('Codeorders'), icon: true, sortData: handleSort},
        {name: 'payment_method', title: getTranslation('Paymentmethods'), icon: true, sortData: handleSort},
        {name: "created_at", title: getTranslation("Orderdate"), icon: true, sortData: handleSort},
        {name: 'email', title: getTranslation('Email'), icon: true, sortData: handleSort},
        {name: 'name', title: getTranslation('Orderer'), icon: true, sortData: handleSort},
        {name: "salePrice", title: getTranslation("Promotion"), icon: true, sortData: handleSort},
        {name: "grandTotal", title: getTranslation("Total"), icon: true, sortData: handleSort},
        {name: 'status', title: getTranslation('status'), icon: true, sortData: handleSort},
        {name: "", title: "", type: "more", list: ListTransactionProcessing}
    ], [dataTransaction])

    const filters = [
        {id: 1, list: status, fieldFilter: 'status', placeholder: getTranslation('status') + '---', widthItem: 160},
        {
            id: 2,
            list: payment_methods,
            fieldFilter: 'payment_methods',
            placeholder: getTranslation('Paymentmethods') + '---',
            widthItem: 220
        },
    ]

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSort) {
                        setLoading(true)
                        getAllTransaction(params, isSort, fieldName, defautSort)
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
                        // console.log(params)
                        getAllTransaction(params);
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
                        getAllTransaction({...params, paging: true});
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
                    getAllTransaction(params);
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

    // const getDataAfterSave = useCallback(e => {
    //     getAllTransaction(params);
    // }, [])

    function getAllTransaction(params, sort, fieldName, defautSort) {
        TransactionService.getAllTransaction({...params, paging: 1},
            res => {
                handleShowData(res, sort, fieldName, defautSort)
            }),
            err => {
                console.log(err)
            }
    }

    function handleShowData(res, sort, fieldName, defautSort) {
        const transactions = res.data.data.data
        const total = res.data.data.total
        const current_page = res.data.data.current_page;
        transactions.map((data, index) => {
            data.stt = index + 1
            // data.payment_method = data.post_category ? data.post_category.category_name : ''
            data.name = data.buyer ? data.buyer.name : ""
            data.email = data.buyer ? data.buyer.email : ""
            data.salePrice = data.order.salePrice
            data.grandTotal = data.order && data.order.grandTotal ? (data.order.grandTotal).toLocaleString('vi-VN', {currency: 'VND'}) : 0
            data.created_time = data.created_at
            if (data.payment_method === "banking") {
                data.payment_method = getTranslation('Bankingtransfer')
            } else {
                data.payment_method = getTranslation('Directpayment')
            }
            if (data.status === 'approved') {
                data.status = getTranslation('approved')
                data.isApprove = true
                data.isCancel = true
            } else if (data.status === 'processing') {
                data.status = getTranslation('processing')
            } else {
                data.status = getTranslation('rejected')
                data.isApprove = true
                data.isCancel = true
            }
            return data
        })
        if (sort) {
            transactions.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
        }
        setDataTransaction(transactions)
        setLoading(false)
        setLoadingFilter(false)
        setIsFilterData(false)
        setIsSort(false)
        const _params = {
            ...params,
            page: current_page,
            total: total,
        };
        setParams(_params)
    }

    function handleSort(fieldNameSort) {
        if (currentFieldName == fieldNameSort) {
            setDefaultSort(defautSort + 1)
        } else {
            setDefaultSort(0)
        }
        setCurrenFieldName(fieldNameSort)
        setFieldName(fieldNameSort)
        setIsSort(true)
    }

    function handleDetail(row) {
        history.push(`/transactions/${row.transaction_id}/detail`)
    }

    function handleBrowser(row) {
        setTransactionId(row.transaction_id)
        setIsShowPopupBrowser(true)
    }

    function handleDelete(row) {
        setTransactionId(row.transaction_id)
        setIsShowPopupDelete(true)
    }

    function handleClosePopupBrowser() {
        setIsShowPopupBrowser(false)
    }

    function handleClosePopupDelete() {
        setIsShowPopupDelete(false)
    }

    function handleConfirmBrowser() {
        let data = new FormData()
        data.append('status', 'approved')
        TransactionService.approveTransaction(
            transactionId,
            data,
            res => {
                makeShortMessage(getTranslation('paymentconfirmationSuccessfuly'), "success");
                setTimeout(() => {
                    setIsShowPopupBrowser(false)
                    setIsFilterData(true)
                }, 2000)
                // getDataAfterSave()
            },
            err => {
                console.log(err)
                makeShortMessage(getTranslation('Error'), "error");
            }
        )
    }

    function handleConfirmDelete() {
        let data = new FormData()
        data.append('status', 'rejected')
        TransactionService.approveTransaction(
            transactionId,
            data,
            res => {
                makeShortMessage(getTranslation('Canceledordersuccessfully'), "success");
                setTimeout(() => {
                    setIsShowPopupDelete(false)
                    setIsFilterData(true)
                }, 2000)
                // getDataAfterSave()
            },
            err => {
                console.log(err)
                makeShortMessage(getTranslation('Error'), "error");
            }
        )
    }

    function redirectBack() {
        history.push('/')
    }

    function handleSearch(value, fields) {
        const _params = {...params, page: 1, keyword: value, fieldName: fields};
        setParams(_params)
        setIsFilterData(true)
    }


    function handleData(nameField, value) {
        if (nameField == 'status') {
            let ids = getListId(status, value)
            setParams({...params, [nameField]: ids})
        } else if (nameField == 'payment_methods') {
            let ids = getListId(payment_methods, value)
            setParams({...params, [nameField]: ids})
        } else {
            setParams({...params, [nameField]: value})
        }
    }

    function getListId(list, listChild) {
        let datas = list.filter(val => listChild.includes(val.name))
        return datas.map(item => item.id)
    }

    function handleActionFilter() {
        setIsFilterData(true)
        setLoadingFilter(true)
    }

    const handlePageChange = (queryObj) => {
        setParams({...queryObj})
        setIsFilterData(true)
    }

    return (
        <div className={classes.managementView}>
            <DetailPage
                links={links}
                titleCurrent={titlePage}
                redirectBack={redirectBack}
            >
                <div className="view">
                    <Filter
                        isSearch={true}
                        handleSearch={handleSearch}
                        filters={filters}
                        handleData={handleData}
                        loadingButton={loadingFilter}
                        handleActionFilter={handleActionFilter}
                    />
                    <DataTable
                        rows={dataTransaction}
                        columns={columns}
                        loading={loading}
                        optPaging={params}
                        getTranslation={getTranslation}
                        fieldId={'transaction_id'}
                        noSelection={true}
                        // redirectDetail={redirectDetail}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </DetailPage>
            {isShowPopupBrowser && (
                <Dialog
                    // maxWidth="sm"
                    CustomWidth={classes.CustomWidth}
                    open={isShowPopupBrowser}
                    onClose={handleClosePopupBrowser}
                    actionLabel={getTranslation("Confirm")}
                    action={handleConfirmBrowser}
                    noIcon={false}
                    title={getTranslation("Browseorders")}
                    noIcon
                    getTranslation={getTranslation}
                    classButton="button--green"
                >
                    {getTranslation("Confirmationofsuccessfulpayment")}
                </Dialog>
            )}
            {isShowPopupDelete && (
                <Dialog
                    // maxWidth="sm"
                    CustomWidth={classes.CustomWidth}
                    open={isShowPopupDelete}
                    onClose={handleClosePopupDelete}
                    actionLabel={getTranslation("Cancelorder")}
                    action={handleConfirmDelete}
                    noIcon={false}
                    noIcon
                    title={getTranslation("Cancelorder")}
                    getTranslation={getTranslation}
                    classButton="button--green"
                >
                    {getTranslation("Areyousuretocanceltheorder")}
                </Dialog>
            )}
        </div>
    )
}

export default TransactionView