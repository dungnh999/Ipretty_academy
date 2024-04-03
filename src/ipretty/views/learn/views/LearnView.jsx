import React, {Fragment, useEffect, useState} from "react";
import { useOverviewLearn} from 'ipretty/context/OverviewCourseContext';
import MyCoursesService from "../../../services/MyCoursesService";
import {Row, Space, Tabs, Col, Card, Typography, Input, Button, Empty} from "antd";

import {MinusOutlined, PlayCircleFilled, PlusOutlined} from "@ant-design/icons";
import LessonList from "../Components/LessonList";
import PlayerView from "ipretty/views/learn/Components/PlayerView";
import useNavigator from "ipretty/hook/useNavigator";
import RatingCourse from "ipretty/views/detail-course/components/RatingCourse";
const {TabPane} = Tabs;
const {Title} = Typography;
const {TextArea} = Input;

const LearnView = (props) => {
    const { match } = props;
    const styleNone = { display: 'none'};
    const { updateDataDetailCourse, getLessonById , dataCourse} = useOverviewLearn();
    const { course_id } = match.params;
    const navigate = useNavigator();
    const urlParams = new URLSearchParams(window.location.search);
    const {dataLessonById, course} = dataCourse;
    const paramValue = urlParams.get('id');


    useEffect(() => {
        getDetailMyCourse(course_id);
    }, [course_id]);

    const getDetailMyCourse = (idCourse) => {
        MyCoursesService.getDetailCourseNew(idCourse,
            (responses) => handleSuccess(responses), (errors) => handleError(errors))
    };

    const handleSuccess = (responses) => {
        if(responses && responses.data && responses.data.data) {
            const courseData = responses.data.data;
            updateDataDetailCourse(courseData)
            getLessonById( courseData['step_learning'].lesson_id);
        }
    };

    const handleError = (response) => {

    }
    return (
        <Fragment>
            <a href="javascrip:void(0)" className="open-lesson-menu" title="Mở rộng bài học"
               style={styleNone}>
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </a>
            <PlayerView/>
            <div className='content_lession'>
                <Tabs defaultActiveKey="1"  style={{ padding: '0 12px'}}>
                    <TabPane tab="Tổng quan" key="1">
                        { course.description}
                    </TabPane>
                    <TabPane tab="Tài liệu" key="3">
                        <Empty></Empty>
                    </TabPane>
                    <TabPane tab="Đánh giá" key="4">
                        <div className='container'>
                            <RatingCourse/>
                        </div>
                    </TabPane>
                    <TabPane tab="Quản lý học tập" key="5">
                        Tab 5 Content
                    </TabPane>
                </Tabs>
            </div>
        </Fragment>
    )
}



export default LearnView;