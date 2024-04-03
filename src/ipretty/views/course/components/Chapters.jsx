
import React, { useCallback, useState } from 'react'
import ChapterView from './ViewChapter'

const Chapters = React.memo((props) => {
    const {
        classes,
        stateChapterReducer,
        changeValueChapter,
        removeChapter,
        handleActionRedirectLesson,
        removeLessonInChapter,
        dispatchChapter,
        handleActionRedirectEditLesson,
        handleActionRedirectSurvey,
        handleActionRedirectEditSurvey,
        errors,
        removeSurveyInChapter,
        dispatchError
    } = props
    const [draggedItem, setDraggedItem] = useState(null)

    const onDragOver = (e, index) => {
        e.stopPropagation();
        e.preventDefault();
        const draggedOverItem = stateChapterReducer.chapters[index];
        if (draggedItem.number_order === draggedOverItem.number_order) {
            return;
        }
        let items = stateChapterReducer.chapters.filter(item => item.number_order !== draggedItem.number_order);
        items.splice(index, 0, draggedItem);
        dispatchChapter({ type: 'DRAP_AND_DROP_CHAPTER', payload: items })
    }

    const onDragStart = (e, index) => {
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: '' })
        let draggedItem = stateChapterReducer.chapters[index];
        setDraggedItem(draggedItem)
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    }

    const onDragEnd = (e) => {
        setDraggedItem(null)
    }

    return stateChapterReducer.chapters.map((chapter, indexChapter) => (
        <div key={indexChapter} onDragOver={(e) => onDragOver(e, indexChapter)}>
            <ChapterView
                classes={classes}
                chapter={chapter}
                indexChapter={indexChapter}
                changeValueChapter={changeValueChapter}
                removeChapter={removeChapter}
                handleActionRedirectLesson={handleActionRedirectLesson}
                removeLessonInChapter={removeLessonInChapter}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                dispatchChapter={dispatchChapter}
                handleActionRedirectEditLesson={handleActionRedirectEditLesson}
                handleActionRedirectSurvey={handleActionRedirectSurvey}
                handleActionRedirectEditSurvey={handleActionRedirectEditSurvey}
                errors={errors}
                removeSurveyInChapter={removeSurveyInChapter}
                dispatchError={dispatchError}
            />
        </div>
    ))
})

export default Chapters