import React, {Fragment, useEffect, useState} from 'react';
import Breadcrumbs from "ipretty/components/BreadCrumbs";
import {Typography, Button, Input, Flex, List, Segmented, Form, Select, Avatar, Image} from "antd"
import {numberFormat} from "ipretty/helpers/utils";
import PaymentService from "ipretty/services/PaymentService"
import { useHistory } from 'react-router-dom';
import {useSelector} from "react-redux";
import MethodsPayment from "ipretty/views/checkout/components/methodsPayment";


const {Title, Text} = Typography
const CheckoutView = (props) => {
    const history = useHistory();
    const [totalAmount, setTotalAmount] = useState(0);
    const { counter } = useSelector((state) => state);
    const data = [
        {
            title: 'Giá chưa giảm',
            value: 0
        },
        {
            title: 'Giảm giá',
            value: 0
        },
        {
            title: 'Mã giảm giá',
            value: 'Không áp dụng'
        },
    ];
    const [cartItem , setCartItem] = useState((JSON.parse(localStorage.getItem('cartItems'))) || [])
    const prefixSelector = (
        <Form.Item name="prefix" noStyle>
            <Select
                style={{
                    width: 80,
                }}
            >
                <Option value="84">+84</Option>
            </Select>
        </Form.Item>
    );

    const checkOut = () => {
        let data = new FormData()
        data.append('amount', totalAmount)
        PaymentService.sendPayment(data,
            res => {
                // Gọi hàm callback khi thanh toán hoàn tất
                const paymentCallback = () => {
                    console.log('Thanh toán hoàn tất');
                    // Thực hiện các hành động khác sau khi thanh toán hoàn tất
                };
                window.location.href = res.data.vnp_Url;
                paymentCallback();
            },
            err => {

            })
    }
    useEffect(() => {
        setTotalAmount(counter['cartItems'].reduce((acc, curr) => acc + curr.course_price, 0));
    })
    return (
        <Fragment>
            <div className='container pb-3' style={{marginTop: '20px'}}>
                {/*<Breadcrumbs />*/}
                <Flex>
                    <div style={{ width: '75%' , marginRight: '30px'}} >
                        <Title level={3}>Thanh Toán</Title>
                        {/*<Text strong>Điền thông tin dưới đây hoặc <Button style={{ padding: 0}} type='link'>đăng nhập</Button> nếu bạn đã có tài khoản</Text>*/}
                        {/*<Form*/}
                        {/*    layout="vertical"*/}
                        {/*    autoComplete="off"*/}
                        {/*    style={{ marginTop: '20px'}}*/}
                        {/*    wrapperCol={{ span: 12 }}*/}
                        {/*    size='large'*/}
                        {/*>*/}
                        {/*    <Form.Item*/}
                        {/*        name="name"*/}
                        {/*        label="Họ và tên"*/}
                        {/*        rules={[*/}
                        {/*            {*/}
                        {/*                required: true,*/}
                        {/*            },*/}
                        {/*        ]}*/}
                        {/*    >*/}
                        {/*        <Input*/}
                        {/*            placeholder="Nhập họ và tên"*/}
                        {/*        />*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item*/}
                        {/*        name="email"*/}
                        {/*        label="Email"*/}
                        {/*        rules={[*/}
                        {/*            {*/}
                        {/*                required: true,*/}
                        {/*            },*/}
                        {/*        ]}*/}
                        {/*    >*/}
                        {/*        <Input*/}
                        {/*            placeholder="Email"*/}
                        {/*        />*/}
                        {/*    </Form.Item>*/}
                        {/*    <Form.Item*/}
                        {/*        name="phone"*/}
                        {/*        label="Số điện thoại"*/}
                        {/*        rules={[*/}
                        {/*            {*/}
                        {/*                required: true,*/}
                        {/*                message: 'Please input your phone number!',*/}
                        {/*            },*/}
                        {/*        ]}*/}
                        {/*    >*/}
                        {/*        <Input*/}
                        {/*            addonBefore={prefixSelector}*/}
                        {/*            placeholder="Nhập số điện thoại"*/}
                        {/*            style={{*/}
                        {/*                width: '100%',*/}
                        {/*            }}*/}
                        {/*        />*/}
                        {/*    </Form.Item>*/}
                        {/*</Form>*/}

                        <Title level={5}>Đơn hàng của bạn</Title>
                        <List
                            itemLayout="horizontal"
                            dataSource={cartItem}
                            pagination={{
                                onChange: (page) => {
                                    console.log(page);
                                },
                                pageSize: 4,
                                align: 'center'
                            }}
                            renderItem={(item, index) => (
                                <List.Item
                                    key={index}
                                    extra={
                                        <Flex vertical align="end">
                                            <Title level={5}>{ numberFormat(item.course_price) }</Title>
                                            <Text delete>{ numberFormat(item.course_sale_price)}</Text>
                                        </Flex>
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Image preview={false} src={item.course_feature_image} style={{ borderRadius: '9px', objectFit: 'cover'}} width={200} height={100}/>
                                        }
                                        title={<Title level={5} style={{ margin: 0}}>{item.course_name}</Title>}
                                        description={
                                            <Text>Giảng viên: { item.teacher_name } </Text>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                        <MethodsPayment/>
                    </div>
                    <div style={{ width: '25%'}} >
                        <Flex vertical style={{  padding: '12px' , borderRadius: '16px', boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)' }}>
                            <Title style={{ margin: 0, color: '#004724'}} level={3}>Hoá đơn</Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={(item, index) => (
                                    <List.Item style={{ padding: '3% 5% 3% 0%' }}
                                               extra={
                                                   <Text>{item.value}</Text>
                                               }
                                    >
                                        <List.Item.Meta
                                            title={<div>{item.title}</div> }
                                        />
                                    </List.Item>
                                )}
                            />
                            <Flex justify='space-between' align='center'>
                                <Title level={5}>Tổng cộng </Title>
                                <Title style={{ margin: 0 }} level={4}>{numberFormat(totalAmount)}</Title>
                            </Flex>
                            <Button onClick={() => checkOut()} size='large' style={{background: '#004724', border: 0, color: '#fff',}}>Thanh Toán</Button>
                        </Flex>
                    </div>
                </Flex>
            </div>
        </Fragment>
    )
};

export default CheckoutView;