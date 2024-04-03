import React, { memo } from 'react'
import ActionInput from './ActionInput'

const GeneralInfomation = memo((props) => {
    const { classes, getTranslation, stateSurveyInformation, changeValueSurvey, stateError, dispatchError } = props

    return stateSurveyInformation.surveys.map((survey, indexSurvey) => (
        <React.Fragment key={indexSurvey}>
            <ActionInput
                classes={classes}
                getTranslation={getTranslation}
                survey={survey}
                indexSurvey={indexSurvey}
                changeValueSurvey={changeValueSurvey}
                stateError={stateError}
                dispatchError={dispatchError}
            />
        </React.Fragment>
    ))
})

export default GeneralInfomation