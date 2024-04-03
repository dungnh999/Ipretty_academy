import axios from 'ipretty/helpers/axios';
import { GET_LIST_QUESTION, GET_DETAIL_QUESTION_IN_TOPIC, GET_LIST_FAQS, LIKE_OR_DISLIKE_FAQ_QUESTION, COMMENT_FAQ_QUESTION } from './constances';
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

function getListQuestion(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_LIST_QUESTION, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getDetailQuestion(idTopic, responseCb, errorCb) {
    axios
        .get(GET_DETAIL_QUESTION_IN_TOPIC + '/' + idTopic, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getDetailQuestionById(faq_id, question_id, responseCb, errorCb) {
    axios
        .get(GET_DETAIL_QUESTION_IN_TOPIC + '/' + faq_id + '/faq_question/' + question_id, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function commentForQuestion(idQuestion, data, responseCb, errorCb) {
    axios
        .post(GET_DETAIL_QUESTION_IN_TOPIC + '/' + idQuestion + '/comments', data, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function likeOrDislikeFaqQuestion(data, responseCb, errorCb) {
    axios
        .post(LIKE_OR_DISLIKE_FAQ_QUESTION, data, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function commentFaqQuestion(data, responseCb, errorCb) {
    axios
        .post(COMMENT_FAQ_QUESTION, data, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getListFAQS(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_LIST_FAQS, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function create(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_LIST_FAQS, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function detail(faqId, responseCb, errorCb) {
    axios
        .get(GET_DETAIL_QUESTION_IN_TOPIC + `/${faqId}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function edit(faqId, data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_LIST_FAQS + `/${faqId}`, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

const FaqService = {
    getListQuestion,
    getDetailQuestion,
    commentForQuestion,
    likeOrDislikeFaqQuestion,
    commentFaqQuestion,
    getListFAQS,
    create,
    detail,
    edit,
    getDetailQuestionById
};

export default FaqService;