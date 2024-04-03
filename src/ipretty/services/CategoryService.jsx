import axios from 'ipretty/helpers/axios'
import {LIST_CATEGORY_COURSE, CREATE_CATEGORY_COURSE} from './constances';
import {withQuery} from 'ipretty/helpers/withQuery';
import {getTokens} from 'ipretty/helpers/utils';

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

function getListCategory(params, responseCb, errorCb) {
    axios
        .get(withQuery(LIST_CATEGORY_COURSE, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function createCategory(data, responseCb, errorCb) {
    const isformData = true
    return axios
        .post(CREATE_CATEGORY_COURSE, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)

}

function getDetailCategory(id, responseCb, errorCb) {
    axios
        .get(LIST_CATEGORY_COURSE + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function editCategory(id, data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(LIST_CATEGORY_COURSE + `/${id}`, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}


const CategoryService = {
    getListCategory, createCategory, getDetailCategory, editCategory
};

export default CategoryService;