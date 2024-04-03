import axios from 'ipretty/helpers/axios'
import { REPORT_ERROR } from './constances';
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

function createReportError(data , responseCb, errorCb) {
    const isformData = true
    return axios
        .post( REPORT_ERROR , data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)

}


const ErrorService = {
    createReportError
};

export default ErrorService;