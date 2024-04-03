
import React, { memo, useCallback } from 'react'
import { Tooltip, IconButton, Button } from '@material-ui/core'
import Options from './Options'
import SurveyInformation from './SurveyInformation'
import Delete_Black from '../../../../public/icons_ipretty/Delete_black.png'
import DrapAndDrop from '../../../../public/icons_ipretty/Drag.png'
import IconImage from "ipretty/components/IconImage";

const Question = memo((props) => {
    const {
        classes,
        question,
        getTranslation,
        indexQuestion,
        removeQuestion,
        changeValueQuestion,
        addOption,
        changeValueOption,
        removeQuestionAttachment,
        changeValueMultipleChoice,
        changeValueSingleChoice,
        changeValueQuestionType,
        removeOptionInQuestion,
        removeOptionAttachment,
        onDragStart,
        onDragEnd,
        stateError,
        dispatchError
    } = props

    const handleRemoveQuestion = useCallback(() => {
        removeQuestion(indexQuestion)
    }, [indexQuestion, removeQuestion])

    return (
        <div className="question" draggable onDragStart={(e) => onDragStart(e, indexQuestion)} onDragEnd={(e) => onDragEnd(e)}>
            <div className="question__action">
                <div className="question__action--remove">
                    <Tooltip title={getTranslation('RemoveQuestion')} placement="bottom">
                        <IconButton className="question__action--button-remove" onClick={handleRemoveQuestion}>
                            <IconImage srcIcon={Delete_Black} />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="question__action--drap-drop">
                    <Tooltip title={getTranslation('Move')} placement="bottom">
                        <IconImage srcIcon={DrapAndDrop} />
                    </Tooltip>
                </div>
            </div>
            <div className="question__infomation">
                <SurveyInformation
                    classes={classes}
                    getTranslation={getTranslation}
                    question={question}
                    indexQuestion={indexQuestion}
                    changeValueQuestion={changeValueQuestion}
                    removeQuestionAttachment={removeQuestionAttachment}
                    changeValueQuestionType={changeValueQuestionType}
                    stateError={stateError}
                    dispatchError={dispatchError}
                />
            </div>
            <div className="question__option">
                <div className="question__option--title">{getTranslation('Plan')}</div>
                <div className="question__option--plan">
                    <Options
                        classes={classes}
                        getTranslation={getTranslation}
                        stateOptions={question.options}
                        indexQuestion={indexQuestion}
                        changeValueOption={changeValueOption}
                        questionType={question.question_type}
                        changeValueMultipleChoice={changeValueMultipleChoice}
                        changeValueSingleChoice={changeValueSingleChoice}
                        removeOptionInQuestion={removeOptionInQuestion}
                        removeOptionAttachment={removeOptionAttachment}
                        addOption={addOption}
                        dispatchError={dispatchError}
                        stateError={stateError}
                    />
                    {stateError && Object.keys(stateError.error).length > 0 && stateError.error['right_answer'] && stateError.error['right_answer'][indexQuestion] && (stateError.error['right_answer'][indexQuestion].index || stateError.error['right_answer'][indexQuestion].index == 0) && stateError.error['right_answer'][indexQuestion].index === indexQuestion ? (
                        <div className={classes.showError}>{stateError.error['right_answer'][indexQuestion].error}</div>
                    ) : ''}
                </div>
            </div>
        </div>
    )
})

export default Question