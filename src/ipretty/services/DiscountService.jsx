import axios from 'ipretty/helpers/axios'
import { GET_DISCOUNT_CODE , GET_CODE_RANDOM} from './constances';
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

function getAllDiscount(params , responseCb, errorCb) {
    return axios
        .get(withQuery(GET_DISCOUNT_CODE , params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function detailDiscount(id , responseCb, errorCb) {
    axios
        .get(GET_DISCOUNT_CODE + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getRandomCode (responseCb , errorCb) {
    return axios
        .get(GET_CODE_RANDOM , xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function createDiscount(data , responseCb, errorCb) {
    const isformData = true
    return axios
        .post(GET_DISCOUNT_CODE, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function updateDiscount(id, data ,responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_DISCOUNT_CODE + `/${id}`, data , xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

const DiscountService = {
    getAllDiscount,
    getRandomCode,
    createDiscount,
    detailDiscount,
    updateDiscount
};

export default DiscountService;