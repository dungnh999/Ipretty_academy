import React, { useState, useEffect } from 'react';
import {CircularProgressbar} from "react-circular-progressbar";
import useNavigator from "../../../hook/useNavigator";
import {useLessonSurvey} from "../../../context/lesson-survey-student/LessonSurveyStudentContext";
import {Row , Col , Progress, Button} from 'antd'
import CourseService from "ipretty/services/CourseService";
const BannerLearn = () => {
    const styleJoin = { background:'#f26c4f' ,color:'white' , fontWeight:'bold' , border:'1px solid #f26c4f'}
    const styleOverview = { 'marginTop': '30px', display: 'flex' , 'justifyContent': 'space-between'}
    const styleMargin = {'marginBottom': '8px'}
    const {dataCourse} = useLessonSurvey()
    const {courseInfo} = dataCourse;
    const navigate = useNavigator();

    function checkIsJoinCourse(course_id, callback) {
        CourseService.checkJoinCourse(course_id, (responses) => callback(responses), (errors) => handleError(errors))
    }


    const  joinLearn = () => {
        checkIsJoinCourse(
            courseInfo['course_id'],
            () => {
                navigate(`/learning/${courseInfo['course_id']}`);
            }
        )
    }

    return (
        <div className="u-course-highlight2">
            <div className="container">
                <Row gutter={16}>
                    <Col span={12}>
                        <div className="ubo-left">
                            <img className="img-responsive"
                                 src={courseInfo['course_feature_image']} alt=""
                                 loading="lazy" />
                        </div>
                    </Col>
                    <Col span={12}>
                        <div className="ubo-right">
                            <div className="ubo-right-title">
                                {courseInfo['name']}
                            </div>
                            <div className="ubo-right-prog mt-0">
                                <p>Bạn hoàn thành <b>{ courseInfo['number_learning'] }</b> trong <b>{courseInfo['number_course_lesson']}</b> bài giảng</p>
                                <Progress percent={courseInfo['percent_done']}  showInfo={false} trailColor='#fff'/>
                            </div>
                            <div className="overview-btn" style={styleOverview} >
                                <div className="" style={styleMargin}>
                                    <Button style={styleJoin} onClick={joinLearn}>
                                        Vào học ngay
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default BannerLearn