import React from 'react'
import NotificationForm from '../components/NotificationForm';
import { useAuth } from 'ipretty/context/AppProvider';

function NotificationDetail(props) {
    const { getTranslation } = useAuth();
    const notification_id = props.match.params.notification_id;
    const links = [
        { title: getTranslation('Home'), path: '/' },
        { title: getTranslation('manageNotificationContent'), path: '/notifications' }
    ]

    return (
        <React.Fragment>
            <NotificationForm
                isEdit={true}
                links={links}
                history={props.history}
                notification_id={notification_id}
            />
        </React.Fragment>
    )
}
export default NotificationDetail