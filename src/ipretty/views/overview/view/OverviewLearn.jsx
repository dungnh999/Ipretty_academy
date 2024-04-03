import React, {useState, useEffect, useContext, Fragment} from 'react';
import {Tabs} from 'antd';

const {TabPane} = Tabs;
import BannerLearn from "ipretty/views/overview/components/BannerLearn";
import MyCoursesService from "ipretty/services/MyCoursesService";
import {useLessonSurvey} from 'ipretty/context/lesson-survey-student/LessonSurveyStudentContext'
import ContentLearn from "../components/ContentLearn";

const OverviewLearn = (props) => {
    const { match } = props;
    const { course_id } = match.params;
    const {dataCourse, updateDataDetailCourse} = useLessonSurvey()
    const {teacherInfo} = dataCourse;


    console.log(dataCourse);
    useEffect(() => {
        let mounted = true;
        const runAsync = async () => {
            try {
                if (mounted) {
                    getDetailMyCourse(course_id);
                }
            } catch (e) {
                if (mounted) {
                    throw e;
                }
            }
        };
        runAsync();
        return () => (mounted = false);
    }, []);


    const getDetailMyCourse = (idCourse) => {
        MyCoursesService.getDetailCourseNew(idCourse,
 (responses) => {
                updateDataDetailCourse(responses.data.data)
            }, (errors) => {
                console.log(errors)
            })
    };

    return (
        <Fragment>
            <BannerLearn/>
            <ContentLearn/>
        </Fragment>
    )
}

export default OverviewLearn