import axios from 'ipretty/helpers/axios'
import { LIST_PUSH_NOTIFICATION } from './constances';
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

function getListNotification(params, responseCb, errorCb) {
    axios
        .get(withQuery(LIST_PUSH_NOTIFICATION, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}
function createNotification(data, responseCb, errorCb) {
    const isformData = true
    return axios
        .post(LIST_PUSH_NOTIFICATION, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function editNotification(id, data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(LIST_PUSH_NOTIFICATION + `/${id}`, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function getDetailNotification(id, responseCb, errorCb) {
    axios
        .get(LIST_PUSH_NOTIFICATION + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

const PushNotificationService = {
    getListNotification, createNotification, editNotification, getDetailNotification
};

export default PushNotificationService;