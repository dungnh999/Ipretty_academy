
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { useLocation, useHistory } from "react-router-dom"
import { Box, makeStyles } from '@material-ui/core'
import StudentsView from './StudentsView'
import LeaderView from './LeaderView'
import AntTabs from 'ipretty/components/Tabs/AntTabs'
import AntTab from 'ipretty/components/Tabs/AntTab'
import DetailPage from 'ipretty/components/DetailPage/DetailPage'
import Export from '../../../../public/icons_ipretty/Export.png'
import Plus from '../../../../public/icons_ipretty/Plus.png'
import IconImage from "ipretty/components/IconImage"
import ImportDialog from 'ipretty/components/Dialog/ImportDialog'
import AddButton from 'ipretty/components/AddButton'
import AppStatusReducer from 'ipretty/context/AppStatusReducer'
import Leader from '../components/imports/Leader'
import Student from '../components/imports/Student'
import UserService from 'ipretty/services/UserService'
import CourseService from 'ipretty/services/CourseService'
import Skeleton from 'ipretty/components/Skeleton'
import { parseParams } from 'ipretty/helpers/contextHelper'
import { FlagTwoTone, LaptopWindows } from '@material-ui/icons'
import queryString from "query-string";

const useStyles = makeStyles(theme => ({
    managementView: {
        padding: 32,
        [theme.breakpoints.down("xs")]: {
            padding: 10,
        },
        [theme.breakpoints.up('sm')]: {
            padding: 20,
         },
        "& .view": {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(1),
            padding: 32,
            marginTop: 28,
            "& .tabs": {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                [theme.breakpoints.down("xs")]: {
                    flexDirection: 'column',
                },
                "& .tabs__ant-tabs": {
                    "& .MuiButtonBase-root": {
                        color: '#44AD92',
                        fontSize: 20,
                        fontWeight: 'bold',
                    },
                    "& .MuiButtonBase-root:nth-child(1)": {
                        padding: 0
                    },
                    "& .MuiButtonBase-root:nth-child(2)": {
                        padding: '0 50px'
                    },
                },
                "& .tabs__action": {
                    display: 'flex',
                    [theme.breakpoints.down("xs")]: {
                        paddingTop : '18px',
                        flexDirection: 'column',
                    },
                    "& .tabs__action--add": {
                        marginLeft: 10,
                        [theme.breakpoints.down("xs")]: {
                            marginLeft: 0,
                            paddingTop: 18
                        },
                        '& button' : {
                            minWidth : '187px'
                        }
                    },
                    "& .tabs__action--export" : {
                        '& button' : {
                            minWidth : '130px'
                        }
                    },
                    "& .button": {
                        backgroundColor: '#fff',
                        border: '1px solid #147B65',
                        color: '#147B65',
                        fontSize: 16,
                    }
                },
            },
            "& .view__header": {
                display: 'flex',
                margin: '20px 0 15px 0',
                justifyContent: 'space-between',
                [theme.breakpoints.down("md")]: {
                    flexWrap: 'wrap',
                },
               '& .header__search': {
                    '& input': {
                        width: 200,
                    },
                    '& svg': {
                        height: 24,
                        width: 24,
                    }
                },
                "& .view-action__filter": {
                    display: 'flex',
                    [theme.breakpoints.down("md")]: {
                        flexWrap: 'wrap',
                        paddingTop : 18
                    },
                    "& .view-action__filter--item": {
                        width: 150,
                        marginRight: 10,
                        [theme.breakpoints.down("md")]: {
                           paddingTop :  10
                        },
                        "& .MuiFormControl-root": {
                            width: '100%',
                            "& .MuiSelect-root": {
                                padding: 10
                            },
                            "& .MuiInputBase-root": {
                                background: "#FFFFFF"
                            }
                        },
                        "& .MuiInput-underline": {
                            padding: '4px',
                            border: '1px solid #C4C4C4'
                        }
                    },
                    "& .view-action__filter--datatime" : {
                        [theme.breakpoints.down("xs")]: {
                            minWidth : 160
                        },
                    },
                    "& .view-action__filter--button" : {
                        [theme.breakpoints.down("md")]: {
                            paddingTop :  10
                         },
                    }
                }
            }
        }
    },
    CustomWidth: {
        maxWidth: 370
    }
}))

