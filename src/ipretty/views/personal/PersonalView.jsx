import React , {Fragment}from 'react';
import Breadcrumbs from "ipretty/components/BreadCrumbs";
import {Row, Col, Card, Avatar, Typography, Form, Input, Space, Button, Flex} from "antd";
import { AntDesignOutlined } from '@ant-design/icons';


const {Title} = Typography;
const PersonalView = (props) => {
    return (
        <Fragment>
            <Breadcrumbs/>
            <Row>
                <Col span={8} style={{ paddingLeft: '15px', paddingRight: '15px'}}>
                    <Card
                        bordered={false}
                        style={{
                            padding: '50px 60px'
                            , height: '100%'
                        }}
                    >
                       <Row>
                           <Col span={24} style={{ display: "flex" , flexDirection: 'column' , justifyContent: 'center' , alignItems: 'center'}}>
                               <Avatar
                                   size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 100, xxl: 120 }}
                                   icon={<AntDesignOutlined />}
                               />
                               <Title level={3}>....</Title>
                           </Col>
                       </Row>
                    </Card>
                </Col>
                <Col span={16} style={{ paddingLeft: '15px', paddingRight: '15px'}}>
                    <Card
                        bordered={false}
                        style={{
                            height: '100%'
                        }}
                    >
                        <Title level={3}>Thông tin</Title>
                        <Form
                            name="validateOnly"
                            layout="vertical"
                            autoComplete="off"
                            size='large'
                        >
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="phone" label="Số diện thoại" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item name="email" label="Email" rr>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="phone" label="Số diện thoại" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                            <Row gutter={12}>
                                <Col span={12}>
                                    <Form.Item name="name" label="Họ và tên" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Form.Item name="phone" label="Số diện thoại" rules={[{ required: true }]}>
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
        </Fragment>
    )
};

export default PersonalView;