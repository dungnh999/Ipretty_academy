
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import Share from '../../../../public/icons_ipretty/Share.png'
import Save from '../../../../public/icons_ipretty/Save.png'
import Dont_Share from '../../../../public/icons_ipretty/Dont_Share.png'
import IconImage from "ipretty/components/IconImage"
import { useAuth } from 'ipretty/context/AppProvider'
import CreatePage from 'ipretty/components/CreatePage/CreatePage'
import AppFaqQuestionReducer from 'ipretty/context/faq/AppFaqQuestionReducer'
import Component from './Component'
import { useNotiStackContext } from 'ipretty/context/Notistack'
import { useHistory } from "react-router-dom";
import FaqService from 'ipretty/services/FaqService'
import AppErrorReducer from 'ipretty/context/faq/AppErrorReducer'

const useStyles = makeStyles(theme => ({
    faqForm: {
        backgroundColor: '#fff',
        borderRadius: theme.spacing(1),
        position: 'relative',
        "& .content-faq": {
            marginTop: 15,
            padding: '34px 32px',
            "& .content-faq__header": {
                [theme.breakpoints.up("sm")]: {
                    display: 'flex',
                },
                justifyContent: 'space-between',
                "& .add-question": {
                    "& .add-question--green": {
                        "&:hover": {
                            backgroundColor: '#147B65'
                        }
                    }
                }
            },
            "& .content-faq__session": {
                marginTop: 15,
                "& .content-faq__session--theme": {
                    border: '1px solid rgba(136,136,136,.5)',
                    borderRadius: '10px',
                    padding: '15px 25px 25px 25px',
                },
                "& .content-faq__session--question": {
                    marginTop: 20,
                    "& .question": {
                        border: '1px solid rgba(136,136,136,.5)',
                        borderRadius: '10px',
                        padding: '15px 25px 25px 25px',
                        marginBottom: 20,
                        "& .infomation-item": {
                            marginBottom: 15,
                            "&:nth-last-child()": {
                                marginBottom: 0
                            }
                        },
                        "&:nth-last-child()": {
                            marginBottom: 0
                        }
                    }
                },
                "& .infomation": {
                    "& .infomation-item": {
                        "& .infomation-item__title": {
                            marginBottom: 10,
                            display: 'flex',
                            justifyContent: 'space-between',
                            "& .button-chapter__question": {
                                "& button": {
                                    padding: 0
                                }
                            },
                            "& .MuiTypography-root": {
                                color: '#147B6C',
                                fontWeight: 600,
                                fontSize: 18
                            }
                        },
                        "& .infomation-item__input": {
                            "& input": {
                                backgroundColor: '#F3F3F3',
                                borderRadius: '4px'
                            }
                        }
                    }
                }
            }
        }
    },
    title: {
        paddingBottom: '16px',
        fontWeight: 'bold',
        fontSize: '24px',
        lineHeight: '32px',
        color: '#395B65'
    },
    showError: {
        fontWeight: 400,
        fontSize: 11,
        marginTop: 5,
        color: 'red',
        padding: '0 25px'
    },
    showErrorQuestion: {
        fontWeight: 400,
        fontSize: 11,
        color: 'red',
    }
}))

