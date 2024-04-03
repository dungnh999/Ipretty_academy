
import React from 'react'
import CourseTarget from './CourseTarget'

const CoursesTarget = React.memo((props) => {
    const {
        coursesTarget,
        removeCourseTarget,
        changeValueCourseTarget,
        addItemCourseTarget,
    } = props

    return coursesTarget.map((courseTarget, indexCourseTarget) => (
        <React.Fragment key={indexCourseTarget}>
            <CourseTarget
                courseTarget={courseTarget}
                indexCourseTarget={indexCourseTarget}
                removeCourseTarget={removeCourseTarget}
                changeValueCourseTarget={changeValueCourseTarget}
                addItemCourseTarget={addItemCourseTarget}
                coursesTarget={coursesTarget}
            />
        </React.Fragment>
    ))
})

export default CoursesTarget