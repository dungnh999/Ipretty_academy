import axios from 'axios'
import { LIST_NOTIFICATION, READ_NOTIFICATION, CHECK_NOTIFICATION } from './constances';
import { withQuery } from 'ipretty/helpers/withQuery';
import { getTokens } from 'ipretty/helpers/utils';

function xAuthToken(formData = null, isJson = null) {
    let contentType = 'application/x-www-form-urlencoded'
    if (formData) {
        contentType = "multipart/form-data"
    }
    if (isJson) {
        contentType = "application/json"
    }
    if (localStorage.getItem('authToken')) {
        const headers = {
            headers: {
                "Authorization": 'Bearer ' + getTokens().authToken,
                'Content-Type': contentType,
                'X-Requested-With': 'XMLHttpRequest'
            }
        }
        return headers;
    }
}

function getListNotification(responseCb, errorCb) {
    axios
        .get(withQuery(LIST_NOTIFICATION), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}
function readNotifications(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(READ_NOTIFICATION, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb);
}
function checkNotification(responseCb, errorCb) {
    axios
        .get(withQuery(CHECK_NOTIFICATION), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}


const NotificationService = {
    getListNotification, readNotifications, checkNotification
};

export default NotificationService;