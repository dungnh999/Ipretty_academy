import React, { useEffect, useMemo, useState } from 'react'
import LessonForm from '../components/LessonForm'
import { useAuth } from 'ipretty/context/AppProvider'
import LessonService from 'ipretty/services/LessonService'
import { parseParams } from 'ipretty/helpers/contextHelper'
import { useLocation } from "react-router-dom"

const LessonEdit = React.memo((props) => {
    const { getTranslation } = useAuth()
    const lessonId = props.match.params.id
    let location = useLocation()
    const paramsQuery = useMemo(() => parseParams(location.search), [location])
    let courseId = paramsQuery.course_id 
    const links = useMemo(() => [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation(courseId ? 'EditCourse' : 'CreateCourse'), action: true }
    ], [])
    const titlePage = getTranslation('EditLesson')
    const [lesson, setLesson] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getDetailLesson(lessonId)
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

    const getDetailLesson = (id) => {
        LessonService.getDetailLesson(
            id,
            res => {
                let lesson = res.data.data
                lesson.lesson_attachment = lesson.lesson_attachments
                // lesson.main_attachment_name = lesson.main_attachment     
                setLesson(lesson)
                setLoading(false)
            },
            err => {
                console.log(err)
            }
        )
    }


    return (
        <LessonForm
            isEdit={true}
            links={links}
            lesson={lesson}
            loading={loading}
            courseId={courseId}
            titlePage={titlePage}
            indexChapter={paramsQuery.indexChapter}
            indexLesson={paramsQuery.indexLesson}
        />
    )
})

export default LessonEdit