
import React, { useCallback } from 'react'
import Delete from '../../../../../public/icons_ipretty/Delete.png'
import Edit from '../../../../../public/icons_ipretty/Edit.png'
import Play from '../../../../../public/icons_ipretty/Play.png'
import DrapAndDrop from '../../../../../public/icons_ipretty/Drag.png'
import { Typography, Tooltip, IconButton } from '@material-ui/core'
import IconImage from "ipretty/components/IconImage"
import { useAuth } from 'ipretty/context/AppProvider'
import contextHelper from 'ipretty/helpers/contextHelper'

const Lesson = React.memo((props) => {
    const {
        classes,
        indexChapter,
        indexLesson,
        lesson,
        handleActionRedirectEditLesson,
        removeLessonInChapter,
        onDragStart,
        onDragEnd
    } = props
    const { getTranslation } = useAuth()
    const { convertTommss, compactText } = contextHelper

    const handleEditLesson = useCallback(e => {
        handleActionRedirectEditLesson(indexChapter, indexLesson, lesson.lesson_id)
    }, [handleActionRedirectEditLesson, indexChapter, indexLesson])

    const handleRemoveLesson = useCallback(e => {
        removeLessonInChapter(indexChapter, indexLesson)
    }, [removeLessonInChapter, indexChapter, indexLesson])

    return (
        <div className="lesson" draggable onDragStart={(e) => onDragStart(e, indexLesson)} onDragEnd={(e) => onDragEnd(e)}>
            <div className="lesson__icon">
                <IconImage srcIcon={Play} isPagi className="icon_class" />
            </div>
            <div className="lesson__title">
                <Typography>{`Bài ${indexLesson + 1}: `}</Typography>
            </div>
            <div className="lesson__content">
                <Tooltip title={lesson.lesson_name} placement="bottom">
                    <div className="lesson__content--name">
                        <Typography>{compactText(lesson.lesson_name, 30)}</Typography>
                    </div>
                </Tooltip>
            </div>
            <div className="lesson__duration">
                <Typography>{convertTommss(parseInt(lesson.lesson_duration))}</Typography>
            </div>
            <div className="lesson__button">
                <div className="lesson__button--edit">
                    <Tooltip title={getTranslation('EditLesson')} placement="bottom">
                        <IconButton onClick={handleEditLesson}>
                            <IconImage srcIcon={Edit} isPagi className="icon_class" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="lesson__button--delete">
                    <Tooltip title={getTranslation('RemoveLesson')} placement="bottom">
                        <IconButton onClick={handleRemoveLesson}>
                            <IconImage srcIcon={Delete} isPagi className="icon_class" />
                        </IconButton>
                    </Tooltip>
                </div>
                <div className="lesson__button--drap-drop">
                    <Tooltip title={getTranslation('Move')} placement="bottom">
                        <IconImage srcIcon={DrapAndDrop} isPagi className="icon_class" />
                    </Tooltip>
                </div>
            </div>
        </div>
    )
})

export default Lesson