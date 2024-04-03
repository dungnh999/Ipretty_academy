
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { useHistory } from "react-router-dom"
import { Box, makeStyles, Button, Typography } from '@material-ui/core'
import { useNotiStackContext } from 'ipretty/context/Notistack'
// import StudentsView from './StudentsView'
import AntTabs from 'ipretty/components/Tabs/AntTabs'
import AntTab from 'ipretty/components/Tabs/AntTab'
import DetailPage from 'ipretty/components/DetailPage/DetailPage'
import Plus from '../../../../public/icons_ipretty/Plus.png'
import Down from '../../../../public/icons_ipretty/download.png'
import PlusWhite from '../../../../public/icons_ipretty/Plus_White.png'
import IconImage from "ipretty/components/IconImage"
import Skeleton from 'ipretty/components/Skeleton'
import StudentsView from './management-view/StudentView'
import TeacherView from './management-view/TeacherView'
import AdminView from './management-view/AdminView'
import StaffView from './management-view/StaffView'
import Dialog from 'ipretty/components/Dialog/Dialog'
import UserService from 'ipretty/services/UserService'
import { initialPramsCourse } from 'ipretty/helpers/contextHelper'
import queryString from "query-string"
import Upload_white from "../../../../public/icons_ipretty/Upload_white.svg"

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
        "& .view": {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(1),
            padding: '10px 32px 32px',
            [theme.breakpoints.down("xs")]: {
                padding: '10px 22px 32px',
            },
            marginTop: 28,
            "& .tabs": {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                "& .tabs__ant-tabs": {
                    width : '100%',
                    '& .ant__tabs': {
                        '& .MuiTabs-fixed': {
                            overflow: 'scroll !important'
                          },
                        "& .MuiButtonBase-root": {
                            color: '#395B65',
                            fontSize: 20,
                            fontWeight: 'bold',
                            '&:hover': {
                                color: "#44AD92",
                                opacity: 1,
                            },
                            "&:focus": {
                                color: "#44AD92",
                            },
                        },
                        "& .ant__tabs--teacher": {
                            margin: '0 84px',
                        },
                        "& .ant__tabs--employee": {

                        },
                        "& .ant__tabs--user": {
                            marginLeft: 84
                        },
                    },
                    "& .MuiButtonBase-root:nth-child(1)": {
                        padding: 0
                    },
                    "& .MuiButtonBase-root:nth-child(2)": {

                    },
                },
            },
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
    },
    styleError: {
        marginTop: 10,
        "& .error-import": {
            color: '#DC4F68'
        }
    },
    messageError: {
        color: '#DC4F68'
    },
}))

