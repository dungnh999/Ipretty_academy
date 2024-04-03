
import React, { useEffect, useMemo, useReducer, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { useHistory } from "react-router-dom"
import { Box, makeStyles } from '@material-ui/core'
import contextHelper from 'ipretty/helpers/contextHelper'
import AntTabs from 'ipretty/components/Tabs/AntTabs'
import AntTab from 'ipretty/components/Tabs/AntTab'
import IconImage from "ipretty/components/IconImage"
import Skeleton from 'ipretty/components/Skeleton'
import UserService from 'ipretty/services/UserService'
import SnackBar from 'ipretty/components/SnackBar'
import CreatePage from 'ipretty/components/CreatePage/CreatePage'
import UserForm from '../components/UserForm'
import Save from '../../../../public/icons_ipretty/Save.svg'
import InviteEmail from '../components/InviteEmail'
import Send from '../../../../public/icons_ipretty/Send.svg'

const useStyles = makeStyles(theme => ({
    managementView: {
        "& .view": {
            [theme.breakpoints.down("xl")]: {
                padding : "32px calc((100% - 928px)/2) 20.75rem",
            },
            [theme.breakpoints.down("lg")]: {
                padding : '32px calc((100% - 928px)/2) 50px',
            },
            [theme.breakpoints.down("xs")]: {
                paddingTop:'0px',//responsive bug 77 tren man dien thoai
                padding : '0px',//fix pading 
            },
            [theme.breakpoints.down("sm")]: {
                padding : '0px',//fix padding
            },
            "& .tabs": {
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                [theme.breakpoints.down("xs")]: {
                    paddingBottom: 30
                },
                [theme.breakpoints.up("sm")]: {
                    paddingBottom: 0
                },
                "& .tabs__ant-tabs": {
                    "& .MuiButtonBase-root": {
                        color: '#27384C',
                        fontSize: 20,
                        fontWeight: 700 ,
                        textTransform : 'none',
                        fontFamily: 'San Francisco Text Bold G1',
                        '&:hover': {
                            color: "#147B65",
                            opacity: 1,
                        },
                    },
                    "& .ant__tabs" : {
                        "& .ant__tabs__tab--invite" : {
                            [theme.breakpoints.up("md")]: {
                                marginLeft : 80
                            },
                            [theme.breakpoints.down("sm")]: {
                                marginLeft : 10
                            },
                        },
                    },
                    "& .MuiTab-root" : {
                        maxWidth : "100%",
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
            // height: '40px',
            // minWidth : 106,
            "& .tabs__action--dow" : {
                padding : '0 24px'
            },
            "& .tabs__action--add" : {
                padding : '0 48px 0 24px'
            }
        },
    }
}))

function ManagementUserView(props) {
    const { isCreate, links, history , userDetail , loading ,isEdit } = props
    const { getTranslation, user, logout } = useAuth()
    const userRole = user.menuroles
    const classes = useStyles()
    const [loadingAction, setLoadingAction] = useState(false)
    const { handleError } = contextHelper
    const [avatar, setAvatar] = useState()
    const [value, setValue] = useState('addUser');
    const [loadingButtonAction, setLoadingButtonAction] = useState(false)
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })
    const actionsCreate = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleAction, icon: value == 'addUser' ? <IconImage srcIcon={Save} />  : <IconImage srcIcon={Send} /> , label: value == 'addUser' ? getTranslation('Save') : getTranslation('Send')  ,noIcon: false, buttonClass: 'button button__save button--green', loading: loadingAction },   
    ]
    const [errors, setErrors] = useState([])
    const titlePage = getTranslation('AddMember')
    
    const [dataUser, setDataUser] = useState({
        name: '',
        email: '',
        department_id: '',
        role: '',
        password : '',
        confirmpassword : '',
        isTeacher :  false,
        birthday: '',
        avatar: '',
        phone : '',
        address : '', // địa chỉ
        code : '', //mã thành viên
        company : '', // công ty
        position : '', // chức vụ
        gender : '' , // giới tính
    })

    const [departments, setDepartments] = useState([])
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

    useEffect(() => {
        if (isEdit && userDetail && Object.keys(userDetail).length > 0) {
            setDataUser(userDetail)
        }
    }, [userDetail])

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

    function _handleError(err) {
        setErrors(err.response.data.errors)
    }

    function onSuccess(message, url) {
        setSnackbar({
            openSnackbar: true,
            message: message,
            variant: 'success',
        })
        setTimeout(() => {
            history.push(url)
        }, 1000)
    }

    function onErrr(message, url) {
        setSnackbar({
            openSnackbar: true,
            message: message,
            variant: 'error',
        })
        setTimeout(() => {
            history.push(url)
        }, 1000)
    }

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    function handleChange(e, newValue) {
        setValue(newValue)
    }

    function handleCancel() {
        history.push('/users')
    }

    function redirectBack() {
        history.push('/users')
    }
    
    function handleAction() {
        setErrors(false)
        setLoadingAction(true)
        const data = new FormData()
        for (let key in dataUser) {
            data.append(key, dataUser[key]);
        }

        if (value == 'addUser') {
            UserService.create(
                data,
                res => {
                    onSuccess(getTranslation('SignUpSuccess'), '/users')
                    setLoadingAction(false)
                },
                err => {
                    setLoadingAction(false)
                    _handleError(err)
                }
            )
        } else {
            UserService.invite_user(data,
            res => {
                onSuccess(getTranslation('Invitationsentsuccessfully'), '/users/add')
                setLoadingAction(false)
                setDataUser({ ...dataUser , email: ''})
            },
            err => {
                setLoadingAction(false)
                console.log(err);
                _handleError(err)
            })
        }
    }
    
    return (
        <CreatePage
            links={links}
            isCreate={isCreate}
            redirectBack={redirectBack}
            titleUrl={getTranslation("AddMembers")}
            multipleBlock={true}
            titlePage={titlePage}
            onApply={handleAction}
            actions={actionsCreate}
            onClick={() => history.push("/users")}
            loadingButtonAction={loadingButtonAction}>

            {loading ? (
                <Skeleton type="table" />
            ) : (
                <div className={classes.managementView}>
                    <div className="view">
                        <div className="tabs">
                            <div className="tabs__ant-tabs">
                                <AntTabs className="ant__tabs" value={value} onChange={handleChange}>
                                    <AntTab  className="ant__tabs__tab--addUser" value={'addUser'} label={getTranslation('enterinformation')} />
                                    <AntTab className="ant__tabs__tab--invite" value={'inviteEmail'} label={getTranslation('invitemembersviaemail')} />
                                </AntTabs>
                            </div>
                        </div>
                        {value === 'addUser' && (
                            <UserForm type='addUser' errors={errors} dataUser={dataUser} setDataUser={setDataUser} userDetail={userDetail} />
                        )}
                        {value === 'inviteEmail' && (
                            <InviteEmail type='inviteEmail' errors={errors} setErrors={setErrors} user={dataUser} setUser={setDataUser} setLoadingAction={setLoadingAction} loadingAction={loadingAction}/>
                        )}
                    </div>
                </div>
            )}
            {snackbar.openSnackbar && (
            <SnackBar
                close={closeSnackbar}
                message={snackbar.message}
                variant={snackbar.variant}
            />
            )}
       </CreatePage>
    )
}

export default ManagementUserView