import React from 'react';
import {Card, Row, Col, Space, Typography} from "antd";
import Banner01 from 'public/news/banner_01.png'
import Banner02 from 'public/news/banner_02.png'

const {Meta} = Card;
const {Title} = Typography;
const Solutions = (props) => {
    return (
        <Space style={{display: 'block'}} >
            <Title level={3}>CÁC GIẢI PHÁP</Title>
            <Row gutter={16} style={{ marginBottom: '30px'}}>
                <Col span={12}>
                    <Card
                        style={{
                            boxShadow: '2px 2px 8px rgba(0, 0, 0, .07951'
                        }}
                        cover={
                            <img
                                alt="example"
                                src={Banner01}
                            />
                        }
                    >
                        <Meta
                            title="Edubit.vn - Ai cũng có thể dạy học online"
                            description="Edubit.vn - Ai cũng có thể dạy học online"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card
                        style={{
                            boxShadow: '2px 2px 8px rgba(0, 0, 0, .07951'
                        }}
                        cover={
                            <img
                                alt="example"
                                src={Banner02}
                            />
                        }
                    >
                        <Meta
                            title="Edubit.vn - Ai cũng có thể dạy học online"
                            description="Edubit.vn - Ai cũng có thể dạy học online"
                        />
                    </Card>
                </Col>
            </Row>
        </Space>
    )
};

export default Solutions;