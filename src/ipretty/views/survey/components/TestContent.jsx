
import React, { useCallback } from 'react'
import List from '../../../../public/icons_ipretty/List.png'
import IconImage from "ipretty/components/IconImage";
import { useAuth } from 'ipretty/context/AppProvider'
import AddButton from 'ipretty/components/AddButton'
import QuestionsView from './QuestionsView'

const TestContent = React.memo((props) => {
    const {
        classes,
        stateQuestionsData,
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
        addOneChoiceQuestion,
        addMultipleChoiceQuestion,
        stateError,
        dispatchError
    } = props
    const { getTranslation } = useAuth()

    const handleMultipleOption = useCallback(() => {
        dispatchError({type: 'GET_ERROR', payload: ''})
        addMultipleChoiceQuestion(stateQuestionsData.questions.length)
    }, [addMultipleChoiceQuestion, stateQuestionsData.questions.length])

    const handleSingleOption = useCallback(() => {
        dispatchError({type: 'GET_ERROR', payload: ''})
        addOneChoiceQuestion(stateQuestionsData.questions.length)
    }, [addOneChoiceQuestion, stateQuestionsData.questions.length])

    return (
        <div className="test-content">
            <div className="test-content__header">
                <div className="test-content__title box-form__title">{getTranslation('TestContent')}</div>
                <div className="test-content__action">
                    <div className="test-content__action--single">
                        <AddButton
                            label={getTranslation('OneChoiceQuestion')}
                            id="update-button"
                            buttonClass="button button__single"
                            onClick={handleSingleOption}
                            variant='contained'
                            iconButton={<IconImage srcIcon={List} />}
                            disabled={false}
                        />
                    </div>
                    <div className="test-content__action--multiple">
                        <AddButton
                            label={getTranslation('MultipleChoiceQuestion')}
                            id="update-button"
                            buttonClass="button button__multiple"
                            onClick={handleMultipleOption}
                            variant='contained'
                            iconButton={<IconImage srcIcon={List} />}
                            disabled={false}
                        />
                    </div>
                </div>
            </div>
            {stateError && Object.keys(stateError.error).length > 0 && stateError.error.question_length && stateError.error.question_length.length > 0 ? (
                <div className={classes.showError}>{stateError.error['question_length']}</div>
            ) : ''}
            <div className="test-content__question">
                <QuestionsView
                    classes={classes}
                    getTranslation={getTranslation}
                    stateQuestionsData={stateQuestionsData}
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
            </div>
        </div>
    )
})

export default TestContent