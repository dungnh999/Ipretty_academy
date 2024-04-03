import { Box } from '@material-ui/core'
import React, { memo } from 'react'
import GeneralInformation from './GeneralInformation'
import TestContent from './TestContent'

const Survey = memo((props) => {
    const {
        classes,
        getTranslation,
        stateSurveyInformation,
        stateQuestionsData,
        changeValueSurvey,
        addQuestion,
        changeValueQuestion,
        removeQuestion,
        addOption,
        changeValueOption,
        removeQuestionAttachment,
        changeValueMultipleChoice,
        changeValueSingleChoice,
        changeValueQuestionType,
        removeOptionInQuestion,
        removeOptionAttachment,
        stateError,
        dispatchError,
        addOneChoiceQuestion,
        addMultipleChoiceQuestion,
        dispatchQuestions
    } = props

    return (
        <div className="survey-form">
            <Box className="box-form" width={1} my={4} px={3} py={2} >
                <div className="box-form__title">{getTranslation('ExamInformation')}</div>
                <GeneralInformation
                    classes={classes}
                    getTranslation={getTranslation}
                    changeValueSurvey={changeValueSurvey}
                    stateSurveyInformation={stateSurveyInformation}
                    stateError={stateError}
                    dispatchError={dispatchError}
                />
            </Box>
            <Box className="box-form" width={1} my={4} px={3} py={2} >
                <TestContent
                    classes={classes}
                    stateQuestionsData={stateQuestionsData}
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
                    dispatchError={dispatchError}
                    dispatchQuestions={dispatchQuestions}
                    addOneChoiceQuestion={addOneChoiceQuestion}
                    addMultipleChoiceQuestion={addMultipleChoiceQuestion}
                />
            </Box>
        </div>
    )
})

export default Survey