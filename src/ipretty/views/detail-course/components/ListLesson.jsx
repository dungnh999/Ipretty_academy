import {useLessonSurvey} from "../../../context/lesson-survey-student/LessonSurveyStudentContext";
import {Collapse, List, Space, theme, Card, Flex, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {MinusOutlined, PlaySquareFilled, PlusOutlined} from "@ant-design/icons";
import contextHelper from "ipretty/helpers/contextHelper";
const {Text, Title } = Typography ;

export const ListLesson = () => {
    const {dataCourse} = useLessonSurvey();
    const {listChapterLesson} = dataCourse;
    const [collapse, setCollapse] = useState([]);

    const { token } = theme.useToken();
    const panelStyle = {
        background: '#dfdfdf',
        border: 'none',
    };


    useEffect(() => {
        listChapterLesson.forEach((item, key) => {
            setCollapse(prevCollapse => [
                ...prevCollapse,
                {
                    key: key,
                    label:  <Flex justify='space-between' align='center'>
                                <Title level={5} style={{ padding: '0', margin: '0'}}>{ item['chapter_name'] }</Title>
                                <Text type="secondary">{ item['lessons'].length } bài học</Text>
                            </Flex> ,
                    children: <List bordered={false}
                                    dataSource={item['lessons']}
                                    renderItem={(item, index) => (
                                        <List.Item style={{borderBottom: '1px solid rgba(0,0,0,.03)' , padding: '0 16px 0 48px',lineHeight: '48px'}}>
                                            <Flex justify='space-between' align='center' style={{width: '100%'}}>
                                                <Flex>
                                                    <PlaySquareFilled /> <span style={{paddingLeft: '6px'}}>{index }. {item['lesson_name']}</span>
                                                </Flex>
                                                <Text type="secondary">
                                                    {item.timer ? contextHelper.convertTommss(item.timer) : ""}
                                                </Text>
                                            </Flex>
                                        </List.Item>
                                     )}
                                />,
                    style: panelStyle,
                }
            ]);
        });
    }, [listChapterLesson]);

    return (
        <Space style={{ display: 'block'}} id='list-course'>
            <Collapse
                bordered={false}
                defaultActiveKey={['0']}
                expandIcon={({ isActive }) => isActive ? <MinusOutlined style={{ color : 'var(---backgroud-color-primary)' }} /> : <PlusOutlined style={{ color : 'var(---backgroud-color-primary)' }}/>}
                style={{
                    background: '#f5f5f5',
                    borderRadius: '12px',
                    overflow: 'hidden'
                }}
                items={collapse}
            />
        </Space>
    );
}