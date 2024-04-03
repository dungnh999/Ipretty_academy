import axios from 'ipretty/helpers/axios';
import { GET_LESSON_URL, DELETE_LESSONS_URL, UPDATE_PROCESS_LESSON } from './constances';
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

function getListLesson(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_LESSON_URL, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function create( data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_LESSON_URL, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)

}

function getDetailLesson(id, responseCb, errorCb) {
    axios
        .get(GET_LESSON_URL + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function deleteAttachment(id, data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_LESSON_URL + `/${id}/media`, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function update(id, data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_LESSON_URL + `/${id}`, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function deleteLessons(data) {
    const isformData = true
    return axios.post(DELETE_LESSONS_URL, data, xAuthToken(isformData))
}

function updateProcessLesson(data, responseCb, errorCb) {
    axios
        .post(UPDATE_PROCESS_LESSON, data, xAuthToken(true))
        .then(responseCb)
        .catch(errorCb)
}

const LessonService = {
    getListLesson,
    create,
    deleteLessons,
    getDetailLesson,
    deleteAttachment,
    update,
    updateProcessLesson
};

export default LessonService;