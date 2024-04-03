import React, { useMemo } from "react";
import HeaderView from "ipretty/views/learn/Components/Header";
import {Layout} from "antd";

const {Header, Content} = Layout

const LearnLayout = ({ children, isAdminPage }) => {
    return (
        <Layout>
            <Header>
                <HeaderView/>
            </Header>
            <Layout>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    );
}


export default LearnLayout;