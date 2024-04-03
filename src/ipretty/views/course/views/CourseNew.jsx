import React, { useEffect, useMemo, useState } from 'react' 
import CourseForm from '../components/CourseForm'
import { useAuth } from 'ipretty/context/AppProvider'
import { parseParams } from 'ipretty/helpers/contextHelper'
import { useLocation } from 'react-router-dom'

function CourseNew() {
    const { getTranslation , user } = useAuth()
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseManagement'), path: '/courses' }
    ], [])
    const linkFlowTeacher = useMemo(() => [
        { title: getTranslation('CourseManagement'), path: '/courses' }
    ], [])

    let location = useLocation()
    const titlePage = getTranslation('CreateNewCourse')
    const [course, setCourse] = useState({})
    const paramsQuery = useMemo(() => parseParams(location.search), [location])
    const dataLesson = paramsQuery && Object.keys(paramsQuery).length > 0 && paramsQuery.lesson ? JSON.parse(paramsQuery.lesson) : ''
    const dataSurvey = paramsQuery && Object.keys(paramsQuery).length > 0 && paramsQuery.survey ? JSON.parse(paramsQuery.survey) : ''

    useEffect(() => {
        if(localStorage.getItem('course')) {
            const course = JSON.parse(localStorage.getItem('course'))
            if (dataLesson && Object.keys(dataLesson).length > 0) {
                if (dataLesson.index_lesson || dataLesson.index_lesson == 0) {
                    const lessons = course.chapters[dataLesson.index_chapter].lessons
                    lessons.splice(dataLesson.index_lesson, 1, dataLesson)
                    lessons.map((lesson, index) => {
                        lesson.number_order = index
                        return lesson
                    })
                } else {
                    const lessons = course.chapters[dataLesson.index_chapter].lessons
                    const isExits = lessons.findIndex(item => item.lesson_id === dataLesson.lesson_id)
                    if (isExits != 1) {
                        lessons.push(dataLesson)
                    }
                    lessons.map((lesson, index) => {
                        lesson.number_order = index
                        return lesson
                    })
                }
            } else if ( dataSurvey && Object.keys(dataSurvey).length > 0 ) {
                const surveyChapter = course.chapters[dataSurvey.index_chapter]
                surveyChapter.survey = dataSurvey
                surveyChapter.delete_survey_id = ''
                
            }
            setCourse(course)
        }
    }, [])

    return(
        <CourseForm 
            isCreate={true}
            links={user.role === 'admin' ? links : linkFlowTeacher}
            titlePage={titlePage}
            dataCourse={course}
        />
    )
}   

export default CourseNew
