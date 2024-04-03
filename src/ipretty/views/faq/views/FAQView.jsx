import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from "ipretty/context/AppProvider";
import { makeStyles, Grid } from '@material-ui/core';
import ViewPage from 'ipretty/components/ViewPage/ViewPage';
import DataTable from 'ipretty/components/Table/DataTable';
import { initialPramsCourse, sortFieldName } from 'ipretty/helpers/contextHelper';
import queryString from "query-string"
import { useHistory } from "react-router-dom";
import FaqService from 'ipretty/services/FaqService';
import Detail_Course from 'public/icons_ipretty/Detail_Course.png'
import Danger_Circle_Course from 'public/icons_ipretty/Danger_Circle_Course.png'
import moment from 'moment';

const useStyles = makeStyles(
    theme => ({
        box: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E5E5E5',
            [theme.breakpoints.down("xs")]: {
                padding: 10,
            },
            [theme.breakpoints.up("sm")]: {
                padding: 20,
            },
            "& .header__content": {
                "& .header__content--button": {
                    "& .button": {
                        backgroundColor: '#fff !important',
                        color: '#147B65 !important',
                        fontWeight: '600 !important',
                        fontSize: '16px !important',
                        border: '1px solid #147B65 !important'
                    },
                },
            },
            "& .view-action__search": {
                "& .MuiInputBase-input": {
                    width: '300px'
                }
            },
        },
        flexDisplay: {
            display: 'flex',
            [theme.breakpoints.down("sm")]: {
                flexDirection: 'column',
                padding: '10px',
                '& .MuiButton-root': {
                    marginTop: theme.spacing(1)
                }
            },
        },
    })
)

const FAQView = (props) => {
    const classes = useStyles();
    const { getTranslation } = useAuth();
    let history = useHistory()
    const fieldsSearch = useMemo(() => 'title', [])
    const [isSearchData, setIsSearchData] = useState(false)
    const type = true;
    const [loading, setLoading] = useState(false);
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
    ], []);
    const [dataFaqs, setdataFaqs] = useState([]);
    const [createdAt, setCreatedAt] = useState('');
    const [updatedAt, setUpdatedAt] = useState('');
    const times = [
        { id: 1, placeholder: 'Thời gian tạo ---', widthItem: 160, type: 'date-picker-filter', field: 'created_at', value: createdAt, format: 'dd-MM-yyyy' },
        // { id: 2, placeholder: 'Thời gian chỉnh sửa ', widthItem: 160, type: 'date-picker-filter', field: 'update_at', value: updatedAt, format: 'dd-MM-yyyy' }
    ]
    const listActionRow = useMemo(() => [
        { id: 1, icon: Detail_Course, action: handleDetail, title: 'Xem chi tiết' },
        { id: 5, icon: Danger_Circle_Course, action: ActionError, title: 'Báo cáo lỗi' }
    ], [])
    const columns = useMemo(() => [
        { name: "stt", title: getTranslation("STT"), align: "center" },
        { name: "title", title: getTranslation("themeName"), icon: true, sortData: handleSort },
        { name: "lesson_author", title: getTranslation("LessonAuthor"), icon: true, sortData: handleSort },
        { name: "created_at", title: getTranslation("creationTime"), icon: true, sortData: handleSort },
        { name: "repaier", title: getTranslation("repairer"), icon: true, sortData: handleSort },
        { name: "updated_at", title: getTranslation("editingTime"), icon: true, sortData: handleSort },
        { name: "status", title: getTranslation("status"), icon: true, sortData: handleSort },
        { name: "", title: "", type: 'more', list: listActionRow },
    ], [dataFaqs]);
    const [isSort, setIsSort] = useState(false)
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const status = useMemo(() => [
        { id: 1, name: getTranslation("released") },
        { id: 0, name: getTranslation("notReleasedYet") }
    ], []);

    const filters = [
        { id: 1, list: status, fieldFilter: 'status', placeholder: getTranslation('status'), widthItem: 160 }
    ]
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(props.location.search, { arrayFormat: 'comma' })));

    function handleSearch(value, fields) {
        const _params = { ...params, page: 1, keyword: value, fieldName: fields };
        setParams(_params);
        setIsSearchData(true);
    }

    const handlePageChange = (queryObj) => {
        setParams({ ...queryObj })
        setIsSearchData(true)
    }
    function handleActionFilter() {
        setIsSearchData(true)
    }
    function getListId(list, listChild) {
        let datas = list.filter(val => listChild.includes(val.name))
        return datas.map(item => item.id)
    }

    function handleData(nameField, value) {

        let ids = getListId(status, value)
        setParams({ ...params, [nameField]: ids })
    }

    function redirectCreate() {
        history.push(`/faqs/add`)
    };

    const onChangeDatetime = nameField => e => {
        setParams({ ...params, [nameField]: moment(e).format('YYYY-MM-DD') })
        if(nameField == 'created_at'){
            setCreatedAt(moment(e).format('YYYY-MM-DD HH:mm:ss'))
        }else
        setUpdatedAt(moment(e).format('YYYY-MM-DD HH:mm:ss'))
    }

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    getListFAQS(params);
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

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSearchData) {
                        setLoading(true);
                        getListFAQS(params);
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
    }, [isSearchData]);

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSort) {
                        setLoading(true)
                        getListFAQS(params, isSort, fieldName, defautSort)
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

    function getListFAQS(params, sort, fieldName, defautSort) {
        FaqService.getListFAQS(
            { ...params },
            (res) => {
                const dataFaqs = res.data.data.data;
                const total = res.data.data.total;
                const current_page = res.data.data.current_page;
                dataFaqs.map((item, index) => {
                    item.stt = index + 1;
                    item.theme_name = item.title ? item.title : '';
                    item.lesson_author = item.created_by.name ? item.created_by.name : '';
                    item.repaier = item.created_by.name ? item.created_by.name : '';
                    item.status = item.isPublished === 0 ? getTranslation("notReleasedYet") : getTranslation("released");
                    return item;
                });
                if (sort) {
                    dataFaqs.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
                }
                setdataFaqs(dataFaqs)
                setLoading(false)
                setIsSearchData(false)
                setIsSort(false)
                const _params = {
                    ...params,
                    page: current_page,
                    total: total,
                };
                setParams(_params)
            },
            (err) => { }
        );
    }

    function handleDetail(row) {
        history.push(`/published-faqs/${row.id}`)
    }

    function ActionError() {
        history.push('/report-errors')
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

    return (
        <Grid className={classes.box}>
            <ViewPage
                titlePage={getTranslation('ManageFAQ')}
                titleButton={getTranslation('AddQuestion')}
                handleSearch={handleSearch}
                fieldsSearch={fieldsSearch}
                placeholderSearch={getTranslation('SearchForUnit') + '...'}
                links={links}
                filters={filters}
                handleData={handleData}
                handleActionFilter={handleActionFilter}
                redirectCreate={redirectCreate}
                typeButtonScreen={type}
                times={times}
                onChangeDatetime={onChangeDatetime}
                redirectBack={() => history.push(`/`)}
            >
                <DataTable
                    rows={dataFaqs}
                    columns={columns}
                    loading={loading}
                    optPaging={params}
                    getTranslation={getTranslation}
                    fieldId={'id'}
                    handlePageChange={handlePageChange}
                    noSelection={true}
                />
            </ViewPage>
        </Grid>
    )
}

export default FAQView