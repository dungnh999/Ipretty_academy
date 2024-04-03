
import DetailPage from 'ipretty/components/DetailPage/DetailPage'
import React, { useEffect, useMemo, useState } from 'react'
import { useAuth } from 'ipretty/context/AppProvider'
import { Box, makeStyles } from '@material-ui/core'
import Infomation from '../components/details/Infomation'
import Chapter from '../components/details/Chapter'
import CourseService from 'ipretty/services/CourseService'
import Skeleton from 'ipretty/components/Skeleton'
import { useHistory } from "react-router-dom";
import Dialog from 'ipretty/components/Dialog/Dialog'
import Copy_White from '../../../../public/icons_ipretty/Copy_White.png'
import Group from '../../../../public/icons_ipretty/Group.png'
import Edit from '../../../../public/icons_ipretty/Edit.png'
import Copy_Course from '../../../../public/icons_ipretty/Copy_Course.png'
import { useNotiStackContext } from 'ipretty/context/Notistack'
import IconImage from "ipretty/components/IconImage"
import { withQueryStr } from 'ipretty/helpers/contextHelper'
import { dataURLtoFile } from 'ipretty/helpers/contextHelper'

const useStyles = makeStyles(theme => ({
    courseDetail: {
        margin: '30px 50px',
        [theme.breakpoints.down('xs')]: {
            margin: '30px 10px',
        },
        "& .course": {
            display: 'flex',
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
            },
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
            },
            "& .infomation": {
                flex: 1,
                marginRight: 10,
                [theme.breakpoints.down('xs')]: {
                    marginRight: 0,//chưa resposive tren thiet bi mobile
                },
                "& .detail": {
                    width: '100%',
                    marginBottom: 32,
                    "& .detail__title": {
                        marginBottom: 8,
                        "& .MuiTypography-root": {
                            fontWeight: 600,
                            fontSize: 18,
                            lineHeight: '24px',
                            color: '#147B65'
                        }
                    },
                    "& .detail__content": {
                        display: 'flex',
                        "& .MuiTypography-root": {
                            lineHeight: '24px',
                            color: '#1A1A1A',
                            'display': '-webkit-box',
                            '-webkit-box-orient': 'vertical',
                            'overflow': 'hidden',
                            '-webkit-line-clamp': '2',//Lỗi UI khi chứa link dài
                        },
                        "& .detail__content--avatar": {
                            // flex: 1
                        },
                        "& .detail__content--value": {
                            flex: 6,
                            alignSelf: 'center',
                            marginLeft: 10
                        }
                    },
                    "& .detail__content--target": {
                        display: 'flex',
                        flexDirection: 'column',
                        "& .course-target": {
                            display: 'flex',
                            marginTop: 15,
                            "& .course-target__icon": {

                            },
                            "& .course-target__value": {
                                marginLeft: 20,
                                "& .MuiTypography-root": {
                                    fontWeight: 600
                                }
                            }
                        }
                    },
                },
                "& .course-time": {
                    display: 'flex',
                    [theme.breakpoints.down("xs")]: {
                        flexDirection: 'column',  
                     },
                },
                "& .course-type": {
                    display: 'flex'
                },
                "& .course-image": {
                    display: 'flex',
                    [theme.breakpoints.down("xs")]: {
                        flexDirection: 'column',  
                     },
                    "& .detail": {
                        "& .detail__img": {
                            height: 283,
                            "& img": {
                                objectFit: 'cover'
                            }
                        }
                    },
                    "& .detail__course-feature-image": {
                        marginRight: 10,
                        [theme.breakpoints.down("xs")]: {
                            marginRight: 0,
                        },
                    },
                    "& .detail__certificate-image": {
                        marginLeft: 10,
                        [theme.breakpoints.down("xs")]: {
                            marginLeft: 0,
                        },
                    }
                }
            },
            "& .chapter": {
                flex: 1,
                marginLeft: 10,
                [theme.breakpoints.down("xs")]: {
                    marginLeft: 0,
                 },
                "& .chapter-item": {
                    "& .chapter__title": {
                        marginBottom: 25,
                        "& .MuiTypography-root": {
                            fontSize: 24,
                            color: '#395B65',
                            wordBreak: 'break-word'
                        },
                        "& span": {
                            marginLeft: 10,
                            borderBottom: '2px solid #395B65'
                        }
                    },
                    "& .chapter__lesson": {
                        marginTop: 15,
                        "& .lesson": {
                            display: 'flex',
                            background: '#F3F3F3',
                            borderRadius: '10px',
                            padding: '10px 20px',
                            marginBottom: 20,
                            "& .lesson__icon": {
                                marginRight: 9,
                                paddingTop: 3
                            },
                            "& .lesson__title": {
                                flex: 6,
                                'display': '-webkit-box',
                                '-webkit-box-orient': 'vertical',
                                'overflow': 'hidden',
                                '-webkit-line-clamp': '2',//Lỗi UI khi chứa link dài
                                "& span": {
                                    borderBottom: '1px solid #395B65'
                                }
                            },
                            "& .lesson__duration": {
                                flex: 1
                            }
                        }
                    },
                    "& .chapter__survey": {
                        display: 'flex',
                        background: '#F3F3F3',
                        borderRadius: '10px',
                        padding: '10px 20px',
                        "& .chapter__survey--icon": {
                            marginRight: 9,
                            paddingTop: 3
                        },
                        "& .chapter__survey--title": {
                            flex: 6
                        }
                    }
                }
            }
        }
    },
    boxForm: {
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
        padding: 32
    },
    title: {
        paddingBottom: '16px',
        fontWeight: 'bold',
        fontSize: 24,
        // textTransform: 'uppercase',
        color: '#395B65',
    },
    backGround: {
        width: '32px',
        height: '32px',
        borderRadius: '50%',
        "& .MuiAvatar-img": {
            width: '100%',
            maxWidth: '100%'
        }
    },
    backGroundCourseFeature: {
        width: '100%',
        height: '100%',
        borderRadius: '5px',
        "& .MuiAvatar-img": {
            width: '100%',
            maxWidth: '100%'
        }
    }
}))

