import React, { useCallback } from 'react'
import TitleChapter from './TitleChapter'
import Test from '../../../../public/icons_ipretty/survey.png'
import Play from '../../../../public/icons_ipretty/lesson.png'
import IconImage from "ipretty/components/IconImage"
import { Button } from "@material-ui/core"
import Overview from './Overview'
import { useAuth } from 'ipretty/context/AppProvider'

const Chapter = React.memo((props) => {
    const {
        classes,
        chapter,
        indexChapter,
        changeValueChapter,
        handleActionRedirectLesson,
        removeChapter,
        handleActionRedirectEditSurvey,
        removeLessonInChapter,
        dispatchChapter,
        handleActionRedirectEditLesson,
        handleActionRedirectSurvey,
        errors,
        removeSurveyInChapter,
        dispatchError
    } = props
    const { getTranslation } = useAuth()

    const handleAddLesson = useCallback(e => {
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: '' })
        handleActionRedirectLesson(indexChapter)
    }, [handleActionRedirectLesson, indexChapter])

    const handleAddSurvey = useCallback(e => {
        dispatchError({ type: 'GET_ERROR_DATA_COURSE', payload: '' })
        handleActionRedirectSurvey(indexChapter)
    }, [handleActionRedirectSurvey, indexChapter])

    return (
        <div className="chapter">
            <TitleChapter
                classes={classes}
                chapter_name={chapter.chapter_name}
                indexChapter={indexChapter}
                changeValueChapter={changeValueChapter}
                removeChapter={removeChapter}
                dispatchError={dispatchError}
            />
            {errors && Object.keys(errors).length > 0 && errors['chapters'] && errors['chapters'][indexChapter] && (errors['chapters'][indexChapter].index || errors['chapters'][indexChapter].index == 0) && errors['chapters'][indexChapter].index === indexChapter ? (
                <div className={classes.showError}>{errors['chapters'][indexChapter].error}</div>
            ) : ''}
            <div className="session">
                <div className="session--overview">
                    <Overview
                        classes={classes}
                        lessons={chapter.lessons && chapter.lessons.length > 0 ? chapter.lessons : []}
                        survey={chapter.survey}
                        indexChapter={indexChapter}
                        handleActionRedirectEditLesson={handleActionRedirectEditLesson}
                        removeLessonInChapter={removeLessonInChapter}
                        dispatchChapter={dispatchChapter}
                        handleActionRedirectSurvey={handleActionRedirectSurvey}
                        handleActionRedirectEditSurvey={handleActionRedirectEditSurvey}
                        removeSurveyInChapter={removeSurveyInChapter}
                    />
                </div>
                <div className="button-add__lesson">
                    <Button variant="outlined" color="primary" className="button-add--style" onClick={handleAddLesson} >
                        <IconImage isPagi srcIcon={Play} className="icon_class" /> {getTranslation('AddLesson')}
                    </Button>
                </div>
                <div className="button-add__survey">
                    <Button variant="outlined" color="primary" className="button-add--style" onClick={handleAddSurvey} disabled={chapter.survey && Object.keys(chapter.survey).length > 0 ? true : false}>
                        <IconImage isPagi srcIcon={Test} className="icon_class" /> {getTranslation('AddSurvey')}
                    </Button>
                </div>
                {errors && Object.keys(errors).length > 0 && errors['lesson_survey'] && errors['lesson_survey'][indexChapter] && (errors['lesson_survey'][indexChapter].index || errors['lesson_survey'][indexChapter].index == 0) && errors['lesson_survey'][indexChapter].index === indexChapter ? (
                    <div className={classes.showError}>{errors['lesson_survey'][indexChapter].error}</div>
                ) : ''}
            </div>
        </div>
    )
})

export default Chapter