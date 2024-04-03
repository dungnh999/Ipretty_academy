
import React, { useCallback } from 'react'
import Chapters from './Chapters'
import { Button } from '@material-ui/core'
import PlusOrAdd from '../../../../public/icons_ipretty/Plus_Or_Add.png'
import IconImage from "ipretty/components/IconImage"
import { useAuth } from 'ipretty/context/AppProvider'

const SestionChapters = React.memo((props) => {
    const {
        classes,
        stateChapterReducer,
        addChapters,
        changeValueChapter,
        removeChapter,
        removeLessonInChapter,
        dispatchChapter,
        handleActionRedirectLesson,
        handleActionRedirectEditLesson,
        handleActionRedirectSurvey,
        handleActionRedirectEditSurvey,
        errors,
        removeSurveyInChapter,
        dispatchError
    } = props
    const { getTranslation } = useAuth()

    const handleAddChapters = useCallback(() => {
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: '' })
        addChapters(stateChapterReducer.chapters.length)
    }, [addChapters, stateChapterReducer.chapters.length])

    return (
        <div className="session-chapter">
            <Chapters
                classes={classes}
                changeValueChapter={changeValueChapter}
                stateChapterReducer={stateChapterReducer}
                removeChapter={removeChapter}
                handleActionRedirectLesson={handleActionRedirectLesson}
                removeLessonInChapter={removeLessonInChapter}
                dispatchChapter={dispatchChapter}
                handleActionRedirectEditLesson={handleActionRedirectEditLesson}
                handleActionRedirectSurvey={handleActionRedirectSurvey}
                handleActionRedirectEditSurvey={handleActionRedirectEditSurvey}
                errors={errors}
                dispatchError={dispatchError}
                removeSurveyInChapter={removeSurveyInChapter}
            />
            <div className="add-chapter">
                <Button variant="outlined" color="primary" className="session-chapter__button--add" onClick={handleAddChapters} >
                    <IconImage isPagi srcIcon={PlusOrAdd} className="button-add_chapter" /> {getTranslation('AddChapter')}
                </Button>
            </div>
            {errors && Object.keys(errors).length > 0 && errors['chapters_length'] ? (
                <div className={classes.showError}>{errors['chapters_length']}</div>
            ) : ''}
        </div>
    )
})

export default SestionChapters