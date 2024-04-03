import React, {useState, useEffect} from "react";
import {Redirect, useHistory, withRouter} from "react-router-dom";
import AuthService from "ipretty/services/AuthService";
import {GoogleOAuthProvider} from '@react-oauth/google'

import {
    LockOutlined,
    UserOutlined,
    FacebookOutlined,
} from '@ant-design/icons';

import {
    LoginFormPage,
    ProConfigProvider,
    ProFormCheckbox,
    ProFormText,
} from '@ant-design/pro-components';
import {Typography, Divider, Space, theme, Image} from 'antd';
import logoSrc from "public/logo/Logo-header.svg";
import {useAuth} from "ipretty/context/AppProvider";
import GoogleButtonLogin from "ipretty/views/auth/components/GoogleButtonLogin";

const {Text} = Typography;
const clientId = '122649272423-lfd9hbj3s7bbqsv05ke76fsgsitape8o.apps.googleusercontent.com';

const iconStyles = {
    color: 'rgba(0, 0, 0, 0.2)',
    fontSize: '18px',
    verticalAlign: 'middle',
    cursor: 'pointer',
};


function AuthTemplate(props) {
    const { login, getTranslation } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {token} = theme.useToken();
    const [errors, setErrors] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isAdminPage, setIsAdminPage] = useState(false);
    const [isErrors , setIsErrors] = useState(false);

    function loginClick() {
        setIsLoading(true);
        setErrors(null);
        AuthService.login(
            email,
            password,
            isAdminPage,
            onLoginSuccess,
            onLoginError
        );
    }


    function onLoginSuccess(res) {
        setIsLoading(false);
        setIsErrors(false);
        const data = res.data.data;
        login(data);
    }
    function onLoginError(err) {
        setIsLoading(false);
        setIsErrors(true);
        if (err.response.data) {
            console.log(err.response.data)
            if (err.response.data.errors) {
                setErrors(err.response.data.errors);
            } else {
                setErrors(err.response.data.message);
            }
        }
        return;
    }

    return (
        <ProConfigProvider dark>
            <div
                style={{
                    backgroundColor: 'white',
                    height: '100vh',
                }}
            >
                <LoginFormPage
                    backgroundImageUrl="https://mdn.alipayobjects.com/huamei_gcee1x/afts/img/A*y0ZTS6WLwvgAAAAAAAAAAAAADml6AQ/fmt.webp"
                    backgroundVideoUrl="https://gw.alipayobjects.com/v/huamei_gcee1x/afts/video/jXRBRK_VAwoAAAAAAAAAAAAAK4eUAQBr"
                    containerStyle={{
                        backgroundColor: 'rgba(0, 0, 0,0.65)',
                        backdropFilter: 'blur(4px)',
                    }}
                    submitter={{ searchConfig: { submitText: "Đăng nhập" } }}
                    title={<Image preview={false} src={logoSrc} width={150}/>}
                    onFinish={loginClick}
                    actions={
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                            }}
                        >
                            <Divider plain>
                            <span
                              style={{
                                  color:'#fff',
                                  fontWeight: 'normal',
                                  fontSize: 14,
                              }}
                            >
                                Đăng nhập khác
                            </span>
                            </Divider>
                            <Space align="center" size={24}>
                                <GoogleOAuthProvider clientId={clientId}>
                                    <GoogleButtonLogin/>
                                </GoogleOAuthProvider>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'column',
                                        height: 40,
                                        width: 40,
                                        border: '1px solid ' + token.colorPrimaryBorder,
                                        borderRadius: '50%',
                                    }}
                                >
                                    <FacebookOutlined style={{...iconStyles, color: '#1890ff'}}/>
                                </div>
                            </Space>
                        </div>
                    }
                >
                    <div style={{ marginTop: '50px'}}>
                        <ProFormText
                            name="username"
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <UserOutlined
                                        style={{
                                            color: '#fff',
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                                style: {
                                    borderColor: 'red'
                                }
                            }}
                            placeholder={'Tên đăng nhập'}
                            extra={<Text type="danger"></Text>}
                            onChange={(e) => setEmail(e.target.value)}
                            rules={[
                                { required: true, message: 'Không được để trống' },
                                {
                                    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: 'Email không hợp lệ',
                                },
                            ]}
                        />
                            <ProFormText.Password
                            name="password"
                            fieldProps={{
                                size: 'large',
                                prefix: (
                                    <LockOutlined
                                        style={{
                                            color: '#fff',
                                        }}
                                        className={'prefixIcon'}
                                    />
                                ),
                            }}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={'Mật khẩu'}
                            extra={<Text type="danger"></Text>}
                            rules={[
                                {
                                    required: true,
                                    message: 'Không được để trống',
                                },
                            ]}
                        />
                    </div>
                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            Ghi nhớ đăng nhập
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                           Đăng ký
                        </a>
                    </div>
                </LoginFormPage>
            </div>
        </ProConfigProvider>
    );
};

export default withRouter(AuthTemplate);
