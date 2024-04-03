import React from 'react';
import {GoogleOutlined} from "@ant-design/icons";
import {theme} from "antd";
import {GoogleLogin} from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const GoogleButtonLogin = (props) => {
    const {token} = theme.useToken();
    const onSuccess = (res) => {
        const decoded = jwtDecode(res.credential);
        console.log('Đăng nhập thành công',decoded)
    }

    const onError = (res) => {
        console.log('Đăng nhập thất bại',res)
    }

    return (
        <div>
            <GoogleLogin
                buttonText="Đăng nhập với Google"
                onSuccess={onSuccess}
                onFailure={onError}
                cookiePolicy={'single_host_origin'}
            />
        </div>

        // <div
        //     style={{
        //         display: 'flex',
        //         justifyContent: 'center',
        //         alignItems: 'center',
        //         flexDirection: 'column',
        //         height: 40,
        //         width: 40,
        //         border: '1px solid ' + token.colorPrimaryBorder,
        //         borderRadius: '50%',
        //     }}
        // >
        //     <GoogleOutlined
        //         style={{...iconStyles, color: '#FF6A10'}}
        //     />
        // </div>
    );
};

export default GoogleButtonLogin;