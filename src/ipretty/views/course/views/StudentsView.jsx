
import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useAuth } from "ipretty/context/AppProvider"
import DataTable from 'ipretty/components/Table/DataTable'
import { initialPramsCourse } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import CourseService from 'ipretty/services/CourseService'
import Search from 'ipretty/components/Search'
import Danger_Circle_Course from '../../../../public/icons_ipretty/Danger_Circle_Course.png'
import Detail_Course from '../../../../public/icons_ipretty/FileMore.svg'
import Information from '../../../../public/icons_ipretty/User.png'
import Chat from '../../../../public/icons_ipretty/chat.png'
import { useLocation } from "react-router-dom";
import { sortFieldName } from 'ipretty/helpers/contextHelper'
import AddButton from 'ipretty/components/AddButton'
import MultipleSelect from 'ipretty/components/Autocomplete/MultipleSelect'
import DatePickers from 'ipretty/components/DatePicker/DatePicker'
import moment from 'moment'

function StudentsView(props) {
    const { courseId, reload, setReload, classes , teacherId } = props
    const { getTranslation, user } = useAuth()
    let history = useHistory()
    let location = useLocation()
    const [loading, setLoading] = useState(false)
    const [students, setStudents] = useState([])
    const fieldsSearch = useMemo(() => [], [])
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const ListACtionDatatable = useMemo(() => [
        { id: 1, icon: Information, action: ActionDetail, title: getTranslation('Profile') },
        { id: 2, icon: Detail_Course, action: ActionViewResults, title: getTranslation('ViewResults') },
        { id: 3, icon: Chat, action: ActionMessage, title: getTranslation('chat') },
        // { id: 4, icon: Danger_Circle_Course, action: ActionError, title: getTranslation('ReportError') }
    ], [])

    const ListACtionDatatableStudent = useMemo(() => [
        { id: 1, icon: Information, action: ActionDetail, title: getTranslation('Profile') },
        { id: 2, icon: Detail_Course, action: ActionViewResults, title: getTranslation('ViewResults') },
        { id: 3, icon: Chat, action: ActionMessage, title: getTranslation('chat') },//thêm túnh năng nhắn tin với học viên 
    ], [])

    const columns = useMemo(() => [
        { name: 'stt', title: getTranslation('Stt'), align: 'center' },
        { name: "nameemail", title: getTranslation("Name/Email"), icon: true, sortData: handleSort },
        { name: "menuroles", title: getTranslation("AccountType"), icon: true, sortData: handleSort },
        { name: "department_name", title: getTranslation("Department"), icon: true, sortData: handleSort },
        { name: "status", title: getTranslation("Status"), icon: true, sortData: handleSort },
        { name: "started_at", title: getTranslation("StartTime"), icon: true, sortData: handleSort },
        { name: "completed_at", title: getTranslation("EndTime"), icon: true, sortData: handleSort },
        { name: "percent_finish", title: getTranslation("Achievements"), icon: true, sortData: handleSort },
        { name: "", title: "", type: "more", list: user.role == 'admin' ? ListACtionDatatableStudent : ListACtionDatatable, ListActionDatatableBTeacher: ListACtionDatatable }
    ], [students]);
    const columnsMage = useMemo(() => [
        { name: 'stt', title: getTranslation('Stt'), align: 'center' },
        { name: "nameemail", title: getTranslation("Name/Email"), icon: true, sortData: handleSort },
        { name: "menuroles", title: getTranslation("AccountType"), icon: true, sortData: handleSort },
        { name: "department_name", title: getTranslation("Department"), icon: true, sortData: handleSort },
        { name: "status", title: getTranslation("Status"), icon: true, sortData: handleSort },
        { name: "started_at", title: getTranslation("StartTime"), icon: true, sortData: handleSort },
        { name: "completed_at", title: getTranslation("EndTime"), icon: true, sortData: handleSort },
        { name: "percent_finish", title: getTranslation("Achievements"), icon: true, sortData: handleSort },
        // { name: "", title: "", type: "more", list: user.role == 'admin' ? ListACtionDatatableAdmin : ListACtionDatatable, ListActionDatatableBTeacher: ListACtionDatatable }
    ], [students]);
    const [isSort, setIsSort] = useState(false)
    const [isFilterData, setIsFilterData] = useState(false)
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const status = useMemo(() => [
        { id: 1, name: 'Đang học', status: 'learning' },
        { id: 2, name: 'Đã hoàn thành', status: 'finished' }
    ], [])
    const accountTypes = [
        { id: 1, name: 'Tự do', status: 'user' },
        { id: 2, name: 'Nội bộ', status: 'employee' },
    ]
    const achievements = [
        { id: 1, name: '0 - 20', status: '0-20' },
        { id: 2, name: '21 - 40', status: '21-40' },
        { id: 3, name: '41 - 60', status: '41-60' },
        { id: 4, name: '61 - 80', status: '61-80' },
        { id: 5, name: '81 - 100', status: '81-100' }
    ]
    const filtersStudent = [
        { id: 1, list: accountTypes, fieldFilter: 'account_type', placeholder: 'Loại tài khoản---', widthItem: 160 },
        { id: 2, list: status, fieldFilter: 'status_learning', placeholder: 'Trạng thái---', widthItem: 160 },
        { id: 4, list: achievements, fieldFilter: 'achievements', placeholder: 'Thành tích---', widthItem: 160 }
    ]
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const times = [
        { id: 1, placeholder: 'Bắt đầu ---', widthItem: 160, type: 'date-picker-filter', field: 'startTime', value: startTime, format: 'dd-MM-yyyy' },
        { id: 2, placeholder: 'Kết thúc ---', widthItem: 160, type: 'date-picker-filter', field: 'endTime', value: endTime, format: 'dd-MM-yyyy' }
    ]

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true);
                    getListStudentFollowCourse(courseId, { ...params, paging: true });
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => {
            mounted = false
            setLoading(false);
        };
    }, []);

    useEffect(() => {
        if (isFilterData) {
            setLoading(true);
            getListStudentFollowCourse(courseId, params);
        }
    }, [isFilterData]);

    useEffect(() => {
        if (isSort) {
            setLoading(true)
            getListStudentFollowCourse(courseId, params, isSort, fieldName, defautSort)
        }
    }, [isSort]);

    useEffect(() => {
        if (reload) {
            setLoading(true);
            getListStudentFollowCourse(courseId, { ...params, paging: true });
        }
    }, [reload]);

    function getListStudentFollowCourse(courseId, params, sort, fieldName, defautSort) {
        CourseService.listOfStudentsInTheCourse(
            courseId,
            params,
            res => {
                const data = res.data.data.data
                data && data.length > 0 && data.map((item, index) => {
                    item.stt = index + 1
                    item.status = item.isPassed && item.isPassed == 1 ? getTranslation('finished') : getTranslation('learning')
                    // item.status = item.email_verified_at != null && !item.isLocked ? getTranslation('active') : item.isLocked ? getTranslation('deactivated') : getTranslation('notactivated')
                    item.menuroles = item.menuroles ? item.menuroles == 'user' ? 'Tự do' : 'Nội bộ' : ''
                    item.nameemail = item.name === '' ? item.email : item.name
                    item.department_name = item.department && Object.keys(item.department).length > 0 && item.department.department_name ? item.department.department_name : ''
                    return item
                })
                if (sort) {
                    data.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
                }
                setParams({ ...params, total: res.data.data.total })
                setStudents(data)
                setLoading(false);
                setIsSort(false)
                setReload(false)
                setIsFilterData(false)
            },
            err => {
                console.log(err)
            }
        )
    }

    function handleSearch(value) {
        setParams({ ...params, keyword: value })
        setIsFilterData(true)
    }

    const handlePageChange = (queryObj) => {
        setParams({ ...queryObj })
        setIsFilterData(true)
    }

    function ActionDetail(row) {
        history.push(`/users/${row.id}/detail?type=Staffinformation`)
    }

    function ActionViewResults(row) {
        history.push(`/courses/${courseId}/user/${row.id}/learning-process`)
    }

    function ActionMessage(row) {
        history.push(`/chat/${row.id}`)
    }

    function ActionError() {

    }

    function handleActionFilter() {
        setIsFilterData(true)
    }

    function handleData(nameField, value) {
        setParams({ ...params, [nameField]: value })
    }

    const onChangeDatetime = nameField => e => {
        if (nameField == 'startTime') {
            if (e) {
                setStartTime(moment(e).format('YYYY-MM-DD HH:mm:ss'))
            } else {
                setStartTime('')
            }
        } else {
            if (e) {
                setEndTime(moment(e).format('YYYY-MM-DD HH:mm:ss'))
            } else {
                setEndTime('')
            }
        }
        setParams({ ...params, [nameField]: e ? moment(e).format('YYYY-MM-DD') : '' })
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
        <div className={classes.studentList}>
            <div className="view__header">
                <div className="header__search">
                    <Search onSearch={handleSearch} fieldName={fieldsSearch} placeholder={getTranslation('SearchForUnit') + '...'} />
                </div>
                <div className="view-action__filter">
                    {filtersStudent && filtersStudent.length > 0 && filtersStudent.map((filter, indexFilter) => {
                        return (
                            <div className="view-action__filter--item" key={indexFilter} style={{ width: filter.widthItem ? filter.widthItem : '200px' }}>
                                <MultipleSelect
                                    nameField={filter.fieldFilter}
                                    listData={filter.list || []}
                                    placeholder={filter.placeholder}
                                    handleFilter={handleData}
                                    widthItem={filter.widthItem}
                                />
                            </div>
                        )
                    })}
                    {times && times.length > 0 && times.map((time, indexTime) => {
                        return (
                            <div className="view-action__filter--item view-action__filter--datatime" key={indexTime}>
                                <DatePickers
                                    type={time.type}
                                    value={time.value || null}
                                    format={time.format}
                                    placeholder={time.placeholder}
                                    handleDateChange={onChangeDatetime(`${time.field}`)}
                                />
                            </div>
                        )
                    })}
                    <div className="view-action__filter--button">
                        <AddButton
                            label={getTranslation('Filter')}
                            id="update-button"
                            buttonClass="button button_filter"
                            onClick={handleActionFilter}
                            variant='contained'
                            disabled={false}
                            noIcon={true}
                        />
                    </div>
                </div>
            </div>
            <DataTable
                rows={students}
                columns={user.id == teacherId || user.role == "admin" ? columns : columnsMage }
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

export default StudentsView