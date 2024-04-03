export default (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM_COURSE_TARGET':
            const { indexCourseTargetAICT } = action
            let _stateInit = [...state.course_target]
            _stateInit.splice(indexCourseTargetAICT + 1, 0, { item_course_target: '' })
            return {
                ...state,
                course_target: [..._stateInit]
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
        case 'GET_VALUE_COURSE_TARGET':

            const course = action.payload

            let _courseTarget = course.course_target

            let courseTargets = []
            
            if (_courseTarget && _courseTarget.course_target.length) {

                for (let i = 0; i < _courseTarget.course_target.length; i++) {

                    let _course = _courseTarget.course_target[i]

                    let obj = {

                        'item_course_target': _course.value

                    }

                    courseTargets.push(obj)
                    
                }
            
            }else {
                let obj = {

                    'item_course_target': ""

                }

                courseTargets.push(obj)
            }

            return {
                ...state,
                course_target: courseTargets

            }
        case 'REMOVE_VALUE_COURSE_TARGET':
            const courseTargetsGVT = [
                {
                    item_course_target: ''
                }
            ]

            return {
                ...state,
                course_target: courseTargetsGVT

            }
        case 'GET_VALUE_COURSE_TARGET_IN_LOCALSTORAGE':
            const courseGVCTIL = action.payload

            return {
                ...state,
                course_target: courseGVCTIL
            }
        default:
            break;
    }
}

