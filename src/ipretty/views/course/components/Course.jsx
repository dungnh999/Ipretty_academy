import { Box } from '@material-ui/core'
import React from 'react'
import GeneralInfomation from './GeneralInfomation'
import SectionChapters from './SectionChapters'
import Participants from './Participants'
import { useAuth } from 'ipretty/context/AppProvider'

const Course = React.memo((props) => {
    const {
        classes,
        changeDataFields,
        stateInfomationReducer,
        stateChapterReducer,
        addChapters,
        changeValueChapter,
        removeChapter,
        coureCategories,
        stateCourseFeatureImage,
        uploadBannerCourse,
        options,
        removeCourseTarget,
        changeValueCourseTarget,
        addItemCourseTarget,
        stateCourseTarget,
        removeLessonInChapter,
        dispatchError,
        dispatchStatus,
        stateParticipants,
        dispatchChapter,
        handleActionRedirectLesson,
        handleActionRedirectEditLesson,
        handleActionRedirectSurvey,
        dispatchErrorImg,
        handleActionRedirectEditSurvey,
        stateErrorCourseFeatureImage,
        removeSurveyInChapter,
        stateErrorReducer
    } = props
    const { getTranslation } = useAuth()

    return (
        <div className="course">
            <div className="course-general-info">
                <Box className={classes.boxForm} width={1} my={4} px={3} py={2} >
                    <div className={classes.title}>{getTranslation('CourseInformation')}</div>
                    <GeneralInfomation
                        classes={classes}
                        changeDataFields={changeDataFields}
                        getTranslation={getTranslation}
                        stateInfomationReducer={stateInfomationReducer}
                        coureCategories={coureCategories}
                        options={options.teachers}
                        removeCourseTarget={removeCourseTarget}
                        changeValueCourseTarget={changeValueCourseTarget}
                        addItemCourseTarget={addItemCourseTarget}
                        stateCourseTarget={stateCourseTarget}
                        stateCourseFeatureImage={stateCourseFeatureImage}
                        uploadBannerCourse={uploadBannerCourse}
                        stateErrorReducer={stateErrorReducer}
                        dispatchErrorImg={dispatchErrorImg}
                        stateErrorCourseFeatureImage={stateErrorCourseFeatureImage}
                        dispatchError={dispatchError}
                    />
                </Box>

                {stateInfomationReducer.courses[0].course_type == 'Group' && (
                    <Box className={classes.boxForm} width={1} my={4} px={3} py={2} >
                        <div className={classes.title}>{getTranslation('Participants')}</div>
                        <Participants
                            classes={classes}
                            optionstudents={options.students}
                            optionleaders={options.leaders}
                            dispatchStatus={dispatchStatus}
                            students={stateParticipants.render_student_ids}
                            leaders={stateParticipants.render_leader_ids}
                            errors={stateErrorReducer.error}
                            dispatchError={dispatchError}
                        />
                    </Box>
                )}
            </div>
            <div className="course-session-chapters">
                <SectionChapters
                    classes={classes}
                    stateChapterReducer={stateChapterReducer}
                    addChapters={addChapters}
                    changeValueChapter={changeValueChapter}
                    removeChapter={removeChapter}
                    removeLessonInChapter={removeLessonInChapter}
                    dispatchChapter={dispatchChapter}
                    handleActionRedirectLesson={handleActionRedirectLesson}
                    handleActionRedirectEditLesson={handleActionRedirectEditLesson}
                    handleActionRedirectSurvey={handleActionRedirectSurvey}
                    handleActionRedirectEditSurvey={handleActionRedirectEditSurvey}
                    errors={stateErrorReducer.error}
                    removeSurveyInChapter={removeSurveyInChapter}
                    dispatchError={dispatchError}
                />
            </div>
        </div>
    )
})

export default Course