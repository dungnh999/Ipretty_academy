import React, {useState} from 'react';
import {Card, Flex, Image, Space, Typography} from "antd";
import {useLessonSurvey} from "ipretty/context/lesson-survey-student/LessonSurveyStudentContext";

const {Title, Text} = Typography
const TeacherCourse = (props) => {
    const {updateDataDetailCourse, dataCourse } = useLessonSurvey();
    const { courseInfo } = dataCourse;
    return (
        <div style={{marginBottom: '40px'}}>
            <Title level={4} ellipsis={true}>Giảng viên</Title>
            <Card>
                <Flex gap={20}>
                    <Space>
                        <Image
                            width={200}
                            height={200}
                            src={courseInfo['teacher_avatar']}
                            style={{
                                borderRadius: '50%',
                                objectFit: 'contain'
                            }}
                            preview={false}
                        />
                    </Space>
                    <Flex vertical>
                        <Title level={2}>{ courseInfo['teacher_name']}</Title>
                        <Text>
                            {courseInfo['teacher_about']}
                        </Text>
                    </Flex>
                </Flex>
            </Card>
        </div>
    )
};

export default TeacherCourse;