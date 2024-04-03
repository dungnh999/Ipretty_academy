import React, { useEffect, useMemo, useState } from 'react'
import { useHistory } from "react-router-dom"
import { useAuth } from "ipretty/context/AppProvider"
import DataTable from 'ipretty/components/Table/DataTable'
import { initialPramsCourse } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import CourseService from 'ipretty/services/CourseService'
import Search from 'ipretty/components/Search'
import { useLocation } from "react-router-dom"
import Danger_Circle_Course from '../../../../public/icons_ipretty/Danger_Circle_Course.png'
import Detail_Course from '../../../../public/icons_ipretty/Detail_Course.png'
import Information from '../../../../public/icons_ipretty/User.png'
import Chat from '../../../../public/icons_ipretty/chat.png'
import Delete from 'public/icon_svg/Delete.svg'
import { sortFieldName } from 'ipretty/helpers/contextHelper'
import UserService from 'ipretty/services/UserService'
import MultipleSelect from 'ipretty/components/Autocomplete/MultipleSelect'
import DatePickers from 'ipretty/components/DatePicker/DatePicker'
import AddButton from 'ipretty/components/AddButton'
import { useNotiStackContext } from 'ipretty/context/Notistack'
import Dialog from 'ipretty/components/Dialog/Dialog'
import IconImage from 'ipretty/components/IconImage'