function ManagementUserView(props) {
    const { } = props
    const classes = useStyles()
    const { makeShortMessage } = useNotiStackContext();
    const { getTranslation } = useAuth()
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
    ], [])
    const [dataFile, setDataFile] = useState()
    const accept = useMemo(() => '.xlsm,.xlsx,.xls,.xltx', []);
    const [params, setParams] = useState(initialPramsCourse(queryString.parse(location.search, { arrayFormat: 'comma' })))
    const [departments, setDepartments] = useState([])
    const [value, setValue] = useState('admin');
    const titlePage = getTranslation('MemberManagement')
    let history = useHistory()
    const [isShowUploadFile, setIsShowUploadFile] = useState(false)
    const [loading, setLoading] = useState(false)
    const [reload, setReload] = useState(false)
    const actions = [
        { id: 1, action: redirectDownloadTemplate, icon: <IconImage srcIcon={Down} />, noIcon: false, label: getTranslation('DownloadTemplate'), buttonClass: 'button button__manage button--green' },
        { id: 2, action: redirectDownload, icon: <IconImage srcIcon={Down} />, noIcon: false, label: getTranslation('Download'), buttonClass: 'button button__manage button--green' },
        { id: 3, action: redirectUploadFile, icon: <IconImage srcIcon={PlusWhite} />, noIcon: false, label: getTranslation('uploadmemberlist'), buttonClass: 'button button__manage button--green' },
        { id: 4, action: redirectAdd, icon: <IconImage srcIcon={Plus} />, noIcon: false, label: getTranslation('addmember'), buttonClass: 'button button__manage button__edit button--white' },
    ]
    const status = useMemo(() => [
        { id: 1, name: getTranslation('active') },
        { id: 2, name: getTranslation('deactivated') },
        { id: 3, name: getTranslation('notactivated') }
    ], [])
    const [errorImportUser, setErrorImportUser] = useState({})
    const [messageError, setMessageError] = useState(null)
    const [admins, setAdmins] = useState([])
    const [employees, setEmployees] = useState([])
    const [teachers, setTeachers] = useState([])
    const [users, setUsers] = useState([])
    const [loadDataAdmin, setLoadDataAdmin] = useState(false)
    const [loadDataTeacher, setLoadDataTeacher] = useState(false)
    const [loadDataEmployee, setLoadDataEmployee] = useState(false)
    const [loadDataUser, setLoadDataUser] = useState(false)

    useEffect(() => {
        setLoading(true)
        Promise.all([
            UserService.getUsersByRole({...params, role : 'admin' , paging: true}),
            UserService.getUsersByRole({...params, role : 'employee' , paging: true}),
            UserService.getUsersByRole({...params, role : 'teacher' , paging: true}),
            UserService.getUsersByRole({...params, role: 'user' , paging: true})
        ]).then(([admins, employees, teachers, users]) => {
            setAdmins(admins)
            setEmployees(employees)
            setTeachers(teachers)
            setUsers(users)
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])

    useEffect(() => {
        if (loadDataAdmin) {
            setLoading(true)
            Promise.all([
                UserService.getUsersByRole({...params, role : 'admin' , paging: true}),
            ]).then(([admins]) => {
                setAdmins(admins)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
                setLoadDataAdmin(false)
            })
        }
    }, [loadDataAdmin])

    useEffect(() => {
        if (loadDataEmployee) {
            setLoading(true)
            Promise.all([
                UserService.getUsersByRole({...params, role : 'employee' , paging: true})
            ]).then(([employees]) => {
                setEmployees(employees)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
                setLoadDataEmployee(false)
            })
        }
    }, [loadDataEmployee])

    useEffect(() => {
        if (loadDataTeacher) {
            setLoading(true)
            Promise.all([
                UserService.getUsersByRole({...params, role : 'teacher' , paging: true}),
            ]).then(([teachers]) => {
                setTeachers(teachers)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
                setLoadDataTeacher(false)
            })
        }
    }, [loadDataTeacher])

    useEffect(() => {
        if (loadDataUser) {
            setLoading(true)
            Promise.all([
                UserService.getUsersByRole({...params, role: 'user' , paging: true})
            ]).then(([users]) => {
                setUsers(users)
            }).catch(err => {
                console.log(err)
            }).finally(() => {
                setLoading(false)
                setLoadDataUser(false)
            })
        }
    }, [loadDataUser])

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    getDepartments()
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [])

    function getDepartments() {
        UserService.getDepartments(
            res => {
                const response = res.data.data
                response && response.map((item) => {
                    item.name = item.department_name ? item.department_name : ""
                    item.id = item.department_id ? item.department_id : ""
                    return item
                })
                setDepartments(response)
            },
            err => {
                onErrr('Không thể tải dữ liệu', '/users')
            }
        )
    }

    function handleChange(e, newValue) {
        setValue(newValue)
    }

    function redirectAdd() {
        history.push('/users/add')
    }

    const handleAfterExport = (data, nameFile) => {
        var blob = new Blob([data]);
        var downloadUrl = window.URL.createObjectURL(blob);
        var a = document.createElement("a");
        a.href = downloadUrl;
        a.setAttribute('download', nameFile + '.xlsx');
        document.body.appendChild(a);
        a.click();
        makeShortMessage(getTranslation('Fileexportsuccessful'), "success")
    }

    function redirectUploadFile() {
        setDataFile(null)
        setMessageError(null)
        setErrorImportUser({})
        setIsShowUploadFile(true);
    }

    function handleCloseUploadFile() {
        setDataFile()
        setErrorImportUser({})
        setIsShowUploadFile(false)
    }

    function handleChangeFile(e) {
        setErrorImportUser({})
        setMessageError()
        const { name } = e.target.files[0]
        setDataFile(e.target.files[0])
    }

    function handleUploadFileUsers() {
        const data = new FormData()
        setMessageError()
        data.append('importFile', dataFile);
        if (value === 'user'){
            UserService.importUser( { ...params, role: 'user'},
                data,
                res => {
                    makeShortMessage(getTranslation('Uploadedinvitation'), "success");
                    setLoadDataUser(true)
                    setDataFile(null)
                    setTimeout(() => {
                        setIsShowUploadFile(false)
                    }, 2000)
                },
                err => {
                    handleError(err)
                }
            )
        }else if (value === 'teacher') {
            UserService.importUser( { ...params, role: 'teacher'},
                data,
                res => {
                    makeShortMessage(getTranslation('Uploadedinvitation'), "success");
                    setLoadDataTeacher(true)
                    setDataFile(null)
                    setTimeout(() => {
                        setIsShowUploadFile(false)
                    }, 2000)
                },
                err => {
                    handleError(err)
                }
            )
        }else if (value === 'admin') {
            UserService.importUser( { ...params, role: 'admin'},
                data,
                res => {
                    makeShortMessage(getTranslation('Uploadedinvitation'), "success");
                    setLoadDataAdmin(true)
                    setDataFile(null)
                    setTimeout(() => {
                        setIsShowUploadFile(false)
                    }, 2000)
                },
                err => {
                    handleError(err)
                }
            )
        } else {
            UserService.importUser( { ...params, role: 'employee'},
                data,
                res => {
                    makeShortMessage(getTranslation('Uploadedinvitation'), "success");
                    setLoadDataEmployee(true)
                    setDataFile(null)
                    setTimeout(() => {
                        setIsShowUploadFile(false)
                    }, 2000)
                },
                err => {
                    handleError(err)
                }
            )
        }
    }

    function handleError(err) {
        if (err.response.data.data && Object.keys(err.response.data.data).length > 0) {
            setErrorImportUser(err.response.data.data)
        } else {
            setMessageError(err.response.data.message)
        }
    }

    function redirectDownloadTemplate() {
        if (value === 'user') {
            UserService.getExportTemplate({ ...params, role: 'user' },
                res => {
                    handleAfterExport(res.data, 'Template-student')
                }),
                err => {
                    console.log(err)
                }
        } else if (value === 'teacher') {
            UserService.getExportTemplate({ ...params, role: 'teacher' },
                res => {
                    handleAfterExport(res.data, 'Template-teacher')
                }),
                err => {
                    console.log(err)
                }
        } else if (value === 'admin') {
            UserService.getExportTemplate({ ...params, role: 'admin' },
                res => {
                    handleAfterExport(res.data, 'Template-admin')
                }),
                err => {
                    console.log(err)
                }
        } else {
            UserService.getExportTemplate({ ...params, role: 'employee' },
                res => {
                    handleAfterExport(res.data, 'Template-staff')
                }),
                err => {
                    console.log(err)
                }
        }
    }
    
    function redirectDownload() {
        if (value === 'user') {
            UserService.getExportFile({ ...params, paging: 0, role: 'user', export: 1 },
                res => {
                    handleAfterExport(res.data, 'list-user-student')
                }),
                err => {
                    console.log(err)
                }
        } else if (value === 'teacher') {
            UserService.getExportFile({ ...params, paging: 0, role: 'teacher', export: 1 },
                res => {
                    handleAfterExport(res.data, 'list-user-teacher')
                }),
                err => {
                    console.log(err)
                }
        } else if (value === 'admin') {
            UserService.getExportFile({ ...params, paging: 0, role: 'admin', export: 1 },
                res => {
                    handleAfterExport(res.data, 'list-user-admin')
                }),
                err => {
                    console.log(err)
                }
        } else {
            UserService.getExportFile({ ...params, paging: 0, role: 'employee', export: 1 },
                res => {
                    handleAfterExport(res.data, 'list-user-staff')
                }),
                err => {
                    console.log(err)
                }
        }
    }

    function redirectBack() {
        history.push('/')
    }

    function renderError(err) {
        for (let key in err) {
            // console.log(key, '-----')
            // console.log(err[key])
            if (err[key].length > 0) {
                switch (key) {
                    case 'exists_code':
                        return <div className="error-import">{`Mã thành viên đã tồn tại: ${err[key].toString()}`}</div>
                        break;
                    case 'exists_department_id':
                        return <div className="error-import">{`Mã phòng ban không tồn tại: ${err[key].toString()}`}</div>
                        break;
                    case 'exists_email':
                        return <div className="error-import">{`Email đã tồn tại: ${err[key].toString()}`}</div>
                        break;
                    case 'exists_role':
                        return <div className="error-import">{`Vai trò không tồn tại: ${err[key].toString()}`}</div>
                        break;
                    case 'invalid_format':
                        return <div className="error-import">{`Sai format: ${err[key].toString()}`}</div>
                        break;
                    case 'invalid_format_code':
                        return <div className="error-import">{`Sai format mã nhân viên: ${err[key].toString()}`}</div>
                        break;
                    case 'invalid_format_phone':
                        return <div className="error-import">{`Sai format sô điện thoại: ${err[key].toString()}`}</div>
                        break;
                    case 'length_code':
                        return <div className="error-import">{`Số lượng kí tự mã thành viên chưa đủ: ${err[key].toString()}`}</div>
                        break;
                    case 'invalid_role_and_department':
                        return <div className="error-import">{`Tài khoản có vai trò là nhân viên thì không có bộ phận`}</div>
                        break;
                    case 'no_data':
                        return <div className="error-import">{`Bạn chưa nhập dữ liệu`}</div>
                        break;
                    case 'name_required':
                        return <div className="error-import">{`Bạn chưa nhập tên thành viên`}</div>
                        break;
                    case 'department_id_required':
                        return <div className="error-import">{`Bạn chưa nhập bộ phận`}</div>
                        break;
                    case 'phone_is_required':
                        return <div className="error-import">{`Bạn chưa nhập số điện thoại`}</div>
                        break;
                    case 'email_required':
                        return <div className="error-import">{`Bạn chưa chọn email ở vị trí tài khoản: ${err[key].toString()}`}</div>
                        break;
                    default:
                        break;
                }
            }
        }
    }

    return (
        <div className={classes.managementView}>
            <DetailPage
                links={links}
                titleCurrent={titlePage}
                actions={actions}
                redirectBack={redirectBack}
            >
                {loading ? (
                    <Skeleton type="table" />
                ) : (
                    <div className="view">
                        <div className="tabs">
                            <div className="tabs__ant-tabs">
                                <AntTabs className="ant__tabs" value={value} onChange={handleChange}>
                                    <AntTab value={'admin'} label={getTranslation('Admin')} />
                                    <AntTab className="ant__tabs--teacher" value={'teacher'} label={getTranslation('Teacher')} />
                                    <AntTab className="ant__tabs--employee" value={'employee'} label={getTranslation('Staff')} />
                                    <AntTab className="ant__tabs--user" value={'user'} label={getTranslation('Student')} />
                                </AntTabs>
                            </div>

                        </div>
                        {value === 'user' && (
                            <StudentsView type='user' reload={reload} status={status} data={users} setReload={setReload}/>
                        )}
                        {value === 'teacher' && (
                            <TeacherView type='teacher' reload={reload} status={status} data={teachers}/>
                        )}
                        {value === 'employee' && (
                            <StaffView type='employee' reload={reload} status={status} departments={departments} data={employees}/>
                        )}
                        {value === 'admin' && (
                            <AdminView type='admin' reload={reload} status={status} departments={departments} data={admins}/>
                        )}
                    </div>
                )}
            </DetailPage>
            {isShowUploadFile && (
                <Dialog
                    maxWidth="sm"
                    open={isShowUploadFile}
                    onClose={handleCloseUploadFile}
                    actionLabel={getTranslation("UpLoad")}
                    action={handleUploadFileUsers}
                    noIcon={false}
                    title={getTranslation("Uploadnewlistings")}
                    iconButton={<IconImage srcIcon={Upload_white} />}
                    getTranslation={getTranslation}
                >
                    {getTranslation("UploadLists")}
                    <div className="button-upload" style={{ paddingTop: 10, display: 'flex' }}>
                        <label id="contained-button-file">
                            <Button
                                variant="outlined"
                                component="span"
                            >
                                {getTranslation('ChooseFile')}
                            </Button>
                            <input accept={accept} onChange={handleChangeFile} id="contained-button-file" hidden={true} type="file" />
                        </label>
                        {
                            dataFile && dataFile.name ?
                                <Typography htmlFor="contained-button-file" style={{ padding: 10 }} >{dataFile.name}</Typography>
                                :
                                <Typography htmlFor="contained-button-file" style={{ padding: 10 }} >{getTranslation('NoChooseFile')}</Typography>
                        }
                    </div>
                    {errorImportUser && Object.keys(errorImportUser).length > 0 ? (
                        <div className={classes.styleError}>
                            {renderError(errorImportUser)}
                        </div>
                    ) : ''}
                    {messageError && <div className={classes.messageError}>{messageError}</div>}
                </Dialog>
            )}
        </div>
    )
}

export default ManagementUserView