function ManagementView(props) {
    const classes = useStyles()
    const courseId = props.match.params.courseId
    const teacherId = queryString.parse(props.location.search).teacher_id
    let history = useHistory()
    const { getTranslation , user } = useAuth()
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation('CourseDetail'), path: `/courses/${courseId}/detail` }
    ], [])
    const linkFlowTeacher = useMemo(() => [
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation('CourseDetail'), path: `/courses/${courseId}/detail` }
    ], [])
    const opendDataViewDialog = {
        status: false,
        Component: '',
        title: '',
        list: '',
        action: '',
        fieldRender: ''
    }
    const [value, setValue] = useState('students');
    let location = useLocation()
    const paramsQuery = useMemo(() => parseParams(location.search), [location])
    const [stateOpenDialog, dispatchShowDialog] = useReducer(AppStatusReducer, opendDataViewDialog)
    const [options, setOption] = useState({
        students: [],
        leaders: [],
        studentsInCourse: [],
        leadersInCourse: []
    })
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const [ loadingAdd , setLoadingAdd] = useState(false)
    useEffect(() => {
        setLoading(true)
        Promise.all([
            UserService.getUsersByRole({ role: 'student' }),
            UserService.getUsersByRole({ role: 'leader' }),
            CourseService.asyncListOfStudentsInTheCourse(courseId),
            CourseService.asyncListOfLeaderInTheCourse(courseId)
        ]).then(([students, leaders, studentsInCourse, leadersInCourse]) => {
            let studentsCourse = studentsInCourse.data.data
            let leadersCourse = leadersInCourse.data.data
            let listStudent = students.data.data
            let listLeader = leaders.data.data
            options.students = listStudent
            options.studentsInCourse = studentsCourse
            options.leadersInCourse = leadersCourse
            options.leaders = listLeader
            setOption({ ...options })
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    function handleChange(e, newValue) {
        setValue(newValue)
    }

    function redirectBack() {
        history.push(`/courses/${courseId}/detail`)
    }

    function handleExport() {
        if (value == 'students') {
            handleExportStudent()
        } else {
            handleExportLeader()
        }
    }

    function handleExportStudent() {
        CourseService.exportListOfStudentsInTheCourse(
            courseId,
            {export: 1},
            res => {
                var blob = new Blob([res.data])
                var downloadUrl = window.URL.createObjectURL(blob)
                var a = document.createElement('a')
                a.href = downloadUrl
                a.setAttribute('download', 'studens'+ '.xlsx')
                document.body.appendChild(a)
                a.click()
                setDataRes({
                    open: true,
                    message: getTranslation('Fileexportsuccessful'),
                    variant: 'success',
                });
            },
            err => {
                console.log(err)
            }
        )
    }

    function handleExportLeader() {
        CourseService.exportListOfLLeadersInTheCourse(
            courseId,
            {export: 1},
            res => {
                var blob = new Blob([res.data])
                var downloadUrl = window.URL.createObjectURL(blob)
                var a = document.createElement('a')
                a.href = downloadUrl
                a.setAttribute('download', 'leaders'+ '.xlsx')
                document.body.appendChild(a)
                a.click()
                setDataRes({
                    open: true,
                    message: getTranslation('Fileexportsuccessful'),
                    variant: 'success',
                });
            },
            err => {
                console.log(err)
            }
        )
    }
    
    function handleAddMember(list) {
        setLoadingAdd(true)
        const _list = [...list]
        let newList = _list.map(item => item.id)
        let data = new FormData()
        data.append('course_id', courseId)
        if (value == 'students') {
            data.append('student_ids', newList)
            CourseService.addStudentsIntoCourse(
                data,
                res => {
                    dispatchShowDialog({
                        type: 'SHOW_AND_CLOSE_DIALOG',
                        payload: {
                            status: false,
                            Component: '',
                            title: '',
                            list: '',
                            selected: ''
                        }
                    })
                    setLoadingAdd(false)
                    setReload(true)
                    options.studentsInCourse = list
                    setOption({ ...options })
                },
                err => {
                    console.log(err)
                }
            )
        }else {
            data.append('leader_ids', newList)
            CourseService.addLeadersIntoCourse(
                data,
                res => {
                    dispatchShowDialog({
                        type: 'SHOW_AND_CLOSE_DIALOG',
                        payload: {
                            status: false,
                            Component: '',
                            title: '',
                            list: '',
                            selected: ''
                        }
                    })
                    setLoadingAdd(false)
                    setReload(true)
                    options.leadersInCourse = list
                    setOption({ ...options })
                    // window.location.reload();
                },
                err => {
                    console.log(err)
                }
            )
        }

    }

    function handleAction() {
        if (value != 'students') {
            dispatchShowDialog({
                type: 'SHOW_AND_CLOSE_DIALOG',
                payload: {
                    status: true,
                    Component: Leader,
                    title: 'Thêm người quản lý',
                    list: options.leaders,
                    selected: options.leadersInCourse
                }
            })
        } else {
            dispatchShowDialog({
                type: 'SHOW_AND_CLOSE_DIALOG',
                payload: {
                    status: true,
                    Component: Student,
                    title: 'Thêm học viên',
                    list: options.students,
                    selected: options.studentsInCourse
                }
            })
        }
    }

    function removeLeader(leaderId) {
        let _leaders = options.leadersInCourse.filter(leader => leader.id != leaderId)
        options.leadersInCourse = _leaders
    }
    // console.log(user)
    return (
        <div className={classes.managementView}>
            <DetailPage
                links={user.role === 'admin' ? links : linkFlowTeacher}
                titleCurrent={getTranslation('ManageParticipants')}
                actions={[]}
                redirectBack={redirectBack}
            >
                {loading ? (
                    <Skeleton type="table" />
                ) : (
                    <div className="view">
                        <div className="tabs">
                            <div className="tabs__ant-tabs">
                                <AntTabs value={value} onChange={handleChange}>
                                    <AntTab value={'students'} label={getTranslation('Student')} />
                                    {paramsQuery.course_type == 'Group' ? (
                                        <AntTab value={'leaders'} label={getTranslation('Leader')} />
                                    ) : ''}
                                </AntTabs>
                            </div>
                            <div className="tabs__action">
                                {
                                    user.permissions.includes("manage_student") && user.role != "admin" && value != 'leaders' || user.role == "admin" || user.id == teacherId ?
                                        <>
                                            <div className="tabs__action--export">
                                                <AddButton
                                                    label={getTranslation('Export')}
                                                    id="update-button"
                                                    buttonClass="button button--white"
                                                    onClick={handleExport}
                                                    variant='contained'
                                                    iconButton={<IconImage srcIcon={Export} />}
                                                    disabled={false}
                                                />
                                            </div>
                                            <div className="tabs__action--add">
                                                <AddButton
                                                    label={value == 'students' ? getTranslation('AddStudent') : getTranslation('AddLeader')}
                                                    id="update-button"
                                                    buttonClass="button button--white"
                                                    onClick={handleAction}
                                                    variant='contained'
                                                    iconButton={<IconImage srcIcon={Plus} />}
                                                    disabled={false}
                                                />
                                            </div> 
                                        </>
                                        : ''
                                }
                            </div>
                        </div>
                        {value === 'students' && (
                            <StudentsView type='students' courseId={courseId} setReload={setReload} reload={reload} classes={classes}  teacherId={teacherId}/>
                        )}
                        {value === 'leaders' && (
                            <LeaderView type='leaders' courseId={courseId} setReload={setReload} reload={reload} classes={classes} removeLeader={removeLeader} teacherId={teacherId}/>
                        )}
                        {stateOpenDialog.status && (
                            <ImportDialog
                                componentImport={stateOpenDialog.Component}
                                openDialog={stateOpenDialog.status}
                                stateOpenDialog={stateOpenDialog}
                                title={stateOpenDialog.title}
                                listData={stateOpenDialog.list}
                                action={stateOpenDialog.action}
                                selected={stateOpenDialog.selected}
                                dispatchStatus={dispatchShowDialog}
                                handleActionData={handleAddMember}
                                loading={loading}
                                loadingAdd={loadingAdd}
                            />
                        )}
                    </div>
                )}
            </DetailPage>
        </div>
    )
}

export default ManagementView