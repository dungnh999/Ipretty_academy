import axios from 'ipretty/helpers/axios';
import { GET_SURVEY_URL, LEARNING_PROCESS, DETAIL_SURVEY_STUDENT, SEE_EXAM_DETAIL, UPLOAD_IMAGES } from './constances';
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

function create( data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_SURVEY_URL, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)

}

function detail(id, responseCb, errorCb) {
    axios
        .get(GET_SURVEY_URL + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function detailForUser(id, responseCb, errorCb) {
    axios
        .get(DETAIL_SURVEY_STUDENT + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function update(id, data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_SURVEY_URL + `/${id}`, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function getSurveyWorked( data, responseCb, errorCb ) {
    const isformData = true
    axios
        .post(LEARNING_PROCESS, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function seeExamDetail(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(SEE_EXAM_DETAIL, data, xAuthToken(isformData, null))
        .then(responseCb)
        .catch(errorCb)
}

function uploadFile(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(UPLOAD_IMAGES, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

const SurveyService = {
    create,
    detail,
    update,
    getSurveyWorked,
    detailForUser,
    seeExamDetail,
    uploadFile
};

export default SurveyService;