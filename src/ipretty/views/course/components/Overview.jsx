
import React from 'react'
import Lessons from './lesson/Lessons'
import Survey from './survey/Survey'

const Overview = React.memo((props) => {
    const {
        classes,
        lessons,
        survey,
        indexChapter,
        handleActionRedirectEditLesson,
        handleActionRedirectEditSurvey,
        removeLessonInChapter,
        dispatchChapter,
        handleActionRedirectSurvey,
        removeSurveyInChapter
    } = props

    return (
        <div className="overview">
            <Lessons
                classes={classes}
                lessons={lessons}
                indexChapter={indexChapter}
                handleActionRedirectEditLesson={handleActionRedirectEditLesson}
                removeLessonInChapter={removeLessonInChapter}
                dispatchChapter={dispatchChapter}
            />
            {survey && Object.keys(survey).length > 0 && (
                <Survey
                    survey={survey}
                    indexChapter={indexChapter}
                    handleActionRedirectEditSurvey={handleActionRedirectEditSurvey}
                    handleActionRedirectSurvey={handleActionRedirectSurvey}
                    removeSurveyInChapter={removeSurveyInChapter}
                />
            )}
        </div>
    )
})

export default Overview