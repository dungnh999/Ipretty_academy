import { Box } from '@material-ui/core'
import React from 'react'
import Chapter from './Chapter'

const ViewChapter = React.memo((props) => {
    const {
        classes,
        chapter,
        indexChapter,
        changeValueChapter,
        removeChapter,
        handleActionRedirectLesson,
        removeLessonInChapter,
        onDragStart,
        onDragEnd,
        dispatchChapter,
        handleActionRedirectEditLesson,
        handleActionRedirectSurvey,
        handleActionRedirectEditSurvey,
        errors,
        removeSurveyInChapter,
        dispatchError
    } = props

    return (
        <Box className={classes.boxForm} width={1} my={4} px={3} py={2} draggable onDragStart={(e) => onDragStart(e, indexChapter)} onDragEnd={(e) => onDragEnd(e)}>
            <Chapter
                classes={classes}
                chapter={chapter}
                indexChapter={indexChapter}
                changeValueChapter={changeValueChapter}
                removeChapter={removeChapter}
                handleActionRedirectLesson={handleActionRedirectLesson}
                handleActionRedirectEditLesson={handleActionRedirectEditLesson}
                removeLessonInChapter={removeLessonInChapter}
                dispatchChapter={dispatchChapter}
                handleActionRedirectSurvey={handleActionRedirectSurvey}
                handleActionRedirectEditSurvey={handleActionRedirectEditSurvey}
                errors={errors}
                removeSurveyInChapter={removeSurveyInChapter}
                dispatchError={dispatchError}
            />
        </Box>
    )
})

export default ViewChapter