function LeaderView(props) {
    const { courseId, reload, setReload, classes, removeLeader , teacherId} = props
    const { getTranslation , user } = useAuth()
    let history = useHistory()
    let location = useLocation()
    const [loading, setLoading] = useState(false)
    const [leaders, setLeaders] = useState([])
    const fieldsSearch = useMemo(() => [], [])
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const [postions, setPostions] = useState([])
    const { makeShortMessage } = useNotiStackContext();
    const [showPopupRemoveLeader, setShowPopupRemoveLeader] = useState(false)
    const [leaderId, setLeaderId] = useState(null)
    const ListACtionDatatable = useMemo(() => [
        { id: 1, icon: Information, action: ActionDetail, title: getTranslation('Profile') },
        { id: 3, icon: Delete, action: RemoverLeader, title: getTranslation('DeleteManagement') },
        // { id: 3, icon: Chat, action: ActionMessage, title: getTranslation('chat') },//fix bug 38 Bỏ tính năng nhắn tin 
        // { id: 4, icon: Danger_Circle_Course, action: ActionError, title: getTranslation('ReportError') }
    ], [])
    const columns = useMemo(() => [
        { name: "stt", title: getTranslation("Stt"), align: "center" },
        { name: "name", title: getTranslation("Name"), icon: true, sortData: handleSort },
        { name: "email", title: getTranslation("Email"), icon: true, sortData: handleSort },
        { name: "code", title: getTranslation("Code"), icon: true, sortData: handleSort },
        // { name: "menuroles", title: getTranslation("AccountType"), icon: true, sortData: handleSort },
        { name: "department_name", title: getTranslation("Department"), icon: true, sortData: handleSort },
        // { name: "status", title: getTranslation("Status"), icon: true, sortData: handleSort },
        { name: "position", title: getTranslation("Positions"), icon: true, sortData: handleSort },
        { name: "", title: "", type: "more", list: ListACtionDatatable,ListActionDatatableBTeacher: ListACtionDatatable  }
    ], [leaders])
    const columnsMage = useMemo(() => [
        { name: "stt", title: getTranslation("Stt"), align: "center" },
        { name: "name", title: getTranslation("Name"), icon: true, sortData: handleSort },
        { name: "email", title: getTranslation("Email"), icon: true, sortData: handleSort },
        { name: "code", title: getTranslation("Code"), icon: true, sortData: handleSort },
        // { name: "menuroles", title: getTranslation("AccountType"), icon: true, sortData: handleSort },
        { name: "department_name", title: getTranslation("Department"), icon: true, sortData: handleSort },
        // { name: "status", title: getTranslation("Status"), icon: true, sortData: handleSort },
        { name: "position", title: getTranslation("Positions"), icon: true, sortData: handleSort },
    ], [leaders])
    const [isSort, setIsSort] = useState(false)
    const [isFilterData, setIsFilterData] = useState(false)
    const [defautSort, setDefaultSort] = useState(0)
    const [fieldName, setFieldName] = useState('')
    const [currentFieldName, setCurrenFieldName] = useState('')
    const [departments, setDepartments] = useState([])
    const filters = [
        { id: 1, list: departments, fieldFilter: 'departments', placeholder: 'Bộ phận---', widthItem: 160 },
        { id: 2, list: postions, fieldFilter: 'positions', placeholder: 'Vị trị---', widthItem: 160 }
    ]
    const [loadingButtonRemoveLeader, setLoadingButtonRemoveLeader] = useState(false)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            UserService.getListPostionsInPaticipant({ course_id: courseId }),
            UserService.asyncDepartments(),
            CourseService.asyncListOfLeaderInTheCourseWithParams(courseId, { ...params, paging: true })
        ]).then(([listPositions, listDepartments, res]) => {
            let departments = listDepartments.data.data
            let postions = listPositions.data.data
            departments && departments.length > 0 && departments.map((department, index) => {
                department.id = department.department_id,
                    department.name = department.department_name
                department.status = department.department_id
                return department
            })
            let _postions = []
            if (postions && postions.length > 0 ) {
                postions.map((position, index) => {
                    if (position != 'N/A') {
                        let obj = {
                            id: index,
                            name: position,
                            status: position
                        }
                        _postions.push(obj)
                    }
                })
            } else {
                let obj = {
                    id: 0,
                    name: 'Không có dữ liệu',
                    status: 'Không có dữ liệu',
                }
                _postions.push(obj)
            }
            setPostions(_postions)
            setDepartments(departments)
            handleData(res)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        setLoading(true)
        Promise.all([
            UserService.getListPostionsInPaticipant({ course_id: courseId }),
            UserService.asyncDepartments(),
        ]).then(([listPositions, listDepartments]) => {
            let departments = listDepartments.data.data
            let postions = listPositions.data.data
            departments && departments.length > 0 && departments.map((department, index) => {
                department.id = department.department_id,
                    department.name = department.department_name
                department.status = department.department_id
                return department
            })
            let _postions = []
            if (postions && postions.length > 0 ) {
                postions.map((position, index) => {
                    if (position != 'N/A') {
                        let obj = {
                            id: index,
                            name: position,
                            status: position
                        }
                        _postions.push(obj)
                    }
                })
            } else {
                let obj = {
                    id: 0,
                    name: 'Không có dữ liệu',
                    status: 'Không có dữ liệu',
                }
                _postions.push(obj)
            }
            setPostions(_postions)
            setDepartments(departments)
            setReload(false)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [reload])

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    if (isFilterData) {
                        setLoading(true);
                        getListStudentFollowCourse(courseId, { ...params, paging: true });
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
                    if (isSort) {
                        setLoading(true)
                        getListStudentFollowCourse(courseId, params, isSort, fieldName, defautSort)
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
                    if (reload) {
                        setLoading(true);
                        getListStudentFollowCourse(courseId, { ...params, paging: true });
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

    function getListStudentFollowCourse(courseId, params, sort, fieldName, defautSort) {
        CourseService.listOfLeaderInTheCourse(
            courseId,
            params,
            res => {
                handleData(res, sort, fieldName, defautSort)
            },
            err => {
                console.log(err)
            }
        )
    }

    function handleData(res, sort, fieldName, defautSort) {
        const data = res.data.data.data
        data && data.length > 0 && data.map((item, index) => {
            item.stt = index + 1
            item.status = item.email_verified_at != null && !item.isLocked ? getTranslation('active') : item.isLocked ? getTranslation('deactivated') : getTranslation('notactivated')
            item.menuroles = item.menuroles ? item.menuroles == 'user' ? 'Tự do' : 'Nội bộ' : ''
            item.position = item.meta && item.meta != null && JSON.parse(item.meta).position ? JSON.parse(item.meta).position == 'N/A' ? '' : JSON.parse(item.meta).position : ''
            item.department_name = item.department && Object.keys(item.department).length > 0 && item.department.department_name ? item.department.department_name : ''
            return item
        })
        if (sort) {
            data.sort((firtItem, lastItem) => sortFieldName(firtItem, lastItem, fieldName, defautSort))
        }
        setParams({ ...params, total: res.data.data.total })
        setLeaders(data)
        setLoading(false);
        setIsSort(false)
        setReload(false)
        setIsFilterData(false)
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

    function ActionViewResults() {

    }

    function ActionMessage() {
        history.push('/chat')
    }

    function ActionError() {

    }

    function handleClosePopupRemoveLeader() {
        setShowPopupRemoveLeader(false)
    }

    function handleConfirmPopupRemoveLeader() {
        setLoadingButtonRemoveLeader(true)
        CourseService.removeLeaderOfCourse(
            courseId,
            leaderId,
            res => {
                removeLeader(leaderId)
                setLoadingButtonRemoveLeader(false)
                setShowPopupRemoveLeader(false)
                setLeaderId(null)
                makeShortMessage('Xoá quản lý thành công', "success");
                setIsFilterData(true)
            },
            err => {
                setLoadingButtonRemoveLeader(false)
                console.log(err)
            }
        )
    }

    function RemoverLeader(row) {
        setLeaderId(row.id)
        setShowPopupRemoveLeader(true)
    }

    function handleFilter(nameField, value) {
        setParams({ ...params, [nameField]: value })
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

    function handleActionFilter() {
        setIsFilterData(true)
    }

    return (
        <div className={classes.studentList}>
            <div className="view__header">
                <div className="header__search">
                    <Search onSearch={handleSearch} fieldName={fieldsSearch} placeholder={getTranslation('SearchForUnit') + '...'} />
                </div>
                <div className="view-action__filter">
                    {filters && filters.length > 0 && filters.map((filter, indexFilter) => {
                        return (
                            <div className="view-action__filter--item" key={indexFilter} style={{ width: filter.widthItem ? filter.widthItem : '200px' }}>
                                <MultipleSelect
                                    nameField={filter.fieldFilter}
                                    listData={filter.list || []}
                                    placeholder={filter.placeholder}
                                    handleFilter={handleFilter}
                                    widthItem={filter.widthItem}
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
                rows={leaders}
                columns={user.id == teacherId || user.role == "admin" ? columns : columnsMage }
                loading={loading}
                optPaging={params}
                getTranslation={getTranslation}
                fieldId={'id'}
                noSelection={true}
                handlePageChange={handlePageChange}
            />
            {showPopupRemoveLeader && (
                <Dialog
                    CustomWidth={classes.CustomWidth}
                    open={showPopupRemoveLeader}
                    onClose={handleClosePopupRemoveLeader}
                    actionLabel={getTranslation("Delete")}
                    action={handleConfirmPopupRemoveLeader}
                    noIcon={true}
                    getTranslation={getTranslation}
                    classButton="button--white"
                    loadingButton={loadingButtonRemoveLeader}
                    rootDialogContentStyle={classes.rootDialogContentStyle}
                >
                    {getTranslation("DoYouWantToTemoveTheManagerFromTheProject")}
                </Dialog>
            )}
        </div>
    )
}

export default LeaderView