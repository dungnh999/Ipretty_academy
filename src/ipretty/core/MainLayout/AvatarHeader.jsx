import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList , faUser} from '@fortawesome/free-solid-svg-icons'
import { Dropdown, Space, Avatar, Button, Tooltip } from 'antd';
import { useHistory } from "react-router-dom";
import {useAuth, useTokenAuth} from "../../context/AppProvider";

const AvatarHeader = (props) => {
    const {user} = useAuth();
    const {isAuthenticated} = useTokenAuth();
    const history = useHistory();
    function handleClick() {
        history.push("/my-courses");
    }

    const items = [
        {
            label: <Button type="link" style={{ padding: 0}} onClick={handleClick}>Khoá học của tôi</Button>,
            key: '0',
            icon: <FontAwesomeIcon icon={faList}></FontAwesomeIcon>
        },
        {
            label: <a href="https://www.aliyun.com">Cập nhật hồ sơ</a>,
            key: '1',
            icon: <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
        },
        {
            type: 'divider',
        },
        {
            label: 'Đăng xuất',
            key: '3',
            icon: <FontAwesomeIcon />
        },
    ];
    return (
        (isAuthenticated) ?
            <Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']} arrow={{ pointAtCenter: true }} style={{
                margin: '0px 30px'
            }}>
                <Tooltip placement="bottom" title={user['name']}>
                    <Avatar
                        size={32}
                        style={{ cursor: 'pointer' }}
                        src={user['avatar']}
                        icon={
                            <FontAwesomeIcon
                                icon={faUser}>
                            </FontAwesomeIcon>}
                    />
                </Tooltip>
            </Dropdown> : <Button size='middle' type="primary" style={{
                margin: '0px 5px'
            }}>Đăng nhập</Button>

    )
};

export default AvatarHeader;