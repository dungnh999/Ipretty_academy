import React, { createContext, useReducer, useContext } from "react"
import { lessonSurveyStudentReducer } from "./LessonSurveyStudentReducer";
import { LessonSurveyStudentActionType } from "./types"

const { GET_DATA_DETAIL_COURSE, GET_LESSON_BY_ID, GET_SURVEY_STUDENT_WORKED, OPEN_CHAPTER, UPDATE_LESSON_LEARNED, UPDATE_RATING_AVG_FOR_COURSE } = LessonSurveyStudentActionType

const dataCourseDefault = {
    teacherInfo: {},
    courseInfo: {},
    listChapterLesson: [],
    certificate: {},
    dataLessonById: {},
    dataSurveyWorked: {},
    learningProcess: [],
    urlRedirect: [],
    firstLesson : {}
}

export const LessonSurveyStudentContext = createContext(null)

const LessonSurveyStudentContextProvider = ({children}) => {

    const [ dataCourse, dispatch ] = useReducer(lessonSurveyStudentReducer, dataCourseDefault)

    const updateDataDetailCourse = (courseData) => dispatch({ type: GET_DATA_DETAIL_COURSE, payload: courseData })

    const getLessonById = (indexChapter) => dispatch({ type: GET_LESSON_BY_ID, payload: indexChapter })

    const getSurveyStudentWorked = (dataId) => dispatch({ type: GET_SURVEY_STUDENT_WORKED, payload: dataId })

    const openChapter = (chapterIndex) => dispatch({ type: OPEN_CHAPTER, payload: chapterIndex })

    const updateLessonLearned = (dataIndex) => dispatch({ type: UPDATE_LESSON_LEARNED, payload: dataIndex })

    const updateRatingAvgForCourse = (star) => dispatch({ type: UPDATE_RATING_AVG_FOR_COURSE, payload: star })

    const contextData = {
        dataCourse,
        updateDataDetailCourse,
        getLessonById,
        getSurveyStudentWorked,
        openChapter,
        updateLessonLearned,
        updateRatingAvgForCourse
    }

    return(
        <LessonSurveyStudentContext.Provider value={contextData}>
            {children}
        </LessonSurveyStudentContext.Provider>
    )
}

export const useLessonSurvey = () => useContext(LessonSurveyStudentContext);

export default LessonSurveyStudentContextProvider