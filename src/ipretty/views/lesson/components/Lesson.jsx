import React from 'react'
import ActionInput from './ActionInput'

const Lesson = React.memo((props) => {
    const { 
        classes, 
        getTranslation, 
        changeDataLesson, 
        isCreate, 
        stateLessonReducer, 
        removeLessonAttachment, 
        removeMainAttachment,
        dispatcError,
        stateError
    } = props

    return stateLessonReducer.lessons.map((lesson, indexLesson) => (
        <React.Fragment key={indexLesson}>
            <ActionInput
                classes={classes}
                getTranslation={getTranslation}
                changeDataLesson={changeDataLesson}
                isCreate={isCreate}
                lesson={lesson}
                indexLesson={indexLesson}
                removeLessonAttachment={removeLessonAttachment}
                removeMainAttachment={removeMainAttachment}
                dispatcError={dispatcError}
                stateError={stateError}
            />
        </React.Fragment>
    ))
})

export default Lesson