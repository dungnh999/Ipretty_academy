
import React, { memo, useState } from 'react' 
import Question from './Question'

const Questions = memo((props) => {
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
    const [draggedItem, setDraggedItem] = useState(null)

    const onDragOver = (e, index) => {
        e.stopPropagation();
        e.preventDefault();
        const draggedOverItem = stateQuestionsData.questions[index];
        if (draggedItem.number_order === draggedOverItem.number_order) {
            return;
        }
        let items = stateQuestionsData.questions.filter(item => item.number_order !== draggedItem.number_order);
        items.splice(index, 0, draggedItem);
        dispatchQuestions({ type: 'GET_VALUE_OPTION_QUESTION', payload: items })
    }

    const onDragStart = (e, index) => {
        let draggedItem = stateQuestionsData.questions[index];
        setDraggedItem(draggedItem)
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    }

    const onDragEnd = (e) => {
        setDraggedItem(null)
    }

    return stateQuestionsData.questions.map((question, indexQuestion) => (
        <div key={indexQuestion} onDragOver={(e) => onDragOver(e, indexQuestion)}>
            <Question
                classes={classes}
                getTranslation={getTranslation}
                question={question}
                indexQuestion={indexQuestion}
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
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                dispatchError={dispatchError}
                stateError={stateError}
            />
        </div>
    ))
})

export default Questions