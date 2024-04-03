import React, { useCallback, useReducer, useState, useEffect } from 'react'
import AppSurveysReducer from 'ipretty/context/AppSurveysReducer'
import AppQuestionsReducer from 'ipretty/context/AppQuestionsReducer'
import CreatePage from 'ipretty/components/CreatePage/CreatePage'
import Survey from './Survey'
import { useAuth } from 'ipretty/context/AppProvider'
import { makeStyles } from '@material-ui/core'
import Skeleton from 'ipretty/components/Skeleton'
import SnackBar from 'ipretty/components/SnackBar'
import SurveyService from 'ipretty/services/SurveyService'
import Save from '../../../../public/icons_ipretty/Save.png'
import Close from '../../../../public/icons_ipretty/Close.png'
import IconImage from "ipretty/components/IconImage"
import Dialog from 'ipretty/components/Dialog/Dialog'
import { useNotiStackContext } from 'ipretty/context/Notistack'
import { useHistory } from "react-router-dom"
import { withQueryStr } from 'ipretty/helpers/contextHelper'

const useStyles = makeStyles(theme => ({
    surveyForm: {
        "& .box-form": {
            backgroundColor: '#fff',
            borderRadius: theme.spacing(1),
            position: 'relative',
            padding: 32,
            "& .box-form__title": {
                fontWeight: 'bold',
                fontSize: '24px',
                // textTransform: 'uppercase',
                color: '#395B65',
                lineHeight: '32px',
                marginBottom: 20
            },
            "& .infomation": {
                "& .infomation-item": {
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: 24,
                    "& .infomation-item__title": {
                        flex: 1,
                        "& .MuiTypography-root": {
                            fontWeight: 600,
                            fontSize: '18px',
                            color: '#147B65'
                        }
                    },
                    "& .infomation-item__input": {
                        flex: 3,
                        marginTop: 8
                    },
                    "& .infomation-item__input--option": {
                        flex: 5
                    },
                    "& .infomation-item__button--option": {
                        flex: 1,
                        display: 'flex',
                        justifyContent: 'space-around',
                        "& .MuiButtonBase-root": {
                            padding: 4
                        }
                    },
                    "& .infomation-item__title--option": {
                        flex: 2
                    }
                }
            },
            "& .test-content": {
                display: 'flex',
                flexDirection: 'column',
                "& .test-content__header": {
                    display: 'flex',
                    justifyContent: 'space-between',
                    [theme.breakpoints.down('sm')]: {
                        flexDirection: 'column',
                        paddingBottom : 18
                     },
                    [theme.breakpoints.down('xs')]: {
                        flexDirection: 'column',
                     },
                    "& .test-content__action": {
                        display: 'flex',
                        "& .test-content__action--single": {
                            marginRight: 20,
                            [theme.breakpoints.down('sm')]: {
                            
                             },
                            [theme.breakpoints.down('xs')]: {
                                '& .makeStyles-icon24-28' : {
                                    display: 'none'
                                }
                             },
                        },
                        "& .test-content__action--multiple" : {
                            [theme.breakpoints.down('xs')]: {
                                '& .makeStyles-icon24-28' : {
                                   display: 'none'
                                }
                             },
                        },
                        "& .button:hover": {
                            boxShadow: 'none !important',
                            background: '#147B65'
                        },
                        "& .button:active": {
                            boxShadow: 'none'
                        },
                        "& .button:focus": {
                            boxShadow: 'none'
                        }
                    }
                },
                "& .test-content__question": {
                    "& .question": {
                        display: 'flex',
                        flexDirection: 'column',
                        border: '1px solid #CECCCC',
                        padding: '20px 30px 20px 30px',
                        borderRadius: '10px',
                        marginTop: '10px',
                        marginBottom: 20,
                        "& .question__action": {
                            display: 'flex',
                            justifyContent: 'end',
                            "& .question__action--remove": {
                                marginRight: 15,
                                "& .MuiButtonBase-root": {
                                    padding: 0
                                }
                            },
                            "& .question__action--drap-drop:hover": {
                                cursor: 'moveß'
                            }
                        },
                        "& .question__infomation": {
                            marginBottom: 32,
                            "& .header": {
                                "& .header__content": {
                                    "& .header__content--title": {
                                        marginBottom: 10,
                                        "& .MuiTypography-root": {
                                            fontSize: '18px',
                                            fontWeight: 600,
                                            lineHeight: '24px',
                                            color: '#147B65',
                                        }
                                    },
                                    "& .header__content--action": {
                                        display: 'flex',
                                        [theme.breakpoints.down('sm')]: {
                                            flexDirection : 'column',
                                        },
                                        [theme.breakpoints.down('xs')]: {
                                            flexDirection : 'column',
                                        },
                                        "& .acction__input": {
                                            flex: 3,
                                            marginRight: '10px',
                                        },
                                        "& .action__upload": {
                                            flex: 2,
                                            marginLeft: '10px',
                                            [theme.breakpoints.down('sm')]: {
                                                marginLeft: '0px',
                                                paddingTop : 10
                                            },
                                            [theme.breakpoints.down('xs')]: {
                                                marginLeft: '0px',
                                                paddingTop : 10

                                            },
                                            "& .upload": {
                                                height: '100%',
                                                width: '300px',
                                                "& .button": {
                                                    border: '1px solid #147B65',
                                                    borderRadius: '4px',
                                                    display: 'flex',
                                                    color: '#147B65',
                                                    fontWeight: 600,
                                                    padding: '5px 0',
                                                    width: 126,
                                                    [theme.breakpoints.down('sm')]: {
                                                        width: 190,
                                                        padding: '10px'
                                                    },
                                                    [theme.breakpoints.down('xs')]: {
                                                        width: 150,//fix bug 36 width to
                                                        padding: '10px'
        
                                                    },
                                                    "& span": {
                                                        margin: '2px 0 0 10px'
                                                    }
                                                },
                                                "& .MuiAvatar-root": {
                                                    width: '100%',
                                                    height: '100px',
                                                    "& .MuiAvatar-img": {
                                                        objectFit: 'contain'
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        "& .question__option": {
                            "& .question__option--title": {
                                fontSize: '18px',
                                fontWeight: 'normal',
                                lineHeight: '24px',
                                color: '#147B65',
                            },
                            "& .question__option--plan": {
                                "& .option": {
                                    display: 'flex',
                                    marginTop: 8,
                                    [theme.breakpoints.down('xs')]: {
                                        flexDirection : 'column',
                                    },
                                    "& .option__action": {
                                        flex: 3,
                                        marginRight: '20px',
                                        background: '#F7F8FD',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        [theme.breakpoints.down('xs')]: {
                                           marginBottom : '10px',
                                           marginRight: '34px',//fix responsive button them anh
                                        },
                                        "& .option__action--input": {
                                            flex: 1
                                        },
                                        "& .option__action--button": {
                                            "& .MuiButtonBase-root": {
                                                padding: 8
                                            }
                                        }
                                    },
                                    "& .option__acttachment": {
                                        flex: 2,
                                        display: 'flex',
                                        "& .option__acttachment--upload": {
                                            flex: 1,
                                            width: '100%',
                                            "& button": {
                                                border: '1px solid #147B65',
                                                borderRadius: '4px',
                                                display: 'flex',
                                                color: '#147B65',
                                                fontWeight: 600,
                                                padding: '5px 0',
                                                width: 126,
                                                background: '#FFF',
                                                [theme.breakpoints.down('sm')]: {
                                                     width: 150, //fix 36 lỗi with quá to
                                                    padding: '10px'
                                                },
                                                [theme.breakpoints.down('xs')]: {
                                                     width: 150, //fix 36 lỗi with quá to
                                                    padding: '10px'
    
                                                },
                                                "& span": {
                                                    margin: '3px 0 0 10px'
                                                }
                                            }
                                        },
                                        "& .option__acttachment--render": {
                                            display: 'flex',
                                            flex: 4,
                                            justifyContent: 'space-between',
                                            background: '#F7F8FD',
                                            borderRadius: '4px',
                                            "& .option__acttachment--title": {
                                                alignSelf: 'center',
                                                flex: 3,
                                                // textAlign: 'end',
                                                whiteSpace: 'nowrap',
                                                width: 201,
                                                [theme.breakpoints.down('xs')]: {
                                                    width: 145,//fix butoon them anh
                                               },
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                "& .option__acttachment--remove-button": {
                                                    padding: '6px 20px'
                                                }
                                            },
                                        },
                                        "& .option__acttachment--remove": {
                                            alignSelf: 'center',
                                            flex: 1,
                                            textAlign: 'end',
                                            "& .option__acttachment--remove-button": {
                                                padding: '6px 20px'
                                            }
                                        },
                                    },
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    closeChapter: {
        position: 'absolute',
        top: -10,
        right: -10,
        cursor: 'pointer',
        padding: 0
    },
    showError: {
        fontWeight: 400,
        fontSize: 11,
        marginTop: 5,
        color: 'red'
    },
    uploadFie: {
        display: 'flex',
        flex: 3,
        "& .render-file": {
            marginLeft: 20,
            paddingTop: 5,
            flex: 3,
            "& .MuiTypography-body1": {
                fontWeight: 400
            },
            "& .attachment-name": {
                display: 'flex',
                '& .MuiTypography-root': {
                    flex: 3
                },
                '& .MuiIconButton-root': {
                    padding: 0
                }
            }
        }
    },
}))

function SurveyForm(props) {
    const classes = useStyles()
    const {
        isEdit,
        isCreate,
        loading,
        links,
        indexChapter,
        titlePage,
        surveys,
        surveyId,
        courseId
    } = props
    const { getTranslation } = useAuth()
    const [errors, setErrors] = useState(null)
    const { makeShortMessage } = useNotiStackContext()
    const [loadingAction, setLoadingAction] = useState(false)
    let history = useHistory()
    const initialSurveyInfomation = {
        surveys: [
            {
                survey_title: '',
                survey_description: '',
                percent_to_pass: '',
            }
        ]
    }
    const [snackbar, setSnackbar] = useState({
        openSnackbar: false,
        message: '',
        variant: 'info',
    })
    const actions = [
        { id: 1, action: handleConfirmCancel, icon: <IconImage srcIcon={Close} />, noIcon: false, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleAction, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green', loadingClass: 'loading--white', loading: loadingAction }
    ]
    function closeSnackbar() {
        setSnackbar({ openSnackbar: false, message: '', variant: 'info' })
    }
    const initialQuestionsData = {
        questions: []
    }
    const initialError = {
        error: ''
    }
    const [isShowPopup, setIsShowPopup] = useState(false)
    const [stateSurveyInformation, dispatchSurveyInfo] = useReducer(AppSurveysReducer, initialSurveyInfomation)
    const [stateQuestionsData, dispatchQuestions] = useReducer(AppQuestionsReducer, initialQuestionsData)
    // console.log(stateQuestionsData, 'stateQuestionsData -----')
    const [stateError, dispatchError] = useReducer(AppSurveysReducer, initialError)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        if (isEdit) {
            if (surveys) {
                let questionData = surveys.questions_data
                questionData.questions && questionData.questions.length > 0 && questionData.questions.map((question, indexQuestion) => {
                    question.render_question_attachments = question.question_attachments && question.question_attachments.length > 0 && question.question_attachments[0] ? question.question_attachments[0].url : ''
                    question.options && question.options.length > 0 && question.options.map((option, indexOption) => {
                        option.render_option_attachment = option.option_attachments ? option.option_attachments : ''
                        return option
                    })
                    return question
                })
                dispatchSurveyInfo({ type: 'GET_VALUE_SURVEY', payload: surveys })
                dispatchQuestions({ type: 'GET_VALUE_QUESTION', payload: surveys.questions_data })
            }

        }
    }, [surveys])

    const changeValueSurvey = useCallback((indexSurvey, value) => {
        dispatchSurveyInfo({
            type: 'CHANGE_VALUE_SURVEY',
            newValue: value,
            indexSurveyCVS: indexSurvey
        })
    }, [])

    const addQuestion = useCallback(() => {
        dispatchQuestions({
            type: 'ADD_QUESTION'
        })
    }, [])

    const addOneChoiceQuestion = useCallback((index) => {
        dispatchQuestions({
            type: 'ADD_ONE_CHOICE_QUESTION',
            indexCurrentQuestionAOCQ: index
        })
    }, [])


    const addMultipleChoiceQuestion = useCallback((index) => {
        dispatchQuestions({
            type: 'ADD_MULTIPLE_CHOICE_QUESTION',
            indexCurrentQuestionAMCQ: index
        })
    }, [])

    const changeValueQuestion = useCallback((indexQuestion, value) => {
        dispatchQuestions({
            type: 'CHANGE_VALUE_QUESTION',
            indexCVQ: indexQuestion,
            newValue: value
        })
    }, [])

    const removeQuestion = useCallback((indexQuestion) => {
        dispatchQuestions({
            type: 'REMOVE_QUESION',
            indexRQ: indexQuestion,
        })
    }, [])

    const addOption = useCallback((indexQuestion, indexOption) => {
        dispatchQuestions({
            type: 'ADD_OPTION',
            indexAO: indexQuestion,
            indexOptionAO: indexOption
        })
    }, [])

    const changeValueOption = useCallback((indexQuestion, indexOption, value) => {
        dispatchQuestions({
            type: 'CHANGE_VALUE_OPTION',
            indexQCVO: indexQuestion,
            indexOCVO: indexOption,
            newValueCVO: value
        })
    }, [])

    const removeQuestionAttachment = useCallback((indexQuestion, indexQA) => {
        dispatchQuestions({
            type: 'REMOVE_QUESTION_ATTACHMENT',
            indexQuestionRQA: indexQuestion,
            indexQuestionAttachmentRQA: indexQA,
        })
    }, [])

    const changeValueMultipleChoice = useCallback((indexQuestion, indexOption, value) => {
        dispatchQuestions({
            type: 'CHANGE_VALUE_MULTIPLE_CHOICE',
            indexQuestionCVMC: indexQuestion,
            indexOptionCVMC: indexOption,
            newValueCVMC: value
        })
    }, [])

    const changeValueSingleChoice = useCallback((indexQuestion, indexOption, value) => {
        dispatchQuestions({
            type: 'CHANGE_VALUE_SINGLE_CHOICE',
            indexQuestionCVSC: indexQuestion,
            indexOptionCVSC: indexOption,
            newValueCVSC: value
        })
    }, [])

    const changeValueQuestionType = useCallback((indexQuestion, value) => {
        dispatchQuestions({
            type: 'CHANGE_VALUE_QUESTION_TYPE',
            indexQuestionCVQT: indexQuestion,
            newValueCVQT: value
        })
    }, [])

    const removeOptionInQuestion = useCallback((indexQuestion, indexOption) => {
        dispatchQuestions({
            type: 'REMOVE_OPTION_IN_QUESTION',
            indexQuestionROIQ: indexQuestion,
            indexOptionROIQ: indexOption
        })
    }, [])

    const removeOptionAttachment = useCallback((indexQuestion, indexOption) => {
        dispatchQuestions({
            type: 'REMOVE_OPTION_ATTACHMENT',
            indexQuestionROA: indexQuestion,
            indexOptionROA: indexOption,
        })
    }, [])

    function handleConfirmCancel() {
        setIsShowPopup(true)
    }

    function handleClosePopp() {
        setIsShowPopup(false)
    }

    function handleAction() {
        setErrors(null)
        setLoadingAction(true)
        let data = [stateSurveyInformation.surveys[0], stateQuestionsData]
        let formData = new FormData()
        let surveys = Object.assign({}, ...data)
        for (let key in surveys) {
            if (key == 'questions') {
                let _question = {
                    'questions': surveys[key]
                }
                let newQuestion = JSON.stringify(_question)
                formData.append('questions_data', newQuestion)
            } else {
                formData.append(key, surveys[key])
            }
        }
        if (isCreate) {
            SurveyService.create(
                formData,
                res => {
                    let respon = res.data.data
                    respon.index_chapter = parseInt(indexChapter)
                    handleSuccess(getTranslation('CreateSurveySuccess'), respon)
                },
                err => {
                    setLoadingAction(false)
                    let newErrors = err.response.data.data ? err.response.data.data : err.response.data.errors
                    handleError(newErrors)
                }
            )
        } else {
            SurveyService.update(
                surveyId,
                formData,
                res => {
                    let respon = res.data.data
                    respon.index_chapter = parseInt(indexChapter)
                    handleSuccess(getTranslation('UpdateSurveySuccess'), respon)
                },
                err => {
                    setLoadingAction(false)
                    let newErrors = err.response.data.data ? err.response.data.data : err.response.data.errors
                    handleError(newErrors)
                }
            )
        }
    }

    function handleSuccess(message, respon) {
        const obj = {}
        obj['survey'] = JSON.stringify(respon)
        makeShortMessage(message, "success");
        setTimeout(() => {
            if (courseId) {
                history.push(`/courses/${courseId}/edit?${withQueryStr(obj)}`)
            } else {
                history.push(`/courses/add?${withQueryStr(obj)}`)
            }

        }, 2000)
    }

    const handleClose = () => {
        if (courseId) {
            history.push(`/courses/${courseId}/edit`)
        } else {
            history.push(`/courses/add`)
        }
    }

    function handleError(err) {
        if (stateQuestionsData.questions.length == 0) {
            err.question_length = [getTranslation('Musthaveatleastonechapter')]
        } else {
            let errors = []
            let errorAnswer = []
            stateQuestionsData.questions.map((question, indexQuestion) => {
                const obj = {
                    error: '',
                    index: '',
                    options: [],
                    show: false
                }
                const anwser = {
                    error: '',
                    index: '',
                }
                let countAnwser = 0
                if (question.question_title == '') {
                    obj.error = getTranslation('Youhavenotenteredthequestionname')
                    obj.index = indexQuestion
                } else {
                    obj.error = ''
                    obj.index = indexQuestion
                }
                question.options.map((option, indexOption) => {
                    if (option.option_body == '') {
                        obj.options.push({ error: getTranslation('Youhavenotenteredtheplan'), indexOption: indexOption })
                    } else {
                        obj.options.push({ error: '', indexOption: indexOption })
                    }
                    if (!option.right_answer) {
                        countAnwser += 1
                    }
                })
                if (countAnwser == question.options.length) {
                    anwser.error = getTranslation('Didnotchoosethecorrectanswer')
                    anwser.index = indexQuestion
                    obj.show = false
                } else {
                    anwser.error = ''
                    anwser.index = indexQuestion
                    obj.show = true
                }
                errorAnswer.push(anwser)
                errors.push(obj)
            })
            err.questions = errors
            err.right_answer = errorAnswer
        }
        dispatchError({ type: 'GET_ERROR', payload: err })
    }

    return (
        <CreatePage
            links={links}
            isCreate={isCreate}
            titleUrl={getTranslation('survey')}
            multipleBlock={true}
            loadingButtonAction={loadingAction}
            actions={actions}
            titlePage={titlePage}
            redirectBack={handleClose}
            loading={loading}
        >
            <div className={classes.surveyForm}>

                {loading ? (
                    <Skeleton type='table' />
                ) : (
                    <Survey
                        classes={classes}
                        getTranslation={getTranslation}
                        stateSurveyInformation={stateSurveyInformation}
                        stateQuestionsData={stateQuestionsData}
                        changeValueSurvey={changeValueSurvey}
                        addQuestion={addQuestion}
                        changeValueQuestion={changeValueQuestion}
                        removeQuestion={removeQuestion}
                        addOption={addOption}
                        changeValueOption={changeValueOption}
                        removeQuestionAttachment={removeQuestionAttachment}
                        changeValueMultipleChoice={changeValueMultipleChoice}
                        changeValueSingleChoice={changeValueSingleChoice}
                        changeValueQuestionType={changeValueQuestionType}
                        removeOptionInQuestion={removeOptionInQuestion}
                        removeOptionAttachment={removeOptionAttachment}
                        stateError={stateError}
                        dispatchQuestions={dispatchQuestions}
                        dispatchError={dispatchError}
                        addOneChoiceQuestion={addOneChoiceQuestion}
                        addMultipleChoiceQuestion={addMultipleChoiceQuestion}
                    />
                )}
            </div>
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
                    // title={getTranslation("Notificartion")}
                    getTranslation={getTranslation}
                >
                    {getTranslation("DoYouSureYouWantToExit")}
                </Dialog>
            )}
        </CreatePage>
    )
}

export default SurveyForm