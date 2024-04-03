import React, { Fragment } from 'react';
import { useAuth } from 'ipretty/context/AppProvider';
import { useLessonSurvey } from 'ipretty/context/lesson-survey-student/LessonSurveyStudentContext';

import {Card, Col, Flex, Avatar, Progress, Rate, Row, List, Typography} from 'antd'

const {Text, Title} = Typography;
function RatingCourse(props) {
    const { getTranslation } = useAuth();
    const { dataCourse, updateRatingAvgForCourse } = useLessonSurvey();
    const { courseInfo } = dataCourse;
    const { course_id } = courseInfo;
    const [star, setStar] = React.useState(0);
    const [error, setError] = React.useState("");
    const [comment, setComment] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [isDisabled, setIsDisabled] = React.useState(false)
    console.log(courseInfo);
    React.useEffect(() => {
        if (courseInfo.comment) {
            setComment(courseInfo.comment);
        }
        if (courseInfo.rating) {
            setStar(courseInfo.rating);
            setIsDisabled(true)
        }

    }, [courseInfo])

    const data = [
        {
            title: 'Ant Design Title 1',
        },
        {
            title: 'Ant Design Title 2',
        },
        {
            title: 'Ant Design Title 3',
        },
        {
            title: 'Ant Design Title 4',
        },
    ];


    return(
        <Fragment>
            <div style={{marginBottom: '20px'}}>
                <Title level={4} ellipsis={true}>Đánh giá</Title>
                <Card>
                    <Row align='middle'>
                        <Col span={4}>
                            <Flex vertical align="center" justify='center'>
                                <Text style={{fontSize:'70px', fontWeight: 900}}>4.4</Text>
                                <Rate
                                    disabled
                                    defaultValue={4.5}
                                    style={{
                                        color: '#b4690e'
                                    }}
                                />
                            </Flex>
                        </Col>
                        <Col span={20}>
                            <Progress
                                percent={30}
                                size={['90%',15]}
                                strokeColor='#003a33'
                                format={(number) => <Rate
                                                                        style={{
                                                                            color: '#b4690e'
                                                                        }}
                                                                        disabled
                                                                        defaultValue={5}/>}
                            />
                            <Progress
                                percent={30}
                                size={['90%',15]}
                                strokeColor='#003a33'
                                format={(number) => <Rate
                                    style={{
                                        color: '#b4690e'
                                    }}
                                    disabled
                                    defaultValue={4}/>}
                            />
                            <Progress
                                percent={30}
                                size={['90%',15]}
                                strokeColor='#003a33'
                                format={(number) => <Rate
                                    style={{
                                        color: '#b4690e'
                                    }}
                                    disabled
                                    defaultValue={3}/>}
                            />
                            <Progress
                                percent={30}
                                size={['90%',15]}
                                strokeColor='#003a33'
                                format={(number) => <Rate
                                    style={{
                                        color: '#b4690e'
                                    }}
                                    disabled
                                    defaultValue={2}/>}
                            />
                            <Progress
                                percent={30}
                                size={['90%',15]}
                                strokeColor='#003a33'
                                format={(number) => <Rate
                                    style={{
                                        color: '#b4690e'
                                    }}
                                    disabled
                                    defaultValue={1}/>}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
            <div style={{marginBottom: '20px'}}>
                <Title level={4} ellipsis={true}>Nhận xét của học viên</Title>
                <Card>
                    <List
                        itemLayout="horizontal"
                        dataSource={data}
                        renderItem={(item, index) => (
                            <List.Item>
                                <List.Item.Meta
                                    avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                    title={
                                        <Flex gap={20}>
                                            <Text strong>{item.title}</Text>
                                            <Rate
                                                disabled
                                                defaultValue={4.5}
                                                style={{
                                                    color: '#b4690e'
                                                }}
                                            />
                                        </Flex>
                                    }
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team Ant Design, a design language for background applications, is refined by Ant UED Team Ant Design, a design language for background applications, is refined by Ant UED Team Ant Design, a design language for background applications, is refined by Ant UED Team Ant Design, a design language for background applications, is refined by Ant UED Team Ant Design, a design language for background applications, is refined by Ant UED Team Ant Design, a design language for background applications, is refined by Ant UED Team "
                                />
                            </List.Item>
                        )}
                    />
                </Card>
            </div>
        </Fragment>

    )
}

export default RatingCourse;