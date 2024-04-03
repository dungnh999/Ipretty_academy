import React from 'react';
import { BellOutlined } from '@ant-design/icons';
import {Badge} from 'antd'

const Notification = (props) => {
    return (
        <Badge count={2} overflowCount={99}>
            <BellOutlined style={{ fontSize: 24 }}  />
        </Badge>
    );
}

export default Notification;