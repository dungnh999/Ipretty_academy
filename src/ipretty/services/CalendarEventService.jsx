import axios from 'ipretty/helpers/axios'
import { GET_LIST_EVENT , APPROVE_EVENT , CREATE_EVENTS , GET_LIST_ALL_EVENT , DELETE_EVENT} from './constances';
import { withQuery } from 'ipretty/helpers/withQuery'
import { getTokens } from "ipretty/helpers/utils";

function xAuthToken(formData = null, isJson = null) {
    let contentType = 'application/x-www-form-urlencoded'
    if (formData) {
        contentType = "multipart/form-data"
    }
    if (isJson) {
        contentType = "application/json"
    }
    if (getTokens().authToken) {
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

function getListEventInvited(responseCb, errorCb) {
    return axios
        .get(GET_LIST_EVENT, xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function approvedEventCheck (data , responseCb, errorCb) {
    const isformData = true
    axios
        .post(APPROVE_EVENT , data ,xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function createEvent (data , responseCb, errorCb) {
    const isformData = true
    axios
        .post( CREATE_EVENTS , data ,xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function getListAllEvents (responseCb, errorCb) {
    return axios
        .get(GET_LIST_ALL_EVENT, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function updateEvent(id, data, responseCb, errorCb) {
    const isformData = true
    axios
        .post( CREATE_EVENTS + `/${id}` , data ,xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function list () {
    return axios.get(GET_LIST_ALL_EVENT, xAuthToken())
}

function eventById(id) {
    return axios.get(CREATE_EVENTS + `/${id}`, xAuthToken())
}

function deleteEvent (id , responseCb, errorCb) {
    const isformData = true
    axios
        .post( DELETE_EVENT , id ,xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

const CalendarEventService = {
    getListEventInvited,
    getListAllEvents,
    approvedEventCheck,
    createEvent,
    list,
    updateEvent,
    eventById,
    deleteEvent
};

export default CalendarEventService;