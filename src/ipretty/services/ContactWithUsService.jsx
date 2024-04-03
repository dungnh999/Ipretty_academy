import axios from 'ipretty/helpers/axios'
import { CONTACT_WITH_US } from './constances';
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

function createConntactWithUs(data, responseCb, errorCb) {
    const isformData = true
    return axios
        .post(CONTACT_WITH_US, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}
const ConntactWithUsService = {
    createConntactWithUs
};

export default ConntactWithUsService;