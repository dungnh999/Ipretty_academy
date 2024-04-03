

import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useAuth } from "ipretty/context/AppProvider"
import DataTable from 'ipretty/components/Table/DataTable'
import { initialPramsCourse ,sortFieldName } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import UserService from 'ipretty/services/UserService'
import { makeStyles } from '@material-ui/core'
import Search from 'ipretty/components/Search'
import { useLocation } from "react-router-dom"
import Chat from '../../../../../public/icons_ipretty/chat.png'
import Information from '../../../../../public/icons_ipretty/User.png'
import Danger_Circle_Course from '../../../../../public/icons_ipretty/Danger_Circle_Course.png'
import FilterUser from "../../components/FilterUser"

const useStyles = makeStyles((theme) => ({
    studentList: {
        marginTop: 16
    },
}))


function StudentView(props) {
    const classes = useStyles()
    const { reload, status, data  , setReload} = props
    const { getTranslation } = useAuth()
    // console.log(reload)
    let history = useHistory()
    let location = useLocation()
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])
    const fieldsSearch = useMemo(() => [], [])
    const [isFilterData, setIsFilterData] = useState(false)
    const [isSort, setIsSort] = useState(false)
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const ListACtionDataTable = useMemo(() => [
        { id: 1, icon: Information, action: handleDetail, title: getTranslation('Profile') },
        // { id: 2, icon: Chat, action: handleMessage, title: getTranslation('chat') },
        { id: 3, icon: Danger_Circle_Course, action: ActionError, title: getTranslation('ReportError') }
    ], [])
    const columns = useMemo(() => [
        { name: 'stt', title: getTranslation('Stt'), align: 'center' },
        { name: 'name', title: getTranslation('NameMenber'), icon: true, sortData: handleSort },
        { name: 'code', title: getTranslation('Code'), icon: true, sortData: handleSort },
        { name: 'email', title: 'Email', icon: true, sortData: handleSort },
        { name: 'phone', title: getTranslation('Phone'), icon: true, sortData: handleSort },
        { name: 'status', title: getTranslation('CourseStatus'), icon: true, sortData: handleSort },
        { name: "", title: "", type: "more", list: ListACtionDataTable }
    ], [students])

    const filters = [
        { id: 1, list: status, fieldFilter: 'status', placeholder: getTranslation('CourseStatus'), widthItem: 160 },
    ]

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isSort) {
                        setLoading(true)
                        getListStudentView(params, isSort, fieldName, defautSort)
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
                    if (data) {
                        setLoading(true)
                        handleShowData(data)
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
    }, [data]);

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isFilterData) {
                        setLoading(true);
                        getListStudentView(params);
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
                        getListStudentView({ ...params, paging: true });
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

    function getListStudentView(params, sort, fieldName, defautSort) {
        UserService.getListUserFollowRole({ ...params, role: 'user', paging: true },
            res => {
                handleShowData(res, sort, fieldName, defautSort)
            }),
            err => {
                console.log(err)
            }
    }

    function handleShowData(res , sort, fieldName, defautSort) {
        const users = res.data.data.data
        const total = res.data.data.total
        const current_page = res.data.data.current_page;
        users.map((user, index) => {
            user.stt = index + 1
            if (user.email_verified_at != null && !user.isLocked) {
                user.status = getTranslation('active')
            } else if (user.isLocked) {
                user.status = getTranslation('deactivated')
            } else {
                user.status = getTranslation('notactivated')
            }
            return user;
        });

        if (sort) {
            users.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
        }

        setStudents(users)
        setLoading(false)
        setIsFilterData(false)
        setIsSort(false)
        // setReload(false)
        const _params = {
            ...params,
            page: current_page,
            total: total,
        };

        setParams(_params)
    }

    function handleSearch(value) {
        const _params = { ...params, page: 1, keyword: value };
        setParams(_params)
        setIsFilterData(true)
    }

    function getListId(list, listChild) {
        let datas = list.filter(val => listChild.includes(val.name))
        return datas.map(item => item.id)
    }

    function handleData(nameField, value) {
        let ids = getListId(status, value)
        setParams({ ...params, [nameField]: ids })
    }

    const handlePageChange = (queryObj) => {
        setParams({ ...queryObj })
        setIsFilterData(true)
    }

    function handleActionFilter() {
        setIsFilterData(true)
    }

    function handleMessage() {

    }

    function handleDetail(row) {
        history.push(`/users/${row.id}/detail?type=Studentinformation`)
    }

    function ActionError() {
        history.push('/report-errors')
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
    
    return (
        <div className={classes.studentList}>
            <FilterUser
                handleSearch={handleSearch}
                filters={filters}
                handleData={handleData}
                handleActionFilter={handleActionFilter}
            />
            <DataTable
                rows={students}
                columns={columns}
                loading={loading}
                optPaging={params}
                getTranslation={getTranslation}
                fieldId={'id'}
                noSelection={true}
                handlePageChange={handlePageChange}
            />
        </div>
    )
}

export default StudentView