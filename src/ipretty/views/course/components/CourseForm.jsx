import { makeStyles } from '@material-ui/core'
import CreatePage from 'ipretty/components/CreatePage/CreatePage'
import React, { useCallback, useReducer, useEffect, useState, useMemo } from 'react'
import { useAuth } from 'ipretty/context/AppProvider';
import Course from '../components/Course'
import AppCourseReducer from 'ipretty/context/AppCourseReducer'
import AppCourseChapterReducer from 'ipretty/context/AppCourseChapterReducer'
import AppCourseImageReducer from 'ipretty/context/AppCourseImageReducer'
import AppCourseTargetReducer from 'ipretty/context/AppCourseTargetReducer'
import AppIndexChapterReducer from 'ipretty/context/AppIndexChapterReducer'
import AppParticipantsReducer from 'ipretty/context/AppParticipantsReducer'
import AppStatusReducer from 'ipretty/context/AppStatusReducer'
import CourseCategoriesService from 'ipretty/services/CourseCategoriesService'
import Skeleton from 'ipretty/components/Skeleton'
import UserService from 'ipretty/services/UserService'
import CourseService from 'ipretty/services/CourseService'
import { useHistory } from "react-router-dom";
import ImportDialog from 'ipretty/components/Dialog/ImportDialog'
import { useNotiStackContext } from 'ipretty/context/Notistack'
import Dont_Share from '../../../../public/icons_ipretty/Dont_Share.png'
import Delete from '../../../../public/icons_ipretty/Delete.png'
import Share from '../../../../public/icons_ipretty/Share.png'
import Save from '../../../../public/icons_ipretty/Save.png'
import IconImage from "ipretty/components/IconImage"
import { withQueryStr } from 'ipretty/helpers/contextHelper'
import contextHelper from 'ipretty/helpers/contextHelper'
import moment from 'moment';

