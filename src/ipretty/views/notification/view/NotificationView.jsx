import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from "ipretty/context/AppProvider";
import { makeStyles, Grid } from '@material-ui/core';
import ViewPage from 'ipretty/components/ViewPage/ViewPage';
import DataTable from 'ipretty/components/Table/DataTable';
import { initialPramsCourse, sortFieldName } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import { useHistory } from "react-router-dom";
import moment from 'moment';
import PushNotificationService from 'ipretty/services/PushNotificationService';
import Danger_Circle from '../../../../public/icons_ipretty/Danger_Circle_Course.png';
import Edit from '../../../../public/icons_ipretty/Edit_Course.png';

const useStyles = makeStyles(
    theme => ({
        box: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#E5E5E5',
            [theme.breakpoints.up("sm")]: {
                padding: 20,
            },
            [theme.breakpoints.down("xs")]: {
                padding: 10,
            },
            "& .header__content": {
                "& button": {
                    [theme.breakpoints.down("xs")]: {
                        fontSize: '17px !important',//fix Button "+Thêm thông báo" lỗi UI
                    },
                    [theme.breakpoints.up("sm")]: {
                        fontSize: '32px',
                    },
                },
                "& .header__content--button": {
                    "& .button": {
                        backgroundColor: '#fff !important',
                        color: '#147B65 !important',
                        fontWeight: '600 !important',
                        fontSize: '14px',//Button "+Thêm thông báo" lỗi UI
                        border: '1px solid #147B65 !important',
                        width: '198px',
                        height: '40px'
                    },
                },
            },
            "& .view-action__search": {
                '& .MuiInput-root': {
                    [theme.breakpoints.down("xs")]: {
                        minWidth: '330px',
                    },
                    [theme.breakpoints.down("xs")]: {
                        "@media screen and (max-height: 840px)": {
                            minWidth: '330px', //fix bug 34
                          },
                          [theme.breakpoints.up("xs")]: {
                        "@media screen and (min-height: 740px)": {
                            minWidth: '290px', //fix bug 34
                          },
                        },
                    },
                    height: '36px'
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

const NotificationView = (props) => {
    const classes = useStyles();
    const { getTranslation } = useAuth();
    let history = useHistory()
    const fieldsSearch = useMemo(() => 'title', [])
    const [isSearchData, setIsSearchData] = useState(false)
    const type = true;
    const [loading, setLoading] = useState(false);
    const [defautSort, setDefaultSort] = useState(0);
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const [isSort, setIsSort] = useState(false)
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
    ], []);
    const [dataNotification, setDataNotification] = useState([]);

    function redirectCreate() {
        history.push(`/notifications/add`)
    };

    const ListActionDatatable = useMemo(() => [
        { id: 1, icon: Edit, action: handleEdit, title: getTranslation('Edit') },
        { id: 2, icon: Danger_Circle, action: ActionError, title: getTranslation('ReportError') }
    ], [])

    const columns = useMemo(() => [
        { name: "stt", title: getTranslation("STT"), align: "center" },
        { name: "notification_title", title: getTranslation("noticeName"), icon: true, sortData: handleSort },
        { name: "created_at", title: getTranslation("creationTime"), icon: true, sortData: handleSort },
        { name: "group_receivers", title: getTranslation("receiver"), icon: true, sortData: handleSort },
        { name: "status", title: getTranslation("status"), icon: true, sortData: handleSort },
        { name: "", title: "", type: "more", list: ListActionDatatable }
    ], [dataNotification]);

    const status = useMemo(() => [
        { id: 1, name: getTranslation("released") },
        { id: 0, name: getTranslation("unpublic") }
    ], []);

    const receiver = useMemo(() => [
        { id: 'admin', status: 'admin', name: 'Admin' },
        { id: 'teacher', status: 'teacher', name: getTranslation('teacher') },
        { id: 'employee', status: 'employee', name: getTranslation('employee') },
        { id: 'user', status: 'user', name: getTranslation('user') }
    ], []);

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

    const filters = [
        { id: 1, list: status, fieldFilter: 'status', placeholder: getTranslation('status'), widthItem: 160 },
        { id: 2, list: receiver, fieldFilter: 'receivers', placeholder: getTranslation('receiver'), widthItem: 160 }
    ]
    const [createdAt, setCreatedAt] = useState('');

    const times = [
        { id: 1, placeholder: getTranslation('Creationtime') + '---', widthItem: 160, type: 'date-picker-filter', field: 'created_at', value: createdAt, format: 'dd-MM-yyyy' }
    ]
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(props.location.search, { arrayFormat: 'comma' })));
    function handleEdit(row) {
        history.push(`/notifications/${row.notification_id}/edit`)
    }
    function ActionError() {
        history.push('/report-errors')
    }
    function redirectBack() {
        history.push('/')
    }
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
        if (nameField == 'status') {
            let ids = getListId(status, value)
            setParams({ ...params, [nameField]: ids })
        } else if (nameField == 'receivers') {
            setParams({ ...params, [nameField]: value })
        }
    }
    
    const onChangeDatetime = nameField => e => {
        setParams({ ...params, [nameField]: moment(e).format('YYYY-MM-DD') })
        if (nameField == 'created_at') {
            setCreatedAt(moment(e).format('YYYY-MM-DD HH:mm:ss'))
        } else
            setUpdatedAt(moment(e).format('YYYY-MM-DD HH:mm:ss'))
    }

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    getListNotification(params);
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
                        getListNotification(params);
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
                        getListNotification(params, isSort, fieldName, defautSort)
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

    function handleValue(value) {
        if (typeof value !== 'string') {
            return value;
        } else {
            let array = value.split(',');
            let valueReceive = [];
            if (array && array.length > 0) {
                array.map((item) => {
                    valueReceive.push(getTranslation(item));
                })
            }
            return valueReceive.toString()
        }
    }
   
    function getListNotification(params, sort, fieldName, defautSort) {
        PushNotificationService.getListNotification(
            { ...params },
            (res) => {
                const data = res.data.data.data;
                const total = res.data.data.total;
                const current_page = res.data.data.current_page;
                data.map((item, index) => {
                    item.stt = index + 1;
                    item.group_receivers = handleValue(item.group_receivers)
                    item.status = item.isPublished == false ? getTranslation("unpublic") : getTranslation("released");
                    return item;
                })
                if (sort) {
                    data.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
                }
                setDataNotification(data)
                setLoading(false)
                setIsSort(false);
                setIsSearchData(false)
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

    return (
        <Grid className={classes.box}>
            <ViewPage
                times={times}
                titlePage={getTranslation('manageNotificationContent')}
                titleButton={getTranslation('moreNotices')}
                handleSearch={handleSearch}
                fieldsSearch={fieldsSearch}
                placeholderSearch={getTranslation('SearchForUnit') + '...'}
                links={links}
                filters={filters}
                handleData={handleData}
                handleActionFilter={handleActionFilter}
                redirectCreate={redirectCreate}
                typeButtonScreen={type}
                onChangeDatetime={onChangeDatetime}
                redirectBack={redirectBack}
            >
                <DataTable
                    rows={dataNotification}
                    columns={columns}
                    loading={loading}
                    optPaging={params}
                    getTranslation={getTranslation}
                    fieldId={'notification_id'}
                    handlePageChange={handlePageChange}
                    noSelection={true}
                />
            </ViewPage>
        </Grid>
    )
}

export default NotificationView