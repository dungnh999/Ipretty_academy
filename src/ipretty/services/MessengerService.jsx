
import axios from 'axios';
import { GET_MESSENGER_URL, GET_LIST_USER_CHAT, GET_LIST_MESSENGER, GET_MESSENGER_RECEIVER_SEEN, GET_URL_USER_ONLINE, GET_URL_UNREAD_MESSAGE } from './constances';
import { withQuery } from 'ipretty/helpers/withQuery'
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

function sendMenssenger(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_MESSENGER_URL, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function postMessage(data) {
    const isformData = true
    return axios.post(GET_MESSENGER_URL, data, xAuthToken(isformData))
}

function getListUserChat(params, responseCb, errorCb){
    axios
        .get(withQuery(GET_LIST_USER_CHAT, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getListMessenger(userId, responseCb, errorCb) {
    axios
        .get(GET_LIST_MESSENGER + `/${userId}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function receiverSeen(id, responseCb, errorCb) {
    axios
        .post(GET_MESSENGER_RECEIVER_SEEN + `/receiver-seen/${id}`, null, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function userOnline(id, responseCb, errorCb) {
    axios
        .post(GET_URL_USER_ONLINE + `/user-online/${id}`, null, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function deleteMessage(id, responseCb, errorCb) {
    axios
        .delete(GET_LIST_MESSENGER + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function countUnreadMessage(responseCb, errorCb) {
    axios
        .get(GET_URL_UNREAD_MESSAGE, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

const MessengerService = {
    sendMenssenger,
    getListUserChat,
    postMessage,
    getListMessenger,
    receiverSeen,
    userOnline,
    deleteMessage,
    countUnreadMessage
}

export default MessengerService