import axios from 'ipretty/helpers/axios'
import {
    GET_ALL_POST,
    CREATE_BANNER_URL,
    CHANGE_PUBLISHED,
    GET_POST_CATEGORY,
    GET_BANNERS_NEW,
    LIST_CATEGORY_COURSE, GET_BANNER
} from './constances';
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

function getAllPost(params , responseCb, errorCb) {
    return axios
        .get(withQuery(GET_ALL_POST, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function getListBanner(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_BANNER, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}


function getAllPostCategories(params , responseCb, errorCb) {
    return axios
        .get(withQuery(GET_POST_CATEGORY, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}


function getAllPostCategory(responseCb, errorCb) {
    return axios
        .get(GET_POST_CATEGORY, xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function createPostCategories (data , responseCb, errorCb) {
    const isformData = true
    return axios
        .post(GET_POST_CATEGORY, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)

}

function detailPostCategories(id , responseCb, errorCb) {
    axios
        .get(GET_POST_CATEGORY + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function updatePostCategories(id, data ,responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_POST_CATEGORY + `/${id}`, data ,xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function createBanner(data , responseCb, errorCb) {
    const isformData = true
    return axios
        .post(CREATE_BANNER_URL, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)

}

function detail(id , responseCb, errorCb) {
    axios
        .get(GET_ALL_POST + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function createBannerNew(data , responseCb, errorCb) {
    const isformData = true
    return axios
        .post(GET_BANNERS_NEW, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function updateBannerNew(id, data ,responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_BANNERS_NEW + `/${id}`, data ,xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function updateBanner(id, data ,responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_ALL_POST + `/${id}`, data ,xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function change_published (id , data , responseCb , errorCb) {
    axios
    .post(GET_ALL_POST + `/${id}` + CHANGE_PUBLISHED , data ,  xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

const BannerService = {
    getAllPost,
    createBanner,
    createPostCategories,
    detail,
    detailPostCategories,
    updateBanner,
    updatePostCategories,
    change_published,
    getListBanner,
    getAllPostCategories,
    createBannerNew,
    updateBannerNew,
    getAllPostCategory
};

export default BannerService;