import React, { useState, useEffect , useCallback , useMemo } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { styled } from "@material-ui/core/styles";
import { makeStyles  } from '@material-ui/core';
import CreatePage from 'ipretty/components/CreatePage/CreatePage'
import { useNotiStackContext } from 'ipretty/context/Notistack';
import IconImage from "ipretty/components/IconImage"
import Save from '../../../../public/icons_ipretty/Save.png'
import UserService from 'ipretty/services/UserService'
import InformationAccount from './InformationAccount'
import { useHistory } from "react-router-dom";
import StatusAccount from './StatusAccount'
import { func } from 'prop-types';
import queryString from "query-string"

const useStyles = makeStyles(theme => ({
    bannerDetail: {
        '& .bannerDetail__banner': {
            backgroundRepeat: 'round',
            display: 'flex',
            justifyContent : 'center',
            alignItems: 'center',

            '& .bannerDetail__banner_url' : {
                position : 'absolute',
                left : '135px',
                top : '70px',
                '& .bannerDetail__banner__urlRedirect': {
                    padding : '10px 0px',
                    '& .bannerDetail__banner__urlRedirect__item': {
                        color: '#395B65', 
                        fontSize: '14px', 
                        lineHeight: '20px',
                        fontWeight: 'normal',
                        letterSpacing: '-0.011em'
                    }
                    },
                    '& .bannerDetail__banner__buttonGoback': {
                        padding: '10px 22px',
                        display: 'flex', 
                        fontWeight: 600,
                        fontFamily: 'San Francisco Text',
                        color: '#395B65',
                    },
            },
            
         
        }
    },
    context : {
        [theme.breakpoints.up("lg")]: {
            padding : '0 12.222vw 0',
        },
        [theme.breakpoints.up("xl")]: {
            padding : '0 21.667vw 0',
        },
        '& .information' : {
            padding: '20px 0 0 0'
        },
        '& .status' : {
            marginTop: "-100px",
            [theme.breakpoints.down("sm")]: {
               paddingTop: '120px'
             },
        }
    },
}))
const Input = styled('input')({
    display: 'none',
  });
function AdminForm (props) {
    const {  links, isEdit, userDetail, id  , location } = props
    const { getTranslation, logout , user } = useAuth()
    const classes = useStyles()
    let history = useHistory()
    const { makeShortMessage } = useNotiStackContext();
    const [loadingAction, setLoadingAction] = useState(false)
    const [ errors ,setErrors ] = useState();
    const [loadingButtonAction, setLoadingButtonAction] = useState(false)
    const actionsCreate = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleAction, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green', loading: loadingAction },   
    ]
    const titlePage = getTranslation('EditProfile')
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })
    const [dataUser, setDataUser] = useState({
        name:'',
        role: '',
        isTeacher :  false,
        birth_day: '',
        avatar: '',
        phone : '',
        // department : '',
        department_name : '',
        isActive: false,
        isLocked : '',
        address : '', // địa chỉ
        code : '', //mã thành viên
        company : '', // công ty
        position : '', // chức vụ
        gender : '' , // giới tính
    })
    const [departments, setDepartments] = useState([])
    const { type } = queryString.parse(location.search)
    
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    getDepartments()
                    getDetailUser(id)
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
    
    const getDetailUser = (id) => {
        UserService.detail(
            id,
            res => {
                setDataUser(res.data.data)
            },
            err => {
                console.log(err)
            }
        )
    }
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

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }
    function handleCancel() {
        history.push(`/users/${id}/detail?type=${type}`)
    }

    function redirectBack () {
        history.push(`/users/${id}/detail?type=${type}`)
    }

    function handleAction() {
        setErrors(false)
        setLoadingButtonAction(true)
        let dataTemp = { ...dataUser}
        if(  dataUser && dataUser.role === 'user'  ){
            delete dataTemp.department_id
        } else {
            delete dataTemp.department_name
        }
        // console.log(dataTemp , '------dataTemp')
        const data = new FormData()
        for (let key in dataTemp) {
            data.append(key, dataTemp[key]);
        }
        UserService.updateUser(
            id,
            data,
            res => {
                setDataUser(res.data.data)
                makeShortMessage(getTranslation('SuccessfullyUpdated'), "success")
                setTimeout(() => {
                    history.push(`/users/${id}/detail?type=${type}`)
                }, 1000)
            },
            err => {
                console.log(err)
                setLoadingButtonAction(false)
                _handleError(err)
            }
        )
    }

    function _handleError(err) {
        setErrors(err.response.data.errors)
        
    }

    return (
        <>
            <CreatePage
                titleUrl={getTranslation('profile')}
                links={links}
                multipleBlock={true}
                onApply={handleAction}
                actions={actionsCreate}
                redirectBack={redirectBack}
                titlePage={titlePage}
                loadingButtonAction={loadingButtonAction}
            >
            <div className={classes.context}>
                <div className="information">
                    <InformationAccount
                        departments={departments}
                        user={dataUser}
                        errors={errors}
                        setUser={setDataUser}
                    />
                </div>
                <div className="status">
                    <StatusAccount
                        getTranslation={getTranslation}
                        user={dataUser}
                        id={id}
                        type={type}
                        setUser={setDataUser}
                    />
                </div>
            </div>
            </CreatePage>
        </>
    )
}

export default AdminForm;