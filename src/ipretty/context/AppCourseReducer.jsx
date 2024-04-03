import moment from 'moment'

export default (state, action) => {
    switch (action.type) {
        case 'CHANGE_VALUE_COURSE':
            const { indexCourseCVC } = action
            return {
                ...state,
                courses: state.courses.map((course, indexCourse) => {
                    if (indexCourseCVC == indexCourse) {
                        return {
                            ...course,
                            ...action.newValue
                        }
                    }
                })
            }
        case 'UPLOAD_BANNER':
            return {
                ...state,
                ...action.newValue
            }
        case 'CHANGE_VALUE_ITEM_COURSE_TARGET':
            const { indexCourseTargetCVICT, newValueCVICT } = action
            return {
                ...state,
                course_target: state.course_target.map((courseTarget, indexCourseTarget) => {
                    if (indexCourseTargetCVICT == indexCourseTarget) {
                        return {
                            ...courseTarget,
                            ...newValueCVICT
                        }
                    }
                    return courseTarget
                })
            }
        case 'REMOVE_ITEM_COURSE_TARGET':
            const { indexCourseTargetRICT } = action
            let newCoursesTarget = [...state.course_target]
            newCoursesTarget.splice(indexCourseTargetRICT, 1)
            return {
                ...state,
                course_target: newCoursesTarget
            }
        case 'CHANGE_STATUS_LESSON':
            const { newValueCSL } = action
            return {
                ...state,
                ...newValueCSL
            }
        case 'CHANGE_STATUS_SURVEY':
            const { newValueCSS } = action
            return {
                ...state,
                ...newValueCSS
            }
        case 'GET_INFO_COURSE':
            const dataCourse = action.payload

            return {
                ...state,
                courses: state.courses.map((course, indexCourseGIC) => {
                    return {
                        ...course,
                        category: dataCourse.category ? dataCourse.category : '',
                        category_id: dataCourse.category_id ? dataCourse.category_id : '',
                        course_description: dataCourse.course_description ? dataCourse.course_description : '',
                        course_id: dataCourse.course_id ? dataCourse.course_id : '',
                        course_name: dataCourse.course_name ? dataCourse.course_name : '',
                        course_price: dataCourse.course_price ? dataCourse.course_price : 0,
                        course_target: dataCourse.course_target ? dataCourse.course_target : '',
                        course_type: dataCourse.course_type ? dataCourse.course_type : '',
                        teacher_id: dataCourse.teacher_id ? dataCourse.teacher_id : '',
                        isDraft: dataCourse.isDraft || dataCourse.isDraft == 0 ? dataCourse.isDraft : '',
                        is_published: dataCourse.is_published || dataCourse.is_published == 0 ? dataCourse.is_published : '',
                        endTime: dataCourse.endTime ? moment(new Date(dataCourse.endTime)).format('YYYY-MM-DD HH:mm') : '',
                        startTime: dataCourse.startTime ? moment(new Date(dataCourse.startTime)).format('YYYY-MM-DD HH:mm') : '',
                    }
                })
            }
        case 'REMOVE_INFO_COURSE': 

            return {
                ...state,
                courses: state.courses.map((course, indexCourseGIC) => {
                    return {
                        ...course,
                        category: '',
                        category_id: '',
                        course_description: '',
                        course_id: '',
                        course_name: '',
                        course_price: '',
                        course_target: '',
                        course_type: '',
                        teacher_id: '',
                        teacher: '',
                        endTime:  '',
                        startTime:  '',
                    }
                })
            }
        case 'GET_ERROR_DATA_COURSE':
            const errorGEDC = action.payload

            return {
                ...state,
                error: errorGEDC
            }
        default:
            break;
    }
}