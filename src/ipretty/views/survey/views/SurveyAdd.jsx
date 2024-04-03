import React, { useMemo } from 'react'
import SurveyForm from '../components/SurveyForm'
import { useAuth } from 'ipretty/context/AppProvider'
import { parseParams } from 'ipretty/helpers/contextHelper'
import { useLocation } from "react-router-dom"

const SurveyAdd = React.memo((props) => {
    const { getTranslation , user} = useAuth()
    let location = useLocation()
    const paramsQuery = useMemo(() => parseParams(location.search), [location])
    let courseId = paramsQuery.course_id 
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation(courseId ? 'EditCourse' : 'CreateCourse'), action: true }
    ]
    const linkFlowTeacher = [
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation(courseId ? 'EditCourse' : 'CreateCourse'), action: true }
    ]
    const titlePage = getTranslation('CreateSurvey')

    return (
        <SurveyForm
            isCreate={true}
            links={user.role === 'admin' ? links : linkFlowTeacher}           
            titlePage={titlePage}
            indexChapter={paramsQuery.indexChapter}
            courseId={courseId}
        />
    )
})

export default SurveyAdd