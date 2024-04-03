
import React, { useEffect, useMemo, useState } from 'react'
import CourseForm from '../components/CourseForm';
import CourseService from 'ipretty/services/CourseService'
import { useAuth } from 'ipretty/context/AppProvider'
import { parseParams } from 'ipretty/helpers/contextHelper'
import { useLocation } from 'react-router-dom'

function CourseEdit(props) {
    const { getTranslation , user } = useAuth()
    const courseId = props.match.params.courseId
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation('CourseDetail'), path: `/courses/${courseId}/detail` }
    ]
    const linkFlowTeacher = [
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation('CourseDetail'), path: `/courses/${courseId}/detail` }
    ]
    let location = useLocation()
    const [course, setCourse] = useState()
    const [loading, setLoading] = useState(false)
    const titlePage = getTranslation('CourseDetail')
    const paramsQuery = useMemo(() => parseParams(location.search), [location])
    const dataLesson = paramsQuery && Object.keys(paramsQuery).length > 0 && paramsQuery.lesson ? JSON.parse(paramsQuery.lesson) : ''
    const dataSurvey = paramsQuery && Object.keys(paramsQuery).length > 0 && paramsQuery.survey ? JSON.parse(paramsQuery.survey) : ''
    const [isLocalStorage, setIsLocalStorage] = useState(false)
    
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    if (localStorage.getItem('course')) {
                        setIsLocalStorage(true)
                        getDataInLocalStorage()
                    } else {
                        getDetailCourses(courseId)
                    }
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, [])

    function getDataInLocalStorage() {
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
            // console.log(course, 'course')
            setCourse(course)
    }

    const getDetailCourses = (id) => {
        CourseService.detail(
            id,
            res => {
                let course = res.data.data
                setCourse(course)
                setLoading(false)
            },
            err => {
                console.log(err)
            }
        )
    }

    return (
        <CourseForm
            isEdit={true}
            links={user.role === 'admin' ? links : linkFlowTeacher}
            course={course}
            courseId={courseId}
            titlePage={titlePage}
            dataCourse={course}
             isLocalStorage={isLocalStorage}
        />
    )
}

export default CourseEdit