const FAQForm = React.memo((props) => {
    const classes = useStyles()
    const { links, isCreate, titlePage, dataFaq, isEdit, faqId } = props
    const { getTranslation } = useAuth()
    const { makeShortMessage } = useNotiStackContext()
    let history = useHistory()
    const [loadingActionSave, setLoadingActionSave] = useState(false)
    const [loadingActionRelease, setLoadingActionRelease] = useState(false)
    const releases = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: HandleAction, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green', loading: loadingActionSave },
        { id: 3, action: handleShare, icon: <IconImage srcIcon={Share} />, noIcon: false, label: getTranslation('Share'), buttonClass: 'button button__save button--green', loading: loadingActionRelease }
    ]
    const cancelPublishing = [
        { id: 1, action: handleCancel, icon: '', noIcon: true, label: getTranslation('Cancel'), buttonClass: 'button button__cancel button--white' },
        { id: 2, action: handleDontShare, icon: <IconImage srcIcon={Dont_Share} />, noIcon: false, label: getTranslation('CancellationOfRelease'), buttonClass: 'button button__dont-share button--white', loading: loadingActionRelease },
        { id: 3, action: HandleAction, icon: <IconImage srcIcon={Save} />, noIcon: false, label: getTranslation('Save'), buttonClass: 'button button__save button--green' }
    ]
    const initialQuestions = {
        questions: []
    }
    const initialContent = {
        faqs: [
            {
                title: '',
                // isPublished: 0,
                delete_question: []
            }
        ]
    }
    const initialError = {
        error: ''
    }
    const [stateQuestions, dispatchQuestion] = useReducer(AppFaqQuestionReducer, initialQuestions)
    const [stateContents, dispatchContent] = useReducer(AppFaqQuestionReducer, initialContent)
    const [stateError, dipacthError] = useReducer(AppErrorReducer, initialError)

    const addQuestion = useCallback(() => {
        dispatchQuestion({
            type: 'ADD_QUESTION'
        })
    }, [])

    const changeValueQuestion = useCallback((indexQuestion, value) => {
        dispatchQuestion({
            type: 'CHANGE_VALUE_QUESTION',
            newValueCVQ: value,
            indexQuestionCVQ: indexQuestion
        })
    }, [])

    const changeValueContent = useCallback((index, value) => {
        dispatchContent({
            type: 'CHANGE_VALUE_CONTENT',
            newValueCVC: value,
            indexContentCVC: index
        })
    }, [])

    const removeQuestion = useCallback((index) => {
        dispatchQuestion({
            type: 'REMOVE_QUESTION',
            indexQuestionRQ: index
        })
    }, []) 

    useEffect(() => {
        if (isEdit) {
            if (dataFaq && Object.keys(dataFaq).length > 0) {
                dispatchContent({ type: 'GET_VALUE_CONTENT', payload: dataFaq })
                dispatchQuestion({ type: 'GET_VALUE_QUESTION', payload: dataFaq.questions })
            }
        }
    }, [dataFaq])

    function HandleAction() {
        handleData('save')
    }

    function handleShare() {
        handleData('share')
    }

    function handleCancel() {
        history.push('/faqs')
    }

    function handleDontShare() {
        handleData('cancel_publishing')
    }

    function redirectBack() {
        history.push('/faqs')
    }

    function handleData(type) {
        let formData = new FormData()
        if (type == 'save') {
            setLoadingActionSave(true)
            if (faqId) {
                formData.append('isPublished', dataFaq.isPublished)
            } else {
                formData.append('isPublished', 0)
            }
        } else if (type == 'cancel_publishing') {
            setLoadingActionRelease(true)
            formData.append('isPublished', 0)
        } else {
            setLoadingActionRelease(true)
            formData.append('isPublished', 1)
        }
        let data = [stateContents.faqs[0], stateQuestions]
        let faqData = Object.assign({}, ...data)
        for (let key in faqData) {
            if (key == 'questions') {
                let _question = {
                    'questions': faqData[key]
                }
                let _faqs = JSON.stringify(_question)
                formData.append('faqs_resources', _faqs)
            } else {
                formData.append(key, faqData[key])
            }
        }
        if (!faqId) {
            FaqService.create(
                formData,
                res => {
                    makeShortMessage(getTranslation('CreateSuccessQuestion'), "success");
                    setTimeout(() => {
                        setLoadingActionSave(false)
                        setLoadingActionRelease(false)
                        history.push('/faqs')
                    }, 2000)
                },
                err => {
                    setLoadingActionSave(false)
                    setLoadingActionRelease(false)
                    const _error = err.response.data.errors
                    let errorAnswerName = []
                    let errorQuestionName = []
                    for (let key in _error) {
                        let sbtr = key.split('.')
                        if (sbtr[sbtr.length - 1] == 'question_name') {
                            errorQuestionName.push({ error: _error[key], index: sbtr[sbtr.length - 2] })
                        } else if (sbtr[sbtr.length - 1] == 'answer_name') {
                            errorAnswerName.push({ error: _error[key], index: sbtr[sbtr.length - 2] })
                        }
                    }
                    if (errorAnswerName.length > 0) {
                        _error.error_answer_name = errorAnswerName
                    }
                    if (errorQuestionName.length > 0) {
                        _error.error_question_name = errorQuestionName
                    }
                    dipacthError({type: 'SHOW_ERROR_FAQ', payload: err.response.data.errors})
                }
            )
        } else {
            FaqService.edit(
                faqId,
                formData,
                res => {
                    makeShortMessage(getTranslation('updateSuccessQuestion'), "success");
                    setTimeout(() => {
                        setLoadingActionSave(false)
                        setLoadingActionRelease(false)
                        history.push('/faqs')
                    }, 2000)
                },
                err => {
                    setLoadingActionSave(false)
                    setLoadingActionRelease(false)
                    const _error = err.response.data.errors
                    let errorAnswerName = []
                    let errorQuestionName = []
                    for (let key in _error) {
                        let sbtr = key.split('.')
                        if (sbtr[sbtr.length - 1] == 'question_name') {
                            errorQuestionName.push({ error: _error[key], index: sbtr[sbtr.length - 2] })
                        } else if (sbtr[sbtr.length - 1] == 'answer_name') {
                            errorAnswerName.push({ error: _error[key], index: sbtr[sbtr.length - 2] })
                        }
                    }
                    if (errorAnswerName.length > 0) {
                        _error.error_answer_name = errorAnswerName
                    }
                    if (errorQuestionName.length > 0) {
                        _error.error_question_name = errorQuestionName
                    }
                    dipacthError({type: 'SHOW_ERROR_FAQ', payload: err.response.data.errors})
                }
            )
        }
        
    }
   
    return (
        <CreatePage
            links={links}
            isCreate={isCreate}
            titleUrl={getTranslation('course')}
            titlePage={titlePage}
            redirectBack={redirectBack}
            actions={dataFaq && Object.keys(dataFaq).length > 0 && dataFaq.isPublished == 1 ? cancelPublishing : releases}
            multipleBlock
            faqs
        >
            <div className={classes.faqForm}>
                <Component
                    classes={classes}
                    addQuestion={addQuestion}
                    stateQuestions={stateQuestions}
                    changeValueQuestion={changeValueQuestion}
                    stateContents={stateContents}
                    changeValueContent={changeValueContent}
                    dispatchQuestion={dispatchQuestion}
                    stateError={stateError}
                    removeQuestion={removeQuestion}
                    dipacthError={dipacthError}
                    dispatchContent={dispatchContent}
                />
            </div>
        </CreatePage>
    )
})

export default FAQForm