function CourseDetail(props) {
    const { user, getTranslation } = useAuth()
    const classes = useStyles()
    const id = props.match.params.id
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseManagement'), path: '/courses' }
    ], [])
    const linkFlowTeacher = useMemo(() => [
        { title: getTranslation('CourseManagement'), path: '/courses' }
    ], [])
    const titleCurrent = getTranslation('CourseDetail')
    const { makeShortMessage } = useNotiStackContext();
    const [loading, setLoading] = useState(false)
    const [course, setCourse] = useState({})
    const [createdBy, setCreatedBy] = useState('')
    let history = useHistory()
   
    const [isShowPopupCopy, setIsShowPopupCopy] = useState(false)
    const actions = [
        { id: 1, action: redirectStudent, icon: <IconImage srcIcon={Group} />, noIcon: false, label: getTranslation('ManageParticipants'), buttonClass: 'button button__mangage-student button--green' },
        { id: 2, action: redirectCopy, icon: <IconImage srcIcon={Copy_Course} />, noIcon: false, label: getTranslation('MakeCopy'), buttonClass: 'button button__copy-course button--white' },
    ]
    const actionsFollowTeacher = [
        { id: 1, action: redirectStudent, icon: <IconImage srcIcon={Group} />, noIcon: false, label: getTranslation('ManageParticipants'), buttonClass: 'button button__mangage-student button--green' },
        { id: 2, action: redirectCopy, icon: <IconImage srcIcon={Copy_Course} />, noIcon: false, label: getTranslation('MakeCopy'), buttonClass: 'button button__copy-course button--white' },
        { id: 3, action: redirectEdit, icon: <IconImage srcIcon={Edit} />, noIcon: false, label: getTranslation('Edit'), buttonClass: 'button button__edit button--white' },
    ]

    const actionsFollowCreate = [
        { id: 1, action: redirectStudent, icon: <IconImage srcIcon={Group} />, noIcon: false, label: getTranslation('ManageParticipants'), buttonClass: 'button button__mangage-student button--green' },
        { id: 2, action: redirectCopy, icon: <IconImage srcIcon={Copy_Course} />, noIcon: false, label: getTranslation('MakeCopy'), buttonClass: 'button button__copy-course button--white' },
        { id: 3, action: redirectEdit, icon: <IconImage srcIcon={Edit} />, noIcon: false, label: getTranslation('Edit'), buttonClass: 'button button__edit button--white' },
    ]

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    localStorage.removeItem('course')
                    getDetailcourse(id)
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

    function getDetailcourse(id) {
        setLoading(true)
        CourseService.detail(
            id,
            res => {

                let respon = res.data.data
                if (respon.course_target) {
                    let _courseTarget = respon.course_target
                    let courseTargets = []
                    if (_courseTarget && _courseTarget.course_target.length) {

                        for (let i = 0; i < _courseTarget.course_target.length; i++) {
                            courseTargets.push(_courseTarget.course_target[i].value)
                        }
                        respon.course_target = courseTargets
                    }

                }
                setCourse(res.data.data)
                setLoading(false)
                setCreatedBy(res.data.data.created_by.id)
            },
            err => {
                console.log(err)
            }
        )
    }

    function redirectEdit() {
        history.push(`/courses/${id}/edit`) 
    }

    function redirectStudent() {
        const obj = {}
        const teacherId = {}
        obj['course_type'] = course.course_type
        teacherId['teacher_id'] = course.teacher_id
        history.push(`/courses/${id}/students?${withQueryStr(teacherId)}&${withQueryStr(obj)}`)
    }

    function redirectLeader() {

    }

    function redirectCopy() {
        setIsShowPopupCopy(true)
    }

    function redirectBack() {
        history.push('/courses')
    }

    function handleClosePoppCopy() {
        setIsShowPopupCopy(false)
    }

    function handleConfirmPopupCopy() {
        CourseService.cloneCourse(
            id,
            res => {
                let courseId = res.data.data.course_id
                makeShortMessage(getTranslation('CloneSuccessfulCourse'), "success");
                setTimeout(() => {
                    history.push(`/courses/${courseId}/detail`)
                    setIsShowPopupCopy(false)
                    getDetailcourse(courseId)
                }, 2000)
            },
            err => {
                console.log(err)
            }
        )
    }
    // console.log(course)
    return (
        <div className={classes.courseDetail}>
            <DetailPage
                redirectEdit={redirectEdit}
                links={user.role === 'admin' ? links : linkFlowTeacher}
                titleCurrent={titleCurrent}
                actions={
                    user.menuroles != 'admin' && createdBy == user.id && createdBy != course.teacher_id 
                        ? actionsFollowCreate : 
                    user.menuroles != 'admin' && course && Object.keys(course).length > 0 && course.teacher.id != user.id 
                        ? actions : 
                    user.menuroles != 'admin' &&  createdBy == user.id && createdBy == course.teacher_id 
                        ? actionsFollowTeacher : 
                    actionsFollowTeacher 
                }
                redirectBack={redirectBack}
                loading={loading}
            >
                <div className="course">
                    {loading ? (
                        <Skeleton type="table" />
                    ) : (
                        <div className="infomation">
                            <Box className={classes.boxForm} width={1} my={4} px={3} py={2} >
                                <div className={classes.title}>{getTranslation('CourseInformation')}</div>
                                <Infomation
                                    classes={classes}
                                    course={course}
                                />
                            </Box>
                        </div>
                    )}
                    {loading ? (
                        <Skeleton type="table" />
                    ) : (
                        <div className="chapter">
                            {/* <Box className={classes.boxForm} width={1} my={4} px={3} py={2} > */}
                            <Chapter
                                classes={classes}
                                chapters={course.course_resources && course.course_resources.chapters && course.course_resources.chapters.length > 0 ? course.course_resources.chapters : []}
                            />
                            {/* </Box> */}
                        </div>
                    )}
                </div>
                {isShowPopupCopy && (
                    <Dialog
                        maxWidth="sm"
                        open={isShowPopupCopy}
                        onClose={handleClosePoppCopy}
                        actionLabel={getTranslation("MakeCopy")}
                        action={handleConfirmPopupCopy}
                        noIcon={false}
                        title={getTranslation("ContentCopyCourse")}
                        iconButton={<IconImage srcIcon={Copy_White} />}
                        getTranslation={getTranslation}
                    >
                        {getTranslation("WarningCopyCourse")}
                    </Dialog>
                )}
            </DetailPage >
        </div >
    )
}

export default CourseDetail