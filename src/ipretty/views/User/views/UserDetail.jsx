import React, { useState, useEffect , useMemo} from 'react'
import { useAuth } from 'ipretty/context/AppProvider';
import { makeStyles } from '@material-ui/core';
import UserService from 'ipretty/services/UserService';
import Information  from 'ipretty/views/User/components/profile-admin/Information';
import Certificate from 'ipretty/views/User/components/profile-admin/Certificate';
import InfoCourse from 'ipretty/views/User/components/profile-admin/InfoCourse';
import InfoCourseTeacher from 'ipretty/views/User/components/profile-admin/InfoCourseTeacher'
import HeaderProfile from '../components/profile-admin/HeaderProfile';
import Skeleton from 'ipretty/components/Skeleton';

const useStyles = makeStyles(theme => ({
    contextInfo : {
        flexDirection : 'column',
        [theme.breakpoints.down("xl")]: {
            padding : "0 calc((100% - 928px)/2) 84px",
        },
        [theme.breakpoints.down("lg")]: {
            padding : '0 calc((100% - 928px)/2) 84px',
        },
        [theme.breakpoints.down('md')]: {
            padding : "0 calc((100% - 928px)/2) 84px",
        },
        [theme.breakpoints.down('sm')]: {
            padding : "0 calc((100% - 700px)/2) 84px",
        },
        [theme.breakpoints.down('xs')]: {
            padding : "0 calc((100% - 365px)/2) 84px",
        },
        '& .contextInfo__container' : {
            position : 'relative',
            display : 'flex',
            marginTop : '-40px',
            paddingBottom : '32px',
            [theme.breakpoints.down("sm")]: {
                flexDirection : 'column',
            },
            '& .contextInfo__info' : {
                display : 'flex',
                position : 'relative',
                marginRight : "32px",
                flex : 1,
                [theme.breakpoints.down("sm")]: {
                    paddingBottom : '32px',
                    marginRight : 0,
                },
            },
            '& .contextInfo__certificate' : { 
                flex : 1,
                display : 'flex',
                position : 'relative',

            }
        },
        '& .contextInfo__infoCourse' : {
                paddingBottom : 32
        }
    }
}))

function UserDetail(props) {
    const classes = useStyles()
    const { location , isProfile } = props
    const { getTranslation } = useAuth()
    const [id, setId] = useState('')
    const [loading, setLoading] = useState(false)
    const titlePage = getTranslation('Profile')
    const [dataUser, setDataUser] = useState({
        name: '',
        email: '',
        avatar : '',
        birth_day: '',
        phone : '',
        address : '', // địa chỉ
        code : '', //mã thành viên
        company : '', // công ty
        position : '', // chức vụ
        gender : '' , // giới tính
        department : '' , // bộ phận
        department_name : '',
    })

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getMe()
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
    
    const getMe = () => {
        UserService.profile (
            res => {
              setId(res.data.user.id)
              setDataUser(res.data.user)
              setLoading(false)
            },
            err => {
                console.log(err)
            }
        )
    }
    return (
        <>
            <HeaderProfile
                getTranslation={getTranslation}
                dataUser={dataUser}
                titlePage={titlePage}
                loading={loading}
             />
            <div className={classes.contextInfo}>
                <div className="contextInfo__container">
                    <div className="contextInfo__info">
                        <Information 
                            dataUser={dataUser}
                            location={location}
                            isProfile={isProfile}
                            loading={loading}
                        />
                    </div>
                    <div className="contextInfo__certificate">
                        <Certificate 
                            dataUser={dataUser} 
                            loading={loading}
                        />
                    </div>
                </div>
                <div className="contextInfo__infoCourse">
                    <InfoCourse 
                        dataUser={dataUser}
                        isProfile={isProfile}
                        location={location}
                        loading={loading}
                    />
                </div>
                { 
                    dataUser && dataUser.isTeacher == true ?
                        <div className="contextInfo__infoCourse">
                                <InfoCourseTeacher 
                                    dataUser={dataUser}
                                    isProfile={isProfile}
                                    location={location}
                                    loading={loading}
                                />
                        </div>
                    : ''
                }
            </div>
        </>
    )
}

export default UserDetail