
import TextInput from 'ipretty/components/TextInput'
import TitleRequired from 'ipretty/components/TitleRequired'
import { useAuth } from 'ipretty/context/AppProvider'
import React, { useCallback } from 'react'
import Delete from 'public/icon_svg/Delete.svg'
import { IconButton, Tooltip } from '@material-ui/core'
import IconImage from 'ipretty/components/IconImage'

const Question = React.memo((props) => {
    const {
        question,
        indexQuestion,
        changeValueQuestion,
        stateError,
        removeQuestion,
        dipacthError,
        dispatchContent,
        classes
    } = props
    const { getTranslation } = useAuth()

    const onChange = nameField => useCallback(e => {
        dipacthError({ type: 'SHOW_ERROR_FAQ', payload: '' })
        changeValueQuestion(indexQuestion, { [nameField]: e.target.value })
    }, [indexQuestion, changeValueQuestion, nameField])

    const handleRemoveQuestion = useCallback(() => {
        dipacthError({ type: 'SHOW_ERROR_FAQ', payload: '' })
        if (question.question_id) {
            dispatchContent({ type: 'GET_QUESTION_ID', payload: question.question_id })
        }
        removeQuestion(indexQuestion)
    }, [removeQuestion, indexQuestion])

    return (
        <div className="infomation">
            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={`${getTranslation('TheSentence')} ${indexQuestion + 1}`} required={false} />
                    <div className="button-chapter__question">
                        <Tooltip title={getTranslation('RemoveQuestion')} placement="bottom">
                            <IconButton onClick={handleRemoveQuestion}>
                                <IconImage srcIcon={Delete} />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        placeholder={getTranslation('FillInTheSubject')}
                        onChange={onChange('question_name')}
                        fullWidth
                        value={question.question_name || ''}
                        noMargin
                    />
                </div>
            </div>
            {stateError.error['error_question_name'] && stateError.error['error_question_name'].length > 0 && stateError.error['error_question_name'].map((error, index) => (
                error.index == indexQuestion && <div key={index} className={classes.showErrorQuestion}>{error.error[0]}</div>
            ))}
            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('Answer')} required={false} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        placeholder={getTranslation('FillInTheSubject')}
                        onChange={onChange('answer_name')}
                        fullWidth
                        value={question.answer_name || ''}
                        noMargin
                    />
                </div>
            </div>
            {stateError.error['error_answer_name'] && stateError.error['error_answer_name'].length > 0 && stateError.error['error_answer_name'].map((error, index) => (
                error.index == indexQuestion && <div key={index} className={classes.showErrorQuestion}>{error.error[0]}</div>
            ))}
        </div>
    )
})

export default Question