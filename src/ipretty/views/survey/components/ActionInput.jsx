import React, { memo, useCallback, useMemo, useState } from 'react'
import TitleRequired from 'ipretty/components/TitleRequired'
import TextInput from 'ipretty/components/TextInput'

const ActionInput = memo((props) => {
    const { classes, changeValueSurvey, survey, getTranslation, indexSurvey, stateError, dispatchError } = props

    const onChange = nameField => useCallback(e => {
        dispatchError({type: 'GET_ERROR', payload: ''})
        changeValueSurvey(indexSurvey, { [nameField]: e.target.value })
    }, [changeValueSurvey, indexSurvey, nameField])

    return (
        <div className="infomation">
            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('SurveyTitle')} required={true} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        placeholder={getTranslation('PlaceholderSurveyTitle')}
                        onChange={onChange('survey_title')}
                        fullWidth
                        value={survey.survey_title || ''}
                        noMargin
                        helperText={stateError && Object.keys(stateError.error).length > 0 && stateError.error.survey_title && stateError.error.survey_title.length > 0 ? stateError.error['survey_title'] : '' }
                    />
                </div>
            </div>
            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('SurveyDescription')} required={false} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        placeholder={getTranslation('placeholderSurveyDescription')}
                        onChange={onChange('survey_description')}
                        fullWidth
                        value={survey.survey_description || ''}
                        noMargin
                        rows={4}
                    />
                </div>
            </div>
            <div className="infomation-item">
                <div className="infomation-item__title">
                    <TitleRequired title={getTranslation('PercentToPass')} required={true} />
                </div>
                <div className="infomation-item__input">
                    <TextInput
                        placeholder={getTranslation('placeholderSurveyToPass')}
                        onChange={onChange('percent_to_pass')}
                        fullWidth
                        value={survey.percent_to_pass || ''}
                        noMargin
                        type={'number'}
                        helperText={stateError && Object.keys(stateError.error).length > 0 && stateError.error.percent_to_pass && stateError.error.percent_to_pass.length > 0 ? stateError.error['percent_to_pass'] : ''}
                    />
                </div>
            </div>
        </div>
    )
})

export default ActionInput