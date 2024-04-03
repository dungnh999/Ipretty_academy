
import React, { useEffect, useMemo, useState } from 'react'
import SurveyForm from '../components/SurveyForm'
import { useAuth } from 'ipretty/context/AppProvider'
import SurveyService from 'ipretty/services/SurveyService'
import { parseParams } from 'ipretty/helpers/contextHelper'
import { useLocation } from "react-router-dom"

const SurveyEdit = React.memo((props) => {
    const { getTranslation } = useAuth()
    let location = useLocation()
    const paramsQuery = useMemo(() => parseParams(location.search), [location])
    let courseId = paramsQuery.course_id 
    const surveyId = props.match.params.id
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('CourseManagement'), path: '/courses' },
        { title: getTranslation(courseId ? 'EditCourse' : 'CreateCourse'), action: true }
    ];
    const [surveys, setSurveys] = useState()
    const [loading, setLoading] = useState(false)
    const titlePage = getTranslation('EditSurvey')

    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    setLoading(true)
                    getDetailSurvey(surveyId)
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

    const getDetailSurvey = (id) => {
        SurveyService.detail(
            id,
            res => {
                let surveys = res.data.data
                setSurveys(surveys)
                setLoading(false)
            },
            err => {
                console.log(err)
            }
        )
    }


    return (
        <SurveyForm
            isEdit={true}
            links={links}
            surveys={surveys}
            loading={loading}
            titlePage={titlePage}
            indexChapter={paramsQuery.indexChapter}
            surveyId={surveyId}
            courseId={courseId}
        />
    )
})

export default SurveyEdit