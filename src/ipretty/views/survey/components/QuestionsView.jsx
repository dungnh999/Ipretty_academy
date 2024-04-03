
import React, { memo, useCallback } from 'react'
import Questions from './Questions'

const QuestionsView = memo((props) => {
    const {
        classes,
        stateQuestionsData,
        getTranslation,
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
        dispatchQuestions,
        stateError,
        dispatchError
    } = props

    return (
        <React.Fragment>
            <Questions
                classes={classes}
                stateQuestionsData={stateQuestionsData}
                getTranslation={getTranslation}
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
                dispatchQuestions={dispatchQuestions}
                stateError={stateError}
                dispatchError={dispatchError}
            />
        </React.Fragment>
    )
})

export default QuestionsView