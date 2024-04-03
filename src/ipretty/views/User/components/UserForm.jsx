import { makeStyles, Typography } from '@material-ui/core'
import CreatePage from 'ipretty/components/CreatePage/CreatePage'
import React, { useState, useEffect } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import Skeleton from 'ipretty/components/Skeleton'
import SnackBar from 'ipretty/components/SnackBar'
import UserService from 'ipretty/services/UserService'
import contextHelper from 'ipretty/helpers/contextHelper'
import RegisterAccount from './RegisterAccount'
import InformationAccount from './InformationAccount'
import IconImage from "ipretty/components/IconImage"
import Save from '../../../../public/icons_ipretty/Save.png'

const useStyles = makeStyles(theme => ({
    userForm: {
        display: 'flex',
        "& .MuiBox-root:nth-child(1)": {
            flex: 3,
            "& >div": {
                display: 'flex',
                marginBottom: 10,
                "& >div:nth-child(1)": {
                    flex: 1
                },
                "& >div:nth-child(2)": {
                    flex: 2
                }
            }
        },
        "& .MuiBox-root:nth-child(2)": {
            flex: 2,
            marginLeft: 10
        },
    },
    box: {
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        [theme.breakpoints.down("xs")]: {
            padding: 10,
        },
        [theme.breakpoints.up("sm")]: {
            padding: 20,
        },

    },
    title: {
        paddingBottom: '16px',
        fontWeight: '600',
        fontSize: '17px',
        textTransform: 'uppercase',
        color: '#000',
    },
    boxForm: {
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
    },
    avatar: {
        margin: theme.spacing(1),
        width: theme.spacing(25),
        height: theme.spacing(25),
        margin: 'auto'
    },
    InformationAccount :{ 
        [theme.breakpoints.down("xs")]: {
           paddingTop: 18
         },
    }
}))

function UserForm(props) {
    const { isCreate, errors, setDataUser ,dataUser, isEdit, history, userDetail, loading, userId } = props
    const { getTranslation, user, logout } = useAuth()
    const userRole = user.menuroles
    const classes = useStyles()
    const [loadingAction, setLoadingAction] = useState(false)
    const { handleError } = contextHelper
    const [loadingButtonAction, setLoadingButtonAction] = useState(false)
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
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
                onErrr(getTranslation('unableToLoadData'), '/users')
            }
        )
    }

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    function handleCancel() {
        history.push('/users')
    }   

    return (
        <>
        {isEdit && loading ? (
          <Skeleton type="table" />
        ) : (
        <>  
            <div>
                <div className={classes.FormSinup}>
                    <RegisterAccount 
                        user={dataUser} 
                        setUser={setDataUser}
                        errors={errors}
                    />
                </div>
                <div className={classes.InformationAccount}>
                    <InformationAccount
                        departments={departments}
                        user={dataUser} 
                        isCreate={isCreate}
                        setUser={setDataUser}
                        errors={errors}
                    />
                </div>
            </div>
        </>
        )}
        {snackbar.openSnackbar && (
          <SnackBar
            close={closeSnackbar}
            message={snackbar.message}
            variant={snackbar.variant}
          />
        )}
        </>
    );
}

export default UserForm