const useStyles = makeStyles(theme => ({
    courseForm: {
        "& .course": {
            display: 'flex',
            flexDirection: 'row',
            [theme.breakpoints.down("md")]: {
                flexDirection : 'column',
            },
            [theme.breakpoints.down("sm")]: {
                flexDirection : 'column',
            },
            [theme.breakpoints.down("xs")]: {
                flexDirection : 'column',
            },
            "& .course-general-info": {
                flex: 1,
                marginRight: 10,
                [theme.breakpoints.down("md")]: {
                    marginRight: 0,
                },
                [theme.breakpoints.down("sm")]: {
                    marginRight: 0,
                },
                [theme.breakpoints.down("xs")]: {
                    marginRight: 0,
                },
                "& .infomation-item--participants": {

                },
                "& .infomation": {
                    "& .infomation-item": {
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 15,
                        "& .infomation-item__title": {
                            marginBottom: 5,
                            "& .MuiTypography-root": {
                                color: '#147B65',
                                fontWeight: 400,
                                fontsize: 14
                            }
                        },
                        "& .infomation-item__input": {
                            "& .course-target": {
                                display: 'flex',
                                marginBottom: 15,
                                background: '#F7F8FD',
                                "& .course-target__input--big": {
                                    flex: 11
                                },
                                "& .course-target__input--small": {
                                    flex: 6
                                },
                                "& .course-target__button": {
                                    display: 'flex',
                                    flex: 1,
                                    "& .MuiButton-root": {
                                        border: 0,
                                        padding: 4,
                                        minWidth: 40
                                    }
                                },
                            }
                        },
                        "& .infomation-item__autocomplete": {
                            margin: '3px 0',
                            "& .button": {
                                width: '100%',
                                color: '#A1AFAF',
                                background: '#F7F8FD',
                                borderRadius: 10,
                                fontWeight: 'bold',
                                fontSize: 14,
                                "& .MuiButton-label": {
                                    display: 'flex',
                                    justifyContent: 'space-between'
                                }
                            },
                            "& .button:active": {
                                boxShadow: 'none'
                            },
                            "& .button:hover": {
                                boxShadow: 'none'
                            }
                        },
                        "& .infomation-item__view": {
                            padding: '10px 15px',
                            background: '#F7F8FD',
                            "& .view": {
                                marginTop: 5,
                                "& .MuiTypography-root": {
                                    color: '#147B65'
                                }
                            }
                        }
                    },
                    "& .infomation-item--student": {
                        marginTop: 75,
                    },
                    "& .course-time": {
                        display: 'flex',
                        [theme.breakpoints.down("xs")]: {
                            flexDirection: 'column',  
                         },
                        "& .time": {
                            flex: 1
                        },
                        "& .end-time": {
                            marginLeft: 10,
                            [theme.breakpoints.down("xs")]: {
                                marginLeft: 0,
                             },
                            "& .Mui-error:after": {
                                borderBottomColor: '#147B65'
                            },
                            "& .MuiTextField-root": {
                                width: '100%'
                            }
                        },
                        "& .start-time": {
                            marginRight: 10,
                            [theme.breakpoints.down("xs")]: {
                                marginRight: 0,
                             },
                            "& .Mui-error:after": {
                                borderBottomColor: '#147B65'
                            },
                            "& .MuiTextField-root": {
                                width: '100%'
                            }
                        }
                    },
                    "& .course-overview": {
                        display: 'flex',
                        [theme.breakpoints.up("lg")]: {
                            display: 'block',//fix bug 92
                         },
                        [theme.breakpoints.down("xs")]: {
                            display: 'block',//fix bug 92
                         },
                        "& .infomation-item": {
                            flex: 1
                        },
                        "& .category": {
                            "& .infomation-item__title": {
                                marginLeft: 0
                            },
                        },
                        "& .price": {
                            "& .infomation-item__title": {
                                marginLeft: 10
                            },
                            "& .infomation-item__input": {
                                display: 'flex',
                                [theme.breakpoints.up("lg")]: {
                                    paddingRight: '20vw',
                                 },
                                "& .infomation-item__input--price": {
                                    marginLeft: 10,
                                    flex: 3,
                                    "& input": {
                                        padding: '7px 0px'
                                    }
                                },
                                "& .infomation-item__input--currency": {
                                    marginLeft: 10,
                                    flex: 1
                                }
                            }
                        }
                    }
                },
                "& .upload-image": {
                    "& .infomation": {
                        display: 'flex',
                        [theme.breakpoints.down("xs")]: {
                            flexDirection: 'column',  
                         },
                        "& .infomation-item": {
                            flex: 1,
                            "& .infomation-item__image": {
                                background: '#b7b9be',
                                height: '200px',
                                // border: 'solid 3px #6A6F81',
                                "& .MuiAvatar-root": {
                                    height: 200
                                }
                            },
                        },
                        "& .infomation-item--left": {
                            marginLeft: 10,
                            [theme.breakpoints.down("xs")]: {
                                marginLeft: 0,
                                paddingTop: '20px',//khoang cach thong bao loi
                             },
                        },
                        "& .infomation-item--right": {
                            marginRight: 10,
                            [theme.breakpoints.down("xs")]: {
                                marginRight: 0,
                             },
                        }
                    }
                }
            },
            "& .course-session-chapters": {
                flex: 1,
                marginLeft: 10,
                [theme.breakpoints.down("md")]: {
                    marginLeft: 0,
                },
                [theme.breakpoints.down("sm")]: {
                    marginLeft: 0,
                },
                [theme.breakpoints.down("xs")]: {
                    marginLeft: 0,
                },
                "& .session-chapter__button--add": {
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    "& .button-add_chapter": {
                        width: 20,
                        height: 20,
                        marginRight: 10,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        "& img": {
                            objectFit: 'contain'
                        }
                    }
                },
                "& .icon_class": {
                    width: 14,
                    height: 14,
                    marginRight: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    "& img": {
                        objectFit: 'contain'
                    }
                },
                "& .add-chapter": {
                    background: '#fff',
                    borderRadius: 5,
                },
                "& .chapter": {
                    "& .infomation-item": {
                        display: 'flex',
                        "& .infomation-item__title": {
                            paddingTop: 2,
                            [theme.breakpoints.down("xs")]: {
                                paddingTop: 9,
                               '& p' :{
                                   fontSize: 12
                               }
                            },
                            "& .MuiTypography-root": {
                                fontWeight: 700,
                                paddingTop: 5,
                                [theme.breakpoints.down("xs")]: {
                                    paddingTop: 0
                                },  
                            },
                            flex: 1
                        },
                        "& .infomation-item__input": {
                            margin: '0 10px',
                            flex: 3,
                            "& .MuiFormControl-root": {
                                "& .MuiInputBase-root": {
                                    background: '#fff',
                                    borderBottom: '1px solid',
                                    borderRadius: 0
                                }
                            }
                        },
                        "& .button-chapter": {
                            display: 'flex',
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'end',
                            alignItems: 'center',
                            "& .MuiButtonBase-root": {
                                padding: 7
                            },
                            "& .button-chapter__drap-drop": {
                                alignSelf: 'center',
                                "&:hover": {
                                    cursor: 'move'
                                }
                            }
                        }
                    },
                    "& .session": {
                        "& .button-add__lesson": {
                            marginTop: 10
                        },
                        "& .button-add__survey": {
                            marginTop: 10
                        },
                        "& .button-add--style": {
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'flex-start'
                        },
                        "& .session--overview": {
                            "& .overview": {
                                "& .lesson": {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginTop: 15,
                                    "& .lesson__icon": {
                                        // flex: 1
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    "& .lesson__title": {
                                        flex: 1,
                                        "& .MuiTypography-root": {
                                            fontWeight: 600,
                                            [theme.breakpoints.down("xs")]: {
                                                fontSize: 12
                                            },
                                        },
                                        
                                    },
                                    "& .lesson__content": {
                                        flex: 4,
                                        display: 'flex',
                                        "& .lesson__content--name": {
                                            marginLeft: 15,
                                            borderBottom: '2px solid #395B65',
                                            "& .MuiTypography-root": {
                                                color: "#395B65",
                                                fontSize: 14
                                            }
                                        }
                                    },
                                    "& .lesson__duration": {
                                        flex: 1,
                                        [theme.breakpoints.down("xs")]: {
                                            paddingRight : 10
                                        },
                                        "& .MuiTypography-body1": {
                                            fontSize: 14
                                        }
                                    },
                                    "& .lesson__button": {
                                        display: 'flex',
                                        flex: 1,
                                        justifyContent: 'space-around',
                                        "& .MuiButtonBase-root": {
                                            padding: 0
                                        },
                                        "& .lesson__button--edit": {

                                        },
                                        "& .lesson__button--delete": {

                                        },
                                        '& .icon_class': {
                                            width: 16,
                                            height: 16,
                                            "& img": {
                                                objectFit: 'contain'
                                            }
                                        },
                                        "& .lesson__button--drap-drop": {
                                            marginTop: 3,
                                            "&:hover": {
                                                cursor: 'move'
                                            }
                                        },
                                    }
                                },
                                "& .MuiTypography-root": {
                                    color: "#395B65"
                                },
                                "& .survey": {
                                    display: 'flex',
                                    flexDirection: 'row',
                                    marginTop: 15,
                                    "& .survey__icon": {
                                        // flex: 1,
                                        display: 'flex',
                                        alignItems: 'center'
                                    },
                                    "& .survey__title": {
                                        flex: 5,
                                    },
                                    "& .survey__button": {
                                        display: 'flex',
                                        flex: 1,
                                        justifyContent: 'space-around',
                                        "& .MuiButtonBase-root": {
                                            padding: 0
                                        },
                                        '& .icon_class': {
                                            width: 16,
                                            height: 16,
                                            "& img": {
                                                objectFit: 'contain'
                                            }
                                        },
                                        "& .survey__button--edit": {

                                        },
                                        "& .survey__button--delete": {

                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
        }
    },
    boxForm: {
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
        position: 'relative',
        marginTop: 0
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
    buttonReomveSession: {
        flex: 1,
        textAlign: 'center',
        "& .MuiIconButton-root": {
            padding: 0
        }
    },
    title: {
        paddingBottom: '16px',
        fontWeight: '600',
        fontSize: '17px',
        // textTransform: 'uppercase',
        // color: '#000',
        color: '#395B65'
    },
    backGround: {
        width: '100%',
        height: '75vh',
        borderRadius: '5px',
        "& .MuiAvatar-img": {
            width: '100%',
            maxWidth: '100%'
        }
    },
    input: {
        display: 'none',
    },
    showError: {
        fontWeight: 400,
        fontSize: 11,
        marginTop: 5,
        color: 'red'
    }
}))

function CourseForm(props) {
    const classes = useStyles()
    const { isCreate, links, titlePage, isEdit, course, courseId, dataCourse, isLocalStorage } = props
    const { getTranslation } = useAuth()
    const [loadingActionSave, setLoadingActionSave] = useState(false)
    const [loadingActionShare, setLoadingActionShare] = useState(false)
    let history = useHistory()
    const { makeShortMessage } = useNotiStackContext();
    const [loading, setLoading] = useState(false)
    const [coureCategories, setCoureCategories] = useState([])
    const actionsCreate = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        ////123214
        { id: 2, action: HandleAction, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green', loading: loadingActionSave, loadingClass: 'loading--white' },
        { id: 3, action: handleShare, icon: <IconImage srcIcon={Share} />, noIcon: false, label: getTranslation('Public'), buttonClass: 'button button__save button--green button--release', loading: loadingActionShare, loadingClass: 'loading--white' }
    ]
    const published = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleDontShare, icon: <IconImage srcIcon={Dont_Share} />, noIcon: false, label: getTranslation('CancellationOfRelease'), buttonClass: 'button button__dont-share button--white button--release', loadingClass: 'loading--white' },
        { id: 3, action: HandleAction, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green', loadingClass: 'loading--white' }
    ]
    const actionSaveAndCancel = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: HandleAction, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green', loadingClass: 'loading--white' }
    ]
    let dataCheck = course ? course : dataCourse
    let checkShare = dataCheck && (dataCheck.is_published == 1 && course.isDraft == 1 ||
        dataCheck.is_published == 0 && dataCheck.isDraft == 1 ||
        dataCheck.is_published == 0 && dataCheck.isDraft == 0) ? true : false
    let actionsEdit = !checkShare ? published : (course && course.endTime && moment(course.endTime).valueOf() < moment(new Date()).valueOf() ? actionSaveAndCancel : actionsCreate)

    //  is_published: 1 && isDraft: 1 && is_published: 0 && isDraft: 0 && is_published: 0 && isDraft: 1 ==> phát hành 


    const initialCourseInfomation = {
        courses: [
            {
                course_name: '',
                course_description: '',
                course_type: 'Local',
                category_id: '',
                teacher_id: '',
                endTime: '',
                startTime: '',
                course_price: 0,
                course_currency: '',
                is_published: '',
                isDraft: ''
            }
        ]
    }
    const [options, setOption] = useState({
        students: [],
        teachers: [],
        leaders: []
    })
    const initialCourseChapter = {
        chapters: []
    }
    const initialCourseFeatureImage = {
        course_feature_image: '',
        certificate_image: '',
        render_course_feature_image: '',
        render_certificate_image: '',
        course_feature_image_base64: '',
        certificate_image_base64: ''
    }
    const initialCourseTarget = {
        course_target: [
            {
                item_course_target: ''
            }
        ]
    }
    const initialParticipants = {
        student_ids: [],
        render_student_ids: [],
        leader_ids: [],
        render_leader_ids: []
    }
    const opendDataViewDialog = {
        status: false,
        Component: '',
        title: '',
        list: '',
        field: '',
        selected: '',
        fieldRender: ''
    }
    const initialErrorCourseFeatureImage = {
        error: ''
    }

    const initialErrorCourse = {
        error: ''
    }

    const [stateCourseFeatureImage, dispatchImg] = useReducer(AppCourseImageReducer, initialCourseFeatureImage)
    const [stateErrorCourseFeatureImage, dispatchErrorImg] = useReducer(AppCourseImageReducer, initialErrorCourseFeatureImage)
    const [stateParticipants, dispatchParticipants] = useReducer(AppParticipantsReducer, initialParticipants)
    const [stateCourseTarget, dispatchCourseTarget] = useReducer(AppCourseTargetReducer, initialCourseTarget)
    const [stateInfomationReducer, dispatchInfo] = useReducer(AppCourseReducer, initialCourseInfomation)
    const [stateChapterReducer, dispatchChapter] = useReducer(AppCourseChapterReducer, initialCourseChapter)
    const [stateOpenDialog, dispatchStatus] = useReducer(AppStatusReducer, opendDataViewDialog)
    const [stateErrorReducer, dispatchError] = useReducer(AppCourseReducer, initialErrorCourse)


    const handleActionRedirectLesson = (indexChapter) => {
        let data = [stateInfomationReducer.courses[0], stateCourseFeatureImage, stateParticipants, stateCourseTarget, 
        stateChapterReducer]
        let course = Object.assign({}, ...data)
        localStorage.setItem('course', JSON.stringify(course));
        const obj = {}
        obj['indexChapter'] = indexChapter
        if (courseId) {
            obj['course_id'] = courseId
        }
        history.push(`/lessons/add?${withQueryStr(obj)}`)
    }

    const handleActionRedirectEditLesson = (indexChapter, indexLesson, lessonId) => {
        let data = [stateInfomationReducer.courses[0], stateCourseFeatureImage, stateParticipants, stateCourseTarget, stateChapterReducer]
        let course = Object.assign({}, ...data)
        localStorage.setItem('course', JSON.stringify(course));
        const obj = {}
        obj['indexChapter'] = indexChapter
        obj['indexLesson'] = indexLesson
        obj['lessonId'] = lessonId
        if (courseId) {
            obj['course_id'] = courseId
        }
        history.push(`/lessons/${lessonId}/edit?${withQueryStr(obj)}`)
    }

    const handleActionRedirectSurvey = (indexChapter) => {
        let data = [stateInfomationReducer.courses[0], stateCourseFeatureImage, stateParticipants, stateCourseTarget, stateChapterReducer]
        let course = Object.assign({}, ...data)
        localStorage.setItem('course', JSON.stringify(course));
        const obj = {}
        obj['indexChapter'] = indexChapter
        if (courseId) {
            obj['course_id'] = courseId
        }
        history.push(`/surveys/add?${withQueryStr(obj)}`)
    }

    const handleActionRedirectEditSurvey = (indexChapter, surveyId) => {
        let data = [stateInfomationReducer.courses[0], stateCourseFeatureImage, stateParticipants, stateCourseTarget, stateChapterReducer]
        let course = Object.assign({}, ...data)
        localStorage.setItem('course', JSON.stringify(course));
        const obj = {}
        obj['indexChapter'] = indexChapter
        if (courseId) {
            obj['course_id'] = courseId
        }
        history.push(`/surveys/${surveyId}/edit?${withQueryStr(obj)}`)
    }

    const changeValuePaticipants = useCallback((value) => {
        dispatchParticipants({
            type: 'CHANGE_VALUE_PARTICIPANTS',
            newValueCVP: value,
        })
    }, [])

    const removeCourseTarget = useCallback((indexCourseTarget) => {
        dispatchCourseTarget({
            type: 'REMOVE_ITEM_COURSE_TARGET',
            indexCourseTargetRICT: indexCourseTarget,
        })
    }, [])

    const changeValueCourseTarget = useCallback((indexCourseTarget, value) => {
        dispatchCourseTarget({
            type: 'CHANGE_VALUE_ITEM_COURSE_TARGET',
            indexCourseTargetCVICT: indexCourseTarget,
            newValueCVICT: value
        })
    }, [])

    const addItemCourseTarget = useCallback((indexCourseTarget) => {
        dispatchCourseTarget({
            type: 'ADD_ITEM_COURSE_TARGET',
            indexCourseTargetAICT: indexCourseTarget
        })
    }, [])

    const uploadBannerCourse = useCallback((value) => {
        dispatchImg({
            type: 'UPLOAD_BANNER',
            newValue: value,
        })
    }, [])

    const changeDataFields = useCallback((field, indexCourse, value) => {
        dispatchInfo({
            type: 'CHANGE_VALUE_COURSE',
            newValue: value,
            fieldName: field,
            indexCourseCVC: indexCourse
        })
    }, [])

    const addChapters = useCallback((index) => {
        dispatchChapter({
            type: 'ADD_CHAPTERS',
            indexChapterAC: index
        })
    }, [])

    const changeValueChapter = useCallback((index, value) => {
        dispatchChapter({
            type: 'CHANGE_CHAPTER_NAME',
            newValue: value,
            indexChapter: index,
        })
    }, [])

    const removeChapter = useCallback((index) => {
        dispatchChapter({
            type: 'REMOVE_CHAPTER',
            indexChapterRemove: index
        })
    }, [])

    const removeLessonInChapter = useCallback((indexChapter, indexLesson) => {
        dispatchChapter({
            type: 'REMOVE_LESSON_IN_CHAPTER',
            indexChapterRLIC: indexChapter,
            indexLessonRLIC: indexLesson
        })
    }, [])

    const removeSurveyInChapter = useCallback((indexChapter, surveyId) => {
        dispatchChapter({
            type: 'REMOVE_SURVEY_CHAPTER',
            indexChapterRSC: indexChapter,
            surveyIdRSC: surveyId
        })
    }, [])

    useEffect(() => {
        if (dataCourse && Object.keys(dataCourse).length > 0) {
            dispatchInfo({ type: 'GET_INFO_COURSE', payload: dataCourse })
            dispatchParticipants({ type: 'GET_VALUE_PARTICIPANTS_IN_LOCALSTORAGE', payload: dataCourse })
            dispatchImg({ type: 'GET_VALUE_BANNER_IN_LOCALSTORAGE', payload: dataCourse })
            dispatchCourseTarget({ type: 'GET_VALUE_COURSE_TARGET_IN_LOCALSTORAGE', payload: dataCourse.course_target })
            dispatchChapter({ type: 'GET_CHAPTER_CREATE_LESSON', payload: dataCourse.chapters })
        }
    }, [dataCourse])

    useEffect(() => {
        if (isEdit && !isLocalStorage) {
            if (course && Object.keys(course).length > 0) {
                dispatchInfo({ type: 'GET_INFO_COURSE', payload: course })
                dispatchParticipants({ type: 'GET_VALUE_PARTICIPANTS', payload: course })
                dispatchImg({ type: 'GET_VALUE_BANNER', payload: course })
                dispatchCourseTarget({ type: 'GET_VALUE_COURSE_TARGET', payload: course })
                dispatchChapter({ type: 'GET_VALUE_CHAPTER', payload: course })
            }
        }
    }, [course])

    useEffect(() => {
        setLoading(true)
        Promise.all([
            UserService.getUsersByRole({ role: 'student' }),
            UserService.getUsersByRole({ role: 'teacher' }),
            UserService.getUsersByRole({ role: 'leader' }),
            CourseCategoriesService.list()
        ]).then(([students, teachers, leaders, res]) => {
            const courseCategories = res.data.data
            courseCategories.map((item) => {
                item.name = item.category_name ? item.category_name : ''
                item.id = item.category_id ? item.category_id : ''
                return item
            })
            let listStudent = students.data.data
            let listLeader = leaders.data.data
            let listTeacher = teachers.data.data
            setCoureCategories(courseCategories)
            options.students = listStudent
            options.teachers = listTeacher
            options.leaders = listLeader
            setOption({ ...options })
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            setLoading(false)
        })
    }, [])
    function handleData(type) {
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: '' })
        dispatchErrorImg({ type: 'GET_ERROR_UPLOAD_FILE', payload: '' })
        if (type == 'save') {
            setLoadingActionSave(true)
        } else {
            setLoadingActionShare(true)
        }
        let data = [stateInfomationReducer.courses[0],
        stateCourseFeatureImage, stateParticipants, stateCourseTarget, stateChapterReducer]
        let formData = new FormData()
        let courseData = Object.assign({}, ...data)
        for (let key in courseData) {
            if (isEdit) {
                if (type == 'dont_share') {
                    if (key == 'isDraft') {
                        formData.append(key, 1)
                    }
                    if (key == 'is_published') {
                        formData.append(key, course.is_published)
                    }
                } else if (type == 'save') {
                    if (key == 'isDraft') {
                        formData.append(key, course.isDraft)
                    }
                    if (key == 'is_published') {
                        formData.append(key, course.is_published)
                    }
                } else {
                    if (key == 'isDraft') {
                        formData.append(key, 0)
                    }
                    if (key == 'is_published') {
                        formData.append(key, 1)
                    }
                }
                
            } else {
                if (type == 'save') {
                    if (key == 'isDraft') {
                        formData.append(key, 1)
                    }
                    if (key == 'is_published') {
                        formData.append(key, 0)
                    }
                } else {
                    if (key == 'isDraft') {
                        formData.append(key, 0)
                    }
                    if (key == 'is_published') {
                        formData.append(key, 1)
                    }
                }
            }
            if (key == 'chapters') {
                let _question = {
                    'chapters': courseData[key]
                }
                let newChapter = JSON.stringify(_question)
                formData.append('courses_resources', newChapter)
            } else if (key == 'student_ids' || key == 'leader_ids') {
                formData.append(key, courseData[key].toString())
            } else if (key == 'startTime' || key == 'endTime') {
                if (courseData[key] == 'Invalid date' || courseData[key] == '') {
                    formData.append(key, '')
                } else {
                    formData.append(key, moment(new Date(courseData[key])).format('YYYY-MM-DD HH:mm:ss'))
                }
            } else if (key == 'course_target') {
                let _coursesTarget = courseData[key].map(item => item.item_course_target)
                let _newCoursesTarget = []
                for (let i = 0; i < _coursesTarget.length; i++) {
                    let obj = {
                        'value': _coursesTarget[i]
                    }
                    _newCoursesTarget.push(obj)
                }
                let _data = {
                    'course_target': _newCoursesTarget
                }
                //123
                formData.append(key, JSON.stringify(_data))
            } else if (key == 'course_feature_image' || key == 'certificate_image') {
                // formData.append(key, courseData[key] == '' ? '' : courseData[key])
                // console.log(courseData[key],"courseData[key]")
                let newDataForKey = courseData[key];
                let course = null;
                if (localStorage.getItem('course')) {
                    course = JSON.parse(localStorage.getItem('course'))
                }
                if (!newDataForKey) {
                    if (course) {
                        newDataForKey = course[key];
                    }
                }
                formData.append(key, newDataForKey ? newDataForKey : '')
               
            } else if (key !== 'isDraft' && key !== 'is_published') {
                formData.append(key, courseData[key] || courseData[key] == 0 ? courseData[key] : '')
            }
        }
        if (isEdit) {
            CourseService.edit(
                formData,
                courseId,
                res => {
                    if(type == 'save') {
                        makeShortMessage(getTranslation('SuccessfulCourseUpdate'), "success");
                    } else {
                       if (type == 'dont_share') {
                            makeShortMessage(getTranslation('Unpublishcoursesuccessfully'), "success");
                       } else {
                            makeShortMessage(getTranslation('Publishcoursesuccessfully'), "success");
                       }
                    }
                    setTimeout(() => {
                        setLoadingActionSave(false)
                        setLoadingActionShare(false)
                        history.push('/courses')
                    }, 2000)
                },
                err => {
                    if (err.response.status == 403) {
                        makeShortMessage(err.response.data.message, "error");
                    } else {
                        setTimeout(() => {
                            setLoadingActionSave(false)
                            setLoadingActionShare(false)
                        }, 1000)
                        let error = err.response.data.data ? err.response.data.data : err.response.data.errors ? err.response.data.errors : err.response.data
                        // console.log(err.response.data, 'error')
                        handleError(error, type, courseData)
                    }
                }
            )
        } else {
            CourseService.create(
                formData,
                res => {
                    makeShortMessage(getTranslation('CreateaSuccessfulCourse'), "success");
                    setTimeout(() => {
                        setLoadingActionSave(false)
                        setLoadingActionShare(false)
                        history.push('/courses')
                    }, 2000)
                },
                err => {
                    let error = err.response.data.data ? err.response.data.data : err.response.data.errors
                    handleError(error, type, courseData)
                }
            )
        }
    }

    function handleError(err, type, courseData) {
        // console.log(type)
        // console.log(courseData, 'courseData')
        // console.log(err, 'err')
        if (!isEdit) {
            if (type !== 'save') {
                if (courseData.chapters.length == 0) {
                    err.chapters_length = [getTranslation('Musthaveatleastonechapter')]
                }
            }
        } else {
            if (courseData.is_published == 1 && courseData.isDraft == 0) {
                if (courseData.chapters.length == 0) {
                    err.chapters_length = [getTranslation('Musthaveatleastonechapter')]
                }
            }
        } 

        if (courseData.chapters.length > 0) {
            // console.log('+++++++++++++')
            let errors = []
            let errorsLessonAndSurvey = []
            // console.log(courseData.chapters, 'courseData')
            courseData.chapters.map((chapter, indexChapter) => {
                // console.log(chapter.lessons.length, 'chapter ------')
                if (chapter.chapter_name == '') {
                    errors.push({ error: getTranslation('Youhavenotenteredthechaptername'), index: indexChapter })
                } else {
                    errors.push({ error: '', index: indexChapter })
                }
                // if (chapter.lessons.length == 0 && (chapter.survey == '' || chapter.survey == null)) {
                //     // console.log('-----------')
                //     errorsLessonAndSurvey.push({ error: getTranslation('Chaptermusthaveatleast'), index: indexChapter })
                // } else {
                //     errorsLessonAndSurvey.push({ error: '', index: indexChapter })
                // }
            })
            err.lesson_survey = errorsLessonAndSurvey
            err.chapters = errors
        }
        for (let key in err) {
            let subtr = key.split('.')
            if (subtr.length > 1 && subtr[0] == 'course_target') {
                err.course_target = getTranslation('Youhavenotenteredthecourseobjective')
            }
        }
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: err })
        setLoadingActionSave(false)
        setLoadingActionShare(false)
    }

    function HandleAction() {
        handleData('save')
    }

    function handleShare() {
        handleData('share')
    }

    function handleCancel() {
        history.push('/courses')
    }

    function handleDontShare() {
        handleData('dont_share')
    }

    function redirectBack() {
        if (isEdit) {
            history.push(`/courses/${courseId}/detail`)
        } else {
            history.push('/courses')
        }
    }

    return (
        <CreatePage
            links={links}
            isCreate={isCreate}
            titleUrl={getTranslation('course')}
            multipleBlock={true}
            titlePage={titlePage}
            redirectBack={redirectBack}
            loading={loading}
            actions={isEdit ? actionsEdit : actionsCreate}
        >
            <div className={classes.courseForm}>
                {loading ? (
                    <Skeleton type="table" />
                ) : (
                    <React.Fragment>
                        <Course
                            classes={classes}
                            changeDataFields={changeDataFields}
                            stateInfomationReducer={stateInfomationReducer}
                            stateChapterReducer={stateChapterReducer}
                            addChapters={addChapters}
                            changeValueChapter={changeValueChapter}
                            removeChapter={removeChapter}
                            coureCategories={coureCategories}
                            stateCourseFeatureImage={stateCourseFeatureImage}
                            uploadBannerCourse={uploadBannerCourse}
                            options={options}
                            removeCourseTarget={removeCourseTarget}
                            changeValueCourseTarget={changeValueCourseTarget}
                            addItemCourseTarget={addItemCourseTarget}
                            stateCourseTarget={stateCourseTarget}
                            removeLessonInChapter={removeLessonInChapter}
                            dispatchStatus={dispatchStatus}
                            stateParticipants={stateParticipants}
                            stateErrorCourseFeatureImage={stateErrorCourseFeatureImage}
                            dispatchInfo={dispatchInfo}
                            dispatchParticipants={dispatchParticipants}
                            dispatchErrorImg={dispatchErrorImg}
                            dispatchCourseTarget={dispatchCourseTarget}
                            dispatchChapter={dispatchChapter}
                            handleActionRedirectLesson={handleActionRedirectLesson}
                            handleActionRedirectEditLesson={handleActionRedirectEditLesson}
                            handleActionRedirectSurvey={handleActionRedirectSurvey}
                            handleActionRedirectEditSurvey={handleActionRedirectEditSurvey}
                            removeSurveyInChapter={removeSurveyInChapter}
                            stateErrorReducer={stateErrorReducer}
                            dispatchError={dispatchError}
                        />
                        {stateOpenDialog.status && (
                            <ImportDialog
                                componentImport={stateOpenDialog.Component}
                                openDialog={stateOpenDialog.status}
                                stateOpenDialog={stateOpenDialog}
                                title={stateOpenDialog.title}
                                listData={stateOpenDialog.list}
                                field={stateOpenDialog.field}
                                fieldRender={stateOpenDialog.fieldRender}
                                selected={stateOpenDialog.selected}
                                changeValuePaticipants={changeValuePaticipants}
                                dispatchStatus={dispatchStatus}
                            />
                        )}
                    </React.Fragment>
                )}
            </div>
        </CreatePage >
    )
}

export default CourseForm