import axios from 'ipretty/helpers/axios'
import { GET_LIST_TRANSACTIONS , CHECK_APPROVE_TRANSACTIONS, GET_LIST_TRANSACTIONS_OF_USER} from './constances';
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

function getAllTransaction(params , responseCb, errorCb) {
    return axios
        .get(withQuery(GET_LIST_TRANSACTIONS , params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function getDetailTransaction(id , responseCb, errorCb) {
    axios
        .get(GET_LIST_TRANSACTIONS + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function approveTransaction(id , data ,responseCb, errorCb) {
    const isformData = true
    axios
        .post(CHECK_APPROVE_TRANSACTIONS + `/${id}`, data ,xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}


function getTransactionHistoryOfAUser(params , responseCb, errorCb) {
    return axios
        .get(withQuery(GET_LIST_TRANSACTIONS_OF_USER , params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

const TransactionService = {
    getAllTransaction,
    getDetailTransaction,
    approveTransaction,
    getTransactionHistoryOfAUser
};

export default TransactionService;