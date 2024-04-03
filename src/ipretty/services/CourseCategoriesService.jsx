import axios from 'ipretty/helpers/axios'
import {GET_COURSE_CATEGORIES_MENU_URL, GET_COURSE_CATEGORIES_TYPE_URL, GET_COURSE_CATEGORIES_UR} from './constances';
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

function list() {
    return axios.get(GET_COURSE_CATEGORIES_UR, xAuthToken())

}

function getMenuCategory(params, responseCb, errorCb){
    axios
        .get(withQuery(GET_COURSE_CATEGORIES_MENU_URL, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getCourseCategoryType(params, responseCb, errorCb){
    axios
        .get(withQuery(GET_COURSE_CATEGORIES_TYPE_URL, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}


function getListCourseCategories(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_COURSE_CATEGORIES_UR, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function create(data, responseCb, errorCb) {
    const isFormData = true
    axios
        .post(GET_COURSE_CATEGORIES_UR, data, xAuthToken(isFormData))
        .then(responseCb)
        .catch(errorCb)
}

function detail(id, responseCb, errorCb) {
    axios
        .get(GET_COURSE_CATEGORIES_UR + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function edit(id, data, responseCb, errorCb) {
    axios
        .patch(GET_COURSE_CATEGORIES_UR + `/${id}`, data, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function remove(id,  responseCb, errorCb) {
    axios
        .delete(GET_COURSE_CATEGORIES_UR + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}


const CourseCategoriesService = {
    getListCourseCategories,
    getCourseCategoryType,
    getMenuCategory,
    create,
    detail,
    edit,
    remove,
    list
};

export default CourseCategoriesService;