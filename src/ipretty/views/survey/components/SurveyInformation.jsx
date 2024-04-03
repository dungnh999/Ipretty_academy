
import React, { memo, useCallback, useMemo } from 'react'
import SesionUploadImage from './SesionUploadImage'
import TitleRequired from 'ipretty/components/TitleRequired'
import TextInput from 'ipretty/components/TextInput'
import { toBase64, convertToBlob } from 'ipretty/helpers/contextHelper'
import SurveyService from 'ipretty/services/SurveyService'

const SurveyInformation = memo((props) => {
    const {
        classes,
        getTranslation,
        question,
        indexQuestion,
        changeValueQuestion,
        stateError,
        dispatchError
    } = props
    const acceptFile = 'image/png, image/jpeg, image/jpg, image/gif'

    const onChange = nameField => useCallback(e => {
        dispatchError({ type: 'GET_ERROR', payload: '' })
        if (nameField == 'question_attachments') {
            let file = e.target.files[0]
            let acceptFiles = acceptFile.split(', ')
            if (!acceptFiles.includes(file.type)) {
                dispatchError({ type: 'GET_ERROR', payload: { question_attachments: [{ error: `${acceptFile}`, indexQuestion: indexQuestion}], } })
                return false
            } else {
                let data = new FormData()
                data.append('image_attachment', file)
                SurveyService.uploadFile(
                    data,
                    res => {
                        let response = res.data.data
                        changeValueQuestion(indexQuestion, { [nameField]: response.url, 'render_question_attachments': response.url })
                    },
                    err => {
                        console.log(err)
                    }
                )
            }
        } else {
            changeValueQuestion(indexQuestion, { [nameField]: e.target.value })
        }
    }, [changeValueQuestion, indexQuestion, nameField])

    async function convertFile(file, nameField, index, changeValueQuestion) {
        await convertToBlob(file).then(
            data => changeValueQuestion(index, { [nameField]: [data] })
        );
    }

    return (
        <div className="header">
            <div className="header__content">
                <div className="header__content--title">
                    <TitleRequired title={`${getTranslation('TheSentence')} ${indexQuestion + 1}`} required={true} />
                </div>
                <div className="header__content--action">
                    <div className="acction__input">
                        <TextInput
                            placeholder={getTranslation('placeholderQuestion')}
                            onChange={onChange('question_title')}
                            fullWidth
                            value={question.question_title || ''}
                            noMargin
                            rows={5}
                        />
                    </div>
                    <div className="action__upload">
                        <SesionUploadImage
                            uploadFile={onChange}
                            classes={classes}
                            nameField={'question_attachments'}
                            htmlFor={'question_attachments'}
                            value={question.question_attachments}
                            indexQuestion={indexQuestion}
                        />
                    </div>
                </div>
                {stateError && Object.keys(stateError.error).length > 0 && stateError.error.question_attachments && stateError.error.question_attachments.length > 0 && stateError.error.question_attachments[0].indexQuestion == indexQuestion ? (
                    <div className={classes.showError}>{stateError.error.question_attachments[0].error}</div>
                ) : ''}
                {stateError && Object.keys(stateError.error).length > 0 && stateError.error['questions'] && stateError.error['questions'][indexQuestion] && (stateError.error['questions'][indexQuestion].index || stateError.error['questions'][indexQuestion].index == 0) && stateError.error['questions'][indexQuestion].index === indexQuestion ? (
                    <div className={classes.showError}>{stateError.error['questions'][indexQuestion].error}</div>
                ) : ''}
            </div>
        </div>
    )
})

export default SurveyInformation