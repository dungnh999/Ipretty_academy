import React, { useMemo } from 'react' 
import LessonForm from '../components/LessonForm'
import { useAuth } from 'ipretty/context/AppProvider'
import { parseParams } from 'ipretty/helpers/contextHelper'
import { useLocation } from "react-router-dom"

const LessonAdd = React.memo((props) => {
    let location = useLocation()
    const paramsQuery = useMemo(() => parseParams(location.search), [location])
    let courseId = paramsQuery.course_id 
    const { getTranslation , user} = useAuth()
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation(courseId ? 'EditCourse' : 'CreateCourse'), action: true }
    ], [])
    const linkFlowTeacher = useMemo(() => [
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation(courseId ? 'EditCourse' : 'CreateCourse'), action: true }
    ], [])
    const titlePage = getTranslation('CreateLecture')

    return(
        <LessonForm 
            isCreate={true}
            links={user.role === 'admin' ? links : linkFlowTeacher}           
            indexChapter={paramsQuery.indexChapter}
            titlePage={titlePage}
            courseId={courseId}
        />
    )
})

export default LessonAdd