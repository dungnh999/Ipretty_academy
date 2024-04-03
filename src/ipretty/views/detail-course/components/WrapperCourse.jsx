import React, {} from 'react';
import {useLessonSurvey} from "ipretty/context/lesson-survey-student/LessonSurveyStudentContext";
import {Card, Typography , List} from 'antd'
import {CheckOutlined} from "@ant-design/icons";

const {Text, Title} = Typography;
const WrapperCourse = () => {
    const {dataCourse} = useLessonSurvey();
    const {courseInfo} = dataCourse;
    return (
        <div style={{marginBottom: '40px'}}>
            <Card>
                <Title level={3}>Bạn học được gì</Title>
                <List
                    grid={{ gutter: 16, column: 2 }}
                    size="small"
                    dataSource={courseInfo['course_target']}
                    renderItem={(item) =>
                        <List.Item style={{lineHeight: '1.6',  marginBottom: '18px', fontSize: "1.4rem", padding: '0'}}>
                            <CheckOutlined twoToneColor="#ff4d4f" style={{ fontSize: '14px' ,color: 'var(---backgroud-color-primary)'}} />
                            <Text style={{marginLeft: '8px'}}>{ item.value }    </Text>
                        </List.Item>}
                />
            </Card>
        </div>
    )
}


export default WrapperCourse;