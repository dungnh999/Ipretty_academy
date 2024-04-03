import React , {createContext, useContext, useReducer} from "react";
import { overViewCourseReducer } from "ipretty/reducers/OverviewCourseReducer";
import { ActionTypeOverviewLearn } from "ipretty/constants/Actions";

const dataCourseDefault = {
    course: {},
    teacher: {},
    dataLessonById: {},
    listChapterLesson: [],
    firstLesson : {}
}

export const OverviewCourseContext = createContext(null);


const OverviewCourseProvider = ({children}) => {
    const [ dataCourse, dispatch ] = useReducer(overViewCourseReducer , dataCourseDefault)

    const updateDataDetailCourse = (courseData) => dispatch({ type: ActionTypeOverviewLearn.GET_DATA_DETAIL_COURSE , payload: courseData })

    const getLessonById = (indexChapter) => dispatch({ type: ActionTypeOverviewLearn.GET_LESSON_BY_ID , payload: indexChapter })


    const contextData = {
        dataCourse,
        getLessonById,
        updateDataDetailCourse
    }


    return (
        <OverviewCourseContext.Provider value={contextData}>
            {children}
        </OverviewCourseContext.Provider>
    );
}

export const useOverviewLearn = () => useContext(OverviewCourseContext);

export default OverviewCourseProvider;