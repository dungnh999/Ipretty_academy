import React, { useEffect, useCallback, useReducer, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import CreatePage from 'ipretty/components/CreatePage/CreatePage'
import { useAuth } from 'ipretty/context/AppProvider'
import AppLessonReducer from 'ipretty/context/AppLessonReducer'
import Lesson from './Lesson'
import LessonService from 'ipretty/services/LessonService'
import Skeleton from 'ipretty/components/Skeleton'
import SnackBar from 'ipretty/components/SnackBar'
import contextHelper from 'ipretty/helpers/contextHelper'
import { useHistory } from "react-router-dom"
import Save from '../../../../public/icons_ipretty/Save.png'
import Close from '../../../../public/icons_ipretty/Close.png'
import IconImage from "ipretty/components/IconImage"
import { useNotiStackContext } from 'ipretty/context/Notistack'
import Dialog from 'ipretty/components/Dialog/Dialog'
import { withQueryStr } from 'ipretty/helpers/contextHelper'

const useStyles = makeStyles(theme => ({
    root: {

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
        fontWeight: '600',
        fontSize: '24px',
        // textTransform: 'uppercase',
        color: '#000',
    },
    uploadFie: {
        display: 'flex',
        flex: 3,
    },
    lessonAttachment: {
        marginLeft: 20,
        paddingTop: 5,
        flex: 3,
        "& .MuiTypography-body1": {
            fontWeight: 400
        }
    },
    lessonAttachmentName: {
        display: 'flex',
        '& .MuiTypography-root': {
            flex: 3
        },
        '& .MuiIconButton-root': {
            padding: 0
        }
    },

    lessonForm: {
        "& .lesson": {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 30,
            [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
                marginTop: 10,
             },
            [theme.breakpoints.down('sm')]: {
                flexDirection: 'column',
                marginTop: 10,
             },
             [theme.breakpoints.down('xs')]: {
                flexDirection: 'column',
                marginTop: 10,
             },
            "& .box-form": {
                backgroundColor: '#fff',
                borderRadius: theme.spacing(1),
                padding: 32
            },
            "& .lesson__genaral": {
                width: '50%',
                "& .infomation": {
                    marginTop: 24,
                    "& .infomation__title": {
                        "& .MuiTypography-root": {
                            fontWeight: '600',
                            color: '#147B65',
                            fontSize: 18
                        }
                    },
                    "& .infomation__action": {
                        marginTop: 8
                    },
                    "& .infomation__render-file": {
                        "& .attachment": {
                            display: 'flex',
                            marginTop: '8px',
                            background: '#F3F3F3',
                            borderRadius: '4px',
                            marginBottom: '24px',
                            padding: 10,
                            "& .attachment__title": {
                                marginLeft: 15,
                                wordBreak: 'break-word'  
                                
                            },
                            "& .attachment__duration": {
                                flex: 1,
                                textAlign: 'center'
                            },
                            "& .attachment__delete": {
                                "& .MuiButtonBase-root": {
                                    padding: 0
                                }
                            },
                            "& .attachment__delete--style": {
                                display: 'flex',
                                flex: 1,
                                justifyContent: 'end'
                            },
                            "& .attachment__action": {
                                flex: 1,
                                textAlign: 'end',
                                "& .MuiButtonBase-root": {
                                    padding: 0
                                }
                            }
                        }
                    },
                    "& .infomation__upload-file": {
                        marginTop: 8,
                        "& button": {
                            display: 'flex',
                            width: '100%',
                            border: '1px solid #147B65',
                            background: '#fff',
                            justifyContent: 'center',
                            borderRadius: 4,
                            padding: '6px 10px',
                            "& span": {
                                color: '#147B65',
                                paddingTop: '4px',
                                paddingLeft: '10px',
                            }
                        }
                    }
                }
            },
            "& .lesson__infomation": {
                width: '50%',
                marginRight: 15,
                [theme.breakpoints.down('md')]: {
                    width: '100%',
                    marginRight: 0,
                    marginBottom:  18
                 },
                [theme.breakpoints.down('sm')]: {
                    marginRight: 0,
                    marginBottom:  18
                 },
                 [theme.breakpoints.down('xs')]: {
                    marginRight: 0,
                    marginBottom:  18
                 },
            },
            "& .lesson__attachment": {
                flex: 1,
                marginLeft: 15,
                [theme.breakpoints.down('md')]: {
                    width: '100%',
                    marginLeft: 0,
                    marginBottom:  18
                 },
                [theme.breakpoints.down('sm')]: {
                    marginLeft: 0,
                    marginBottom:  18
                 },
                 [theme.breakpoints.down('xs')]: {
                    marginLeft: 0,
                    marginBottom:  18
                 },
            }
        }
    },
    showError: {
        fontWeight: 600,
        fontSize: 11,
        marginTop: 5,
        color: 'red'
    }
}))

function LessonForm(props) {
    const classes = useStyles()
    const { isCreate, links, loading, isEdit, lesson, indexLesson, titlePage, indexChapter, courseId } = props
    const { getTranslation } = useAuth()
    const [loadingAction, setLoadingAction] = useState(false)
    const { makeShortMessage } = useNotiStackContext()
    const actions = [
        { id: 1, action: handleConfirmCancel, icon: <IconImage srcIcon={Close} />, noIcon: false, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleDataLesson, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green', loadingClass: 'loading--white', loading: loadingAction }
    ]
    let history = useHistory()
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })
    const [isShowPopup, setIsShowPopup] = useState(false)
    const initialLesson = {
        lessons: [
            {
                lesson_name: '',
                lesson_content: '',
                lesson_description: '',
                lesson_duration: '',
                lesson_attachment: [],
                main_attachment: '',
                leasson_duration_render: '',
                delete_lesson_attachment: []
            }
        ]
    }
    const initialError = {
        error: ''
    }
    const [stateLessonReducer, dispatchLesson] = useReducer(AppLessonReducer, initialLesson)
    const [stateError, dispatcError] = useReducer(AppLessonReducer, initialError)

    useEffect(() => {
        if (isEdit) {
            dispatchLesson({ type: 'GET_VALUE_LESSON', payload: lesson })
        }
    }, [lesson])

    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }

    const changeDataLesson = useCallback((indexLesson, newValue) => {
        dispatchLesson({
            type: 'CHANGE_VALUE_LESSON',
            indexLessonCVC: indexLesson,
            newValue: newValue,
        })
    }, [])

    const removeLessonAttachment = useCallback((indexLesson, indexAttachment, uuid) => {
        dispatchLesson({
            type: 'REMOVE_LESSON_ATTACHMENT',
            indexLessonRLA: indexLesson,
            indexLessonAttachmentRLA: indexAttachment,
            uuidRLA: uuid
        })
    }, [])

    const removeMainAttachment = useCallback((indexLesson) => {
        dispatchLesson({
            type: 'REMOVE_MAIN_ATTACHMENT',
            indexLessonRMA: indexLesson,
        })
    }, [])


    function handleDataLesson() {
        setLoadingAction(true)
        let data = new FormData()
        const lesson = stateLessonReducer.lessons[0]
        if (typeof lesson.main_attachment == 'string') {
            delete lesson.main_attachment
        }
         for (let key in lesson) {
            if (key == 'main_attachment' && typeof lesson[key] != 'string') {
                data.append(key, lesson[key])
            } else if (key == 'lesson_attachment') {
                for (let i in lesson[key]) {
                    if (!lesson[key][i].id) {
                        data.append(`${key}[]`, lesson[key][i])
                    }
                }
            } else {
                data.append(key, lesson[key])
            }
        }
        if (isCreate) {
            LessonService.create(
                data,
                res => {
                    let respon = res.data.data
                    respon.index_chapter = parseInt(indexChapter)
                    handleSuccess(getTranslation('CreateLessonSuccess'), respon)
                },
                err => {
                    setLoadingAction(false)
                    dispatcError({ type: 'GET_ERROR_UPLOAD_FILE', payload: err.response.data.errors})
                }
            )
        } else {
            LessonService.update(
                lesson.lesson_id, data,
                res => {
                    let respon = res.data.data
                    respon.index_chapter = parseInt(indexChapter)
                    respon.index_lesson = parseInt(indexLesson)
                    handleSuccess(getTranslation('UpdateLessonSuccess'), respon)
                },
                err => {
                    setLoadingAction(false)
                    dispatcError({ type: 'GET_ERROR_UPLOAD_FILE', payload: err.response.data.errors})
                }
            )
        }
    }

    function handleSuccess(message, respon) {
        const obj = {}
        obj['lesson'] = JSON.stringify(respon)
        makeShortMessage(message, "success");
        setTimeout(() => {
            if (courseId) {
                history.push(`/courses/${courseId}/edit?${withQueryStr(obj)}`)
            } else {
                history.push(`/courses/add?${withQueryStr(obj)}`)
            }
            
        }, 2000)
    }

    function handleConfirmCancel() {
        setIsShowPopup(true)
    }

    function handleClosePopp() {
        setIsShowPopup(false)
    }

    const handleClose = () => {
        if (courseId) {
            history.push(`/courses/${courseId}/edit`)
        } else {
            history.push(`/courses/add`)
        }
    }

    return (
        <CreatePage
            links={links}
            isCreate={isCreate}
            titleUrl={getTranslation('lecture')}
            onApply={handleDataLesson}
            multipleBlock={true}
            redirectBack={handleClose}
            actions={actions}
            titlePage={titlePage}
            loading={loading}
        >
            {loading ? (
                <Skeleton type='table' />
            ) : (
                <div className={classes.lessonForm}>
                    <Lesson
                        classes={classes}
                        getTranslation={getTranslation}
                        changeDataLesson={changeDataLesson}
                        isCreate={isCreate}
                        stateLessonReducer={stateLessonReducer}
                        removeLessonAttachment={removeLessonAttachment}
                        removeMainAttachment={removeMainAttachment}
                        dispatcError={dispatcError}
                        stateError={stateError}
                    />
                </div>
            )}
            {snackbar.openSnackbar && (
                <SnackBar
                    close={closeSnackbar}
                    message={snackbar.message}
                    variant={snackbar.variant}
                />
            )}
            {isShowPopup && (
                <Dialog
                    maxWidth="sm"
                    open={isShowPopup}
                    onClose={handleClosePopp}
                    actionLabel={getTranslation("Confirm")}
                    action={handleClose}
                    noIcon={true}
                    getTranslation={getTranslation}
                >
                    {getTranslation("DoYouSureYouWantToExit")}
                </Dialog>
            )}
        </CreatePage >
    )
}

export default LessonForm