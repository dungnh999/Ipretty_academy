import React, { useMemo } from "react";
import HeaderView from "ipretty/views/learn/Components/Header";
import {Layout, theme, Typography} from "antd";
import LessonList from "ipretty/views/learn/Components/LessonList";
const { useToken} = theme;
const {Header, Content, Sider} = Layout
const {Title} = Typography
const LearnLayout = ({ children, isAdminPage }) => {
    const { token} = useToken();
    const headerStyle = {
        textAlign: 'center',
        color: '#fff',
        height: 55,
        paddingInline: 0,
        backgroundColor: token.colorPrimary,
        zIndex: 3,
        width: '100%',
        boxShadow: '0 0 6px 3px rgba(0, 0, 0, 0.3)'
    };
    //
    // const layoutStyle = {
    //     borderRadius: 8,
    //     overflow: 'hidden',
    //     width: 'calc(50% - 8px)',
    //     maxWidth: 'calc(50% - 8px)',
    // };

    // const headerStyle = {
    //     textAlign: 'center',
    //     color: '#fff',
    //     height: 64,
    //     paddingInline: 48,
    //     lineHeight: '64px',
    //     backgroundColor: '#4096ff',
    // };
    const contentStyle = {
        color: '#fff',
        backgroundColor: '#fff',
    };
    const siderStyle = {
        color: '#fff',
        backgroundColor: '#fff',
        top: '56px',
        height: 'calc(100% - 56px)',
        position: 'fixed',
        right: 0,
        zIndex: 1,
    };
    // const layoutStyle = {
    //     overflow: 'hidden',
    //     width: '100%',
    //     maxWidth: '100%',
    // };

    return (
        // <Layout style={layoutStyle}>
        //     <Header style={headerStyle}>
        //         <HeaderView/>
        //     </Header>
        //     <Sider width="25%" style={SiderStyle}>
        //         Sider
        //     </Sider>
        //     <Content style={{backgroundColor: '#fff'}}>
        //         {children}
        //     </Content>
        // </Layout>

        <Layout>
            <Header style={headerStyle}>
                <HeaderView/>
            </Header>
            <Layout style={{width: '75%'}}>
                <Content style={contentStyle}>
                    {children}
                </Content>
                <Sider width="25%" style={siderStyle}>
                    <Title level={5} style={{ padding: '0.8rem 0.8rem 0.8rem 1.6rem', margin: '0', border: '1px solid #d1d7dc'}}>Nội Dụng Bài Học</Title>
                    <LessonList/>
                </Sider>
            </Layout>
        </Layout>
    );
}


export default LearnLayout;