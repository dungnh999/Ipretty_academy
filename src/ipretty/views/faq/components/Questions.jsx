
import React, { useState } from 'react'
import Question from './Question'

const Questions = React.memo((props) => {
    const {
        classes,
        stateQuestions,
        changeValueQuestion,
        dispatchQuestion,
        stateError,
        removeQuestion,
        dipacthError,
        dispatchContent
    } = props
    const [draggedItem, setDraggedItem] = useState(null)

    return stateQuestions.questions.map((question, indexQuestion) => (
        <div className="question" key={indexQuestion}>
            <Question
                classes={classes}
                question={question}
                indexQuestion={indexQuestion}
                changeValueQuestion={changeValueQuestion}
                stateError={stateError}
                removeQuestion={removeQuestion}
                dipacthError={dipacthError}
                dispatchContent={dispatchContent}
            />
        </div>
    ))
})

export default Questions