import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { useHistory } from "react-router-dom"
import { Box, makeStyles, Button, Typography } from '@material-ui/core'
import { useNotiStackContext } from 'ipretty/context/Notistack'
import DetailPage from 'ipretty/components/DetailPage/DetailPage'
import Plus from '../../../../public/icon_svg/Plus.svg'
import { initialPramsCourse , sortFieldName} from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import IconImage from "ipretty/components/IconImage"
import Filter from 'ipretty/components/Filter'
import DataTable from 'ipretty/components/Table/DataTable'
import BannerService from 'ipretty/services/BannerService'
import moment from 'moment';
import Edit from 'public/icon_svg/Edit.svg'

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
    }
}))

function PostView() {
    const classes = useStyles()
    const { makeShortMessage } = useNotiStackContext();
    const { getTranslation } = useAuth()
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
    ], [])
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const titlePage = getTranslation('Postmanagement')
    const [dataPost , setDataPost] = useState([])
    const [categories, setCategories] = useState([])
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    let history = useHistory()
    const [loadingFilter , setLoadingFilter] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [isSort, setIsSort] = useState(false)
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const [isFilterData, setIsFilterData] = useState(false)
    const actions = [
        { id: 1, action: redirectAddPost, icon: <IconImage srcIcon={Plus} />, noIcon: false, label: getTranslation('addPost'), buttonClass: 'button button__edit button--white' },
        { id: 2, action: redirectCategory, noIcon: true, label: getTranslation('categorymanagement'), buttonClass: 'button button__edit button--green' },
    ]
    const status = useMemo(() => [
        { id: 1, name: getTranslation('published') },
        { id: 0, name: getTranslation('unpublished') },
    ], [])
    
    const columns = useMemo(() => [
        { name: 'stt', title: getTranslation('Stt'), align: 'center' },
        { name: 'title', title: getTranslation('PostName'), icon: true , sortData: handleSort },
        { name: 'category_name', title: getTranslation('Category'), icon: true  , sortData: handleSort},
        { name: 'name', title: getTranslation('creator'), icon: true ,sortData: handleSort},
        { name: "created_time", title: getTranslation("creationTime"), icon: true , sortData: handleSort },
        { name: "updated_at", title: getTranslation("editingTime"), icon: true ,sortData: handleSort },
        { name: 'status', title: getTranslation('Status'), icon: true ,sortData: handleSort },
        { name: "", title: "", type: "detail" , iconEdit: <IconImage srcIcon={Edit} /> }
    ], [dataPost])

    const filters = [
        { id: 1, list: status, fieldFilter: 'status', placeholder: getTranslation('Status') + '---', widthItem: 160 },
        { id: 2, list: categories, fieldFilter: 'category_ids', placeholder: getTranslation('Category') + '---', widthItem: 180 },
    ]

    const times = [
        { id: 1, placeholder: getTranslation('Creationtime') + '---', widthItem: 180, type: 'date-picker-filter', field: 'created_at', value: createdAt, format: 'dd-MM-yyyy' },
        { id: 2, placeholder: getTranslation('Editingtime') +'---', widthItem: 160, type: 'date-picker-filter', field: 'updated_at', value: updatedAt, format: 'dd-MM-yyyy' }
    ]

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSort) {
                        setLoading(true)
                        getListAllPost(params, isSort, fieldName, defautSort)
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
                        getListAllPost(params);
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
                        getListAllPost({ ...params, paging: true });
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
                    getListAllPost(params);
                    getPostCategory()
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

    function getListAllPost(params , sort, fieldName, defautSort) {
        BannerService.getAllPost({ ...params, paging: 1 },
            res => {
                handleShowData(res , sort, fieldName, defautSort)
            }),
            err => {
                console.log(err)
            }
    }

    function handleShowData(res, sort, fieldName, defautSort) {
        const posts = res.data.data.data
        const total = res.data.data.total
        const current_page = res.data.data.current_page;
        posts.map((data, index) => {
            data.stt = index + 1
            data.category_name = data.post_category ? data.post_category.category_name : ''
            data.name = data.created_by.name
            data.created_time = data.created_at
            if (data.is_active == false) {
                data.status = getTranslation('unpublished')
            } else {
                data.status = getTranslation('published')
            }
            return data
        })
        if (sort) {
            posts.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
        }
        setIsSort(false)
        setDataPost(posts)
        setLoading(false)
        setLoadingFilter(false)
        setIsFilterData(false)
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


    function getPostCategory () {
        BannerService.getAllPostCategory(
            res => {
                const categories = res.data.data
                categories && categories.map((item) => {
                        item.name = item.category_name ? item.category_name : ""
                        item.id = item.category_id ? item.category_id : ""
                        return item
                })
                setCategories(categories)
            },
           err => {
                console.log(err)
           } 
        )
    }

    function redirectDetail(value , row) {
        history.push(`/posts/${row.post_id}/edit`)
    }

    function redirectAddPost() {
       history.push('/posts/addPost')
    }

    function redirectCategory() {
        history.push('/post-categories')
    }

    function redirectBack() {
        history.push('/')
    }

    function handleSearch (value, fields) {
        const _params = { ...params, page: 1, keyword: value, fieldName: fields };
        setParams(_params)
        setIsFilterData(true)
    }
    
    const onChangeDatetime = nameField => e => {
        setParams({ ...params, [nameField]: moment(e).format('YYYY-MM-DD') })
        if(nameField == 'created_at'){
            setCreatedAt(moment(e).format('YYYY-MM-DD HH:mm:ss'))
        }else
        setUpdatedAt(moment(e).format('YYYY-MM-DD HH:mm:ss'))
    }

    function handleData(nameField, value) {
        if (nameField == 'status') {
            let ids = getListId(status, value)
            setParams({ ...params, [nameField]: ids })
        } else if (nameField == 'category_ids') {
            let ids = getListId(categories, value)
            setParams({ ...params, [nameField]: ids })
        }
         else {
            setParams({ ...params, [nameField]: value })
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
        setParams({ ...queryObj })
        setIsFilterData(true)
    }
    
    return (
        <div className={classes.managementView}>
            <DetailPage
                links={links}
                titleCurrent={titlePage}
                actions={actions}
                redirectBack={redirectBack}
            >
                <div className="view">
                    <Filter
                        isSearch={true}
                        handleSearch={handleSearch}
                        times={times}
                        filters={filters}
                        handleData={handleData}
                        loadingButton={loadingFilter}
                        handleActionFilter={handleActionFilter}
                        onChangeDatetime={onChangeDatetime}
                    />
                    <DataTable
                        rows={dataPost}
                        columns={columns}
                        loading={loading}
                        optPaging={params}
                        getTranslation={getTranslation}
                        fieldId={'post_id'}
                        noSelection={true}
                        redirectDetail={redirectDetail}
                        handlePageChange={handlePageChange}
                    />
                </div>
            </DetailPage>
        </div>
    )
}

export default PostView