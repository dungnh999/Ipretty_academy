import React, {Fragment, useEffect, useState} from 'react';
import {List, Layout, Radio, Collapse, Row, Typography, Flex, Col, theme, Rate, Checkbox} from 'antd';
import CourseCategoriesService from "ipretty/services/CourseCategoriesService";
import SwiperCourseTemplate from "ipretty/views/template/swiperCourseTemplate";

const {Header} = Layout;
const {Title, Text} = Typography;
const CategoryView = (props) => {
    const {match} = props;
    const {slug_name} = match.params;
    const [dataPost, setDataPost] = useState([]);
    useEffect(() => {
        getCourseCategoryType(slug_name);
    }, [slug_name]);

    const getCourseCategoryType = (slug_name) => {
        CourseCategoriesService.getCourseCategoryType({
                slug_name: slug_name
            },
            (responses) => handleSuccess(responses), (errors) => handleError(errors))
    };

    const handleSuccess = (responses) => {
        if (responses && responses.data && responses.data.data) {
            const courseData = responses.data.data;
            setDataPost(courseData);
        }
    };

    const handleError = (errors) => {

    };

    const data = Array.from({
        length: 23,
    }).map((_, i) => ({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: `https://api.dicebear.com/7.x/miniavs/svg?seed=${i}`,
        description:
            'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
            'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
    }));

    const text = (
        <p
            style={{
                paddingLeft: 24,
            }}
        >
            A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found
            as a welcome guest in many households across the world.
        </p>
    );



    const items = (panelStyle) => [
        {
            key: '1',
            label: <Text strong>Đánh giá</Text>,
            children: <Flex vertical>
                            <Radio>
                                <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={4.5}
                                    style={{
                                        color: '#b4690e'
                                    }}
                                />
                            </Radio>
                            <Radio>
                                <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={4.0}
                                    style={{
                                        color: '#b4690e'
                                    }}
                                />
                            </Radio>
                            <Radio>
                                <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={3.5}
                                    style={{
                                        color: '#b4690e'
                                    }}
                                />
                            </Radio>
                            <Radio>
                                <Rate
                                    allowHalf
                                    disabled
                                    defaultValue={3.0}
                                    style={{
                                        color: '#b4690e'
                                    }}
                                />
                            </Radio>
                      </Flex>,
            style: panelStyle
        },
        {
            key: '2',
            label: 'Giá',
            children:  <Flex vertical>
                            <Checkbox> Trả phí </Checkbox>
                            <Checkbox> Miễn Phí </Checkbox>
                        </Flex>,
            style: panelStyle
        },
    ];
    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 15,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: 'none',
    };

    return (
        <Fragment>
            <div style={{width: '1340px', margin: '0 auto', marginTop: "20px"}}>
                <Title level={2}>
                    Danh mục 1
                </Title>
                <SwiperCourseTemplate title='Khoá học đã xem' data={dataPost}/>
                <Title level={2}>
                    Tất cả khoá học
                </Title>
                <Row>
                    <Col span={6}>
                        <Collapse
                            items={items(panelStyle)}
                            size='middle' bordered={false}
                            ghost
                            defaultActiveKey={['1']}
                        />
                    </Col>
                    <Col span={18}>
                        <List
                            itemLayout="vertical"
                            size="large"
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 12,
                            }}
                            dataSource={data}
                            footer={
                                <div>
                                    <b>ant design</b> footer part
                                </div>
                            }
                            renderItem={(item) => (
                                <List.Item
                                    key={item.title}
                                >
                                    <Flex gap={12}>
                                        <img
                                            width={272}
                                            alt="logo"
                                            src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                        />
                                        <List.Item.Meta
                                            title={<a href={item.href}>{item.title}</a>}
                                            description={item.description}
                                        />
                                    </Flex>
                                </List.Item>
                            )}
                        />
                    </Col>
                </Row>
            </div>
        </Fragment>
    )
};

export default CategoryView;