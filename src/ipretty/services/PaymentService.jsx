import axios from "ipretty/helpers/axios";
import {withQuery} from "ipretty/helpers/withQuery";
import {POST_PAYMENT, UPDATE_PROFILE_URL} from "ipretty/services/constances";
import {getTokens} from "ipretty/helpers/utils";

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

 function sendPayment(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(POST_PAYMENT, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

const PaymentService = {
    sendPayment
}

export default PaymentService;