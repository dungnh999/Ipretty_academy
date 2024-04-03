import React, { useState, useEffect ,Fragment} from 'react';
import { useSelector} from "react-redux";
import Breadcrumbs from "ipretty/components/BreadCrumbs";
import {Flex, Typography, List, Space, Image, Button} from 'antd';
import {numberFormat} from "ipretty/helpers/utils";
import useNavigator from 'ipretty/hook/useNavigator';

// LOGO
import logoMomo from "public/logo/Pay/momo.png";
import logoNapas from "public/logo/Pay/napas.png";
import logoVisa from "public/logo/Pay/visa.png";
import PromotionStore from "ipretty/views/store/components/Promotion";


const { Title, Text } = Typography;
const CartLayoutView = (props) => {
    const [cartItem , setCartItem] = useState((JSON.parse(localStorage.getItem('cartItems'))) || [])
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
    ]
    const navigate = useNavigator();
    const checkOut = () => {
        navigate('/checkout')
    }

    useEffect(() => {
        setTotalAmount(counter['cartItems'].reduce((acc, curr) => acc + curr.course_price, 0));
    }, [counter]);

    return (
        <Fragment>
            <div className='container' style={{marginTop: '20px'}}>
                <Flex>
                    <div style={{ width: '70%' , marginRight: '30px'}} >
                        <Title style={{ marginBottom : 0 }} level={2}>Giỏ hàng</Title>
                        <Text>Bạn đang có { cartItem.length } sản phẩm trong giỏ hàng</Text>
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
                                            <Title level={4}>{ (item.course_price > 0) ?  numberFormat(item.course_price) : 0 }</Title>
                                            <Text delete>{ (item.course_sale_price > 0) ? numberFormat(item.course_sale_price) : 0}</Text>
                                        </Flex>
                                    }
                                >
                                    <List.Item.Meta
                                        avatar={
                                            <Image preview={false} src={item.course_feature_image} style={{ borderRadius: '9px', objectFit: 'cover'}} width={200} height={100}/>
                                        }
                                        title={<Title level={4} style={{ margin: 0}}>{item.course_name}</Title>}
                                        description={
                                            <Text>Giảng viên: { item.teacher_name } </Text>
                                        }
                                    />
                                </List.Item>
                            )}
                        />
                    </div>
                    <div style={{ width: '30%'}} >
                        <Flex vertical style={{  padding: '12px' , borderRadius: '16px', boxShadow: '0 2px 4px rgb(0 0 0 / 8%), 0 4px 12px rgb(0 0 0 / 8%)' }}>
                            <Title style={{ margin: 0, color: '#004724'}} level={3}>Hoá đơn</Title>
                            <List
                                itemLayout="horizontal"
                                dataSource={data}
                                renderItem={(item, index) => (
                                    <List.Item style={{ padding: '3% 5% 3% 0%' }}
                                               extra={
                                                   <Text>{ item.value }</Text>
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
                        <Flex align='center' justify='center' vertical style={{ marginTop: '10px'}}>
                            <Space>
                                <Text>Chúng tôi chấp nhận thanh toán bằng</Text>
                            </Space>
                            <Flex style={{ marginTop: '16px'}} justify='space-evenly'>
                                <Image preview={false} src={logoMomo}></Image>
                                <Image preview={false} src={logoNapas}></Image>
                                <Image preview={false} src={logoVisa}></Image>
                            </Flex>
                        </Flex>
                    </div>
                </Flex>
                <PromotionStore/>
            </div>
        </Fragment>
    )
};

export default CartLayoutView;