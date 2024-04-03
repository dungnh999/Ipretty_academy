import React from 'react'
import NotificationForm from '../components/NotificationForm';
import { useAuth } from 'ipretty/context/AppProvider';

function NotificationAdd(props) {
    const { getTranslation } = useAuth()
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('manageNotificationContent'), path: '/notifications' }
    ]

    return (
        <React.Fragment>
            <NotificationForm
                isCreate={true}
                links={links}
                history={props.history}
            />
        </React.Fragment>
    )
}

export default NotificationAdd