import React from 'react';
import {Button, Flex, Space, Typography} from "antd";
import {useLessonSurvey} from "ipretty/context/lesson-survey-student/LessonSurveyStudentContext";
import {ListLesson} from "ipretty/views/detail-course/components/ListLesson";

const {Title, Text} = Typography;
const ContentsCourse = (props) => {
    const {dataCourse} = useLessonSurvey();
    const {courseInfo} = dataCourse;
    return (
        <div style={{marginBottom: '40px'}}>
            <Title level={4}>
                Nội dung khóa học
            </Title>
            <Flex justify='space-between'>
                <Space>
                    <Text>
                        <Text strong style={{marginRight: '8px'}}>{courseInfo['number_learning']}</Text>
                        chương
                        <Text strong style={{margin: '8px 8px'}}>{courseInfo['number_course_lesson']}</Text>
                        bài học
                    </Text>
                </Space>
                <Button type='link'>Mở rộng tất cả</Button>
            </Flex>
            <ListLesson/>
        </div>
    )
};

export default ContentsCourse;