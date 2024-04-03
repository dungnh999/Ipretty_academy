import React, {useEffect, useState} from "react";
import { useAuth } from 'ipretty/context/AppProvider';
import useNavigator from 'ipretty/hook/useNavigator';
import { useLocation } from 'react-router-dom';
import logoSrcBlack from 'public/logo/logo-header-black.svg';
import {Button, Layout, Typography, FloatButton, Input, Image, Flex, Space, Dropdown, Badge} from 'antd';
import AvatarHeader from "ipretty/core/MainLayout/AvatarHeader";
import {ROUTES} from "../../constants/Routers";
import CartLayout from "ipretty/core/MainLayout/CartLayout";
import Notification from "ipretty/core/MainLayout/Notification"
import { Provider } from 'react-redux';
import store from 'ipretty/redux/store'
import Footer from 'rc-footer';
import 'rc-footer/assets/index.css'
import { Popover, Menu, Cascader } from 'antd';
import {
    AppstoreOutlined,
    UnorderedListOutlined,
    SettingOutlined,
    UserOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import MenuCategory from "ipretty/core/MainLayout/MenuCategory";

const { Header, Content } = Layout;
const {Title} = Typography;
const {Search} = Input;


function MainLayout({ children, isAdminPage }) {
    const { logout } = useAuth();
    const navigate = useNavigator();
    const location  = useLocation();

    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 72,
        paddingInline: '2.4rem',
        lineHeight: '64px',
        backgroundColor: '#fff',
        position: 'sticky',
        top: 0,
        zIndex: 3,
        width: '100%',
        boxShadow: '0 0 6px 3px rgba(0, 0, 0, 0.3)',
    };

    if (location.search && location.search.includes('logout')) {
        const redirect = location.pathname + location.search;
        logout(navigate, redirect);
    }   

    useEffect(() => {
        const handleInvalidToken = e => {
            if (e.key === 'authToken' && e.oldValue != e.newValue) {
                if (location.search && location.search.includes('logout')) {
                    const redirect = location.pathname + location.search;
                    logout(navigate, redirect);
                }else {
                    logout();
                }
            }
        }
        window.addEventListener('storage', handleInvalidToken)
        return function cleanup() {
            window.removeEventListener('storage', handleInvalidToken)
        }
    }, [localStorage.getItem('authToken')])

    const actionHome = () => {
        navigate(ROUTES.HOME);
    }
    const onClick = (e) => {
        console.log('click', e);
    };

    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };

    const items = [
        {
            label: '1st menu item',
            key: '1',
            icon: <UserOutlined />,
        },
        {
            label: '2nd menu item',
            key: '2',
            icon: <UserOutlined />,
        },
        {
            label: '3rd menu item',
            key: '3',
            icon: <UserOutlined />,
            danger: true,
        },
        {
            label: '4rd menu item',
            key: '4',
            icon: <UserOutlined />,
            danger: true,
            disabled: true,
        },
    ];

    return (
        <Provider store={store}>
            <Layout style={{ backgroundColor: '#fff' }}>
                <Header style={headerStyle}>
                    <Flex align='center' style={{height: '100%'}} justify="space-between">
                        <Button type={"link"} onClick={actionHome} style={{height: "auto"}}>
                            <Image preview={false}
                                   width={130}
                                   src={logoSrcBlack}
                            />
                        </Button>
                        <MenuCategory/>
                        <Input
                            placeholder="Tìm kiếm khoá học"
                            size="large"
                            prefix={<UserOutlined />}
                            variant="borderless"
                            style={{
                                width: '60%',
                                // margin: '0 1.8rem',
                                borderRadius: '42px',
                                lineHeight: '30px',
                            }}
                        />
                        {/*<Popover*/}
                        {/*    placement="bottomLeft"*/}
                        {/*    arrow={false}*/}
                        {/*    style={{*/}
                        {/*        marginTop: '10px',*/}
                        {/*        padding: 0*/}
                        {/*    }}*/}
                        {/*    content={*/}
                        {/*        'adhjsdhsjkhads'*/}
                        {/*    }*/}
                        {/*>*/}
                        {/*    <div style={{margin: '0px 1.2rem', height: '100%', display:'flex', alignItems:'center', cursor:'pointer'}}>*/}
                        {/*        <Title className="m-0" level={5}>*/}
                        {/*            Khoá học của tôi*/}
                        {/*        </Title>*/}
                        {/*    </div>*/}
                        {/*</Popover>*/}
                        <Dropdown
                            menu={{
                                items,
                            }}
                        >
                            <div style={{
                                display: 'flex',
                                justifyContent : 'center',
                                padding : '20px',
                                alignItems: 'center',
                                cursor: 'pointer',
                                height: '100%'
                            }}>
                                <Title className="m-0" level={5}>
                                    Khoá học của tôi
                                </Title>
                            </div>
                        </Dropdown>
                        <Notification/>
                        <CartLayout/>
                        <AvatarHeader/>
                    </Flex>
                </Header>
                <Content style={{backgroundColor: '#fff'}}>
                    {children}
                </Content>
                <Footer
                    maxColumnsPerRow={4}
                    style={{
                        backgroundColor: '#003a33'
                    }}
                    columns={[
                        {
                            title: <Image src='https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/image/logo/Logo-header.png' />,
                        },
                        {
                            title: 'Về chung tôi',
                            items: [
                                {
                                    title: 'Giới thiệu',
                                    url: 'https://pro.ant.design/',
                                    openExternal: true,
                                },
                                {
                                    title: 'Chính sách bảo mật',
                                    url: 'https://mobile.ant.design/',
                                    openExternal: true,
                                },
                                {
                                    title: 'Hướng dẫn thanh toán',
                                    url: 'https://kitchen.alipay.com/',
                                },
                                {
                                    title: 'Điều khoản dịch vụ',
                                    url: 'https://kitchen.alipay.com/',
                                },
                            ],
                        },
                        {
                            title: '帮助',
                            items: [
                                {
                                    title: 'Ant Design Pro',
                                    url: 'https://pro.ant.design/',
                                    openExternal: true,
                                },
                                {
                                    title: 'Ant Design Mobile',
                                    url: 'https://mobile.ant.design/',
                                    openExternal: true,
                                },
                                {
                                    title: 'Kitchen',
                                    url: 'https://kitchen.alipay.com/',
                                    description: 'Sketch 工具集',
                                },
                            ],
                        },
                        {
                            // icon: (
                            //     <img
                            //         src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/image/course/FXy2MKL2AuTpvGRJJoRe4vOwt7k71gzqrys685kd.png"
                            //         alt="more products"
                            //     />
                            // ),
                            title: 'Mạng xã hội',
                            items: [
                                {
                                    icon: (
                                        <img
                                            src="https://upload-dungnh-dev.s3.ap-southeast-1.amazonaws.com/public/image/course/A4CadjBH0oOvTNgwt32rplIhc3394zndJbSwNypc.png"
                                            alt="yuque"
                                        />
                                    ),
                                    title: 'Facebook',
                                    url: 'https://yuque.com',
                                    openExternal: true,
                                },
                            ],
                        },
                    ]}
                    bottom="© 2024 Mọi bản quyền thuộc sở hữu của iPretty Academy"
                />
                <FloatButton.Group shape="circle">
                    <FloatButton
                        href="https://ant.design/index-cn"
                        tooltip={<div>custom badge color</div>}
                        badge={{ count: 5, color: 'blue' }}
                    />
                    <FloatButton.BackTop/>
                </FloatButton.Group>
            </Layout>
        </Provider>
    );
}

export default MainLayout