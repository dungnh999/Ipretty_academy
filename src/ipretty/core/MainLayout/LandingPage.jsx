import React , {Fragment }from 'react';
import {Layout} from "antd";
import 'ipretty/styles/landingPage/10therma/style.css'
import HeaderView from "ipretty/views/learn/Components/Header";
const LandingPage  = ({ children, isAdminPage }) => {
    return (
        <Fragment>
            {children}
        </Fragment>
    );
};

export default LandingPage;