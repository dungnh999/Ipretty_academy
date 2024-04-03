import axios from 'ipretty/helpers/axios'
import { ANSWER_USER, REWORK_SURVEY } from "./constances";
import { getTokens } from 'ipretty/helpers/utils';
import { withQuery } from "ipretty/helpers/withQuery";

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

function submitSurvey(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(ANSWER_USER, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function reworkSurvey(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(REWORK_SURVEY, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

const AnswerService = {
    submitSurvey, 
    reworkSurvey
};

export default AnswerService;