

import React, { useState } from 'react'
import Lesson from './Lesson'

const Lessons = React.memo((props) => {
    const {
        classes,
        lessons,
        indexChapter,
        handleActionRedirectEditLesson,
        removeLessonInChapter,
        dispatchChapter,
    } = props
    const [draggedItem, setDraggedItem] = useState(null)

    const onDragOver = (e, index) => {
        e.stopPropagation();
        e.preventDefault();
        const draggedOverItem = lessons[index];
        if (draggedItem.number_order === draggedOverItem.number_order) {
            return;
        }
        let items = lessons.filter(item => item.number_order !== draggedItem.number_order);
        items.splice(index, 0, draggedItem);
        dispatchChapter({ type: 'GET_VALUE_LESSON_CHAPTER', payload: { items, indexChapter } })
    }

    const onDragStart = (e, index) => {
        let draggedItem = lessons[index];
        setDraggedItem(draggedItem)
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/html", e.target.parentNode);
        e.dataTransfer.setDragImage(e.target.parentNode, 20, 20);
    }

    const onDragEnd = (e) => {
        setDraggedItem(null)
    }

    return lessons.map((lesson, indexLesson) => (
        <div key={indexLesson} onDragOver={(e) => onDragOver(e, indexLesson)}>
            <Lesson
                classes={classes}
                indexChapter={indexChapter}
                lesson={lesson}
                indexLesson={indexLesson}
                handleActionRedirectEditLesson={handleActionRedirectEditLesson}
                removeLessonInChapter={removeLessonInChapter}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
            />
        </div>
    ))
})

export default Lessons