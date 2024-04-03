import axios from 'ipretty/helpers/axios'
import {
    GET_COURSE_URL,
    COURSE_URL_ADD_STUDENT_INTO_COURSE,
    COURSE_URL_ADD_LEADER_INTO_COURSE,
    COURSE_URL_CLONE,
    CHECK_JOIN_COURSE_URL,
    SEARCH_COURSE,
    GET_URL_REMOVE_LEADER,
    GET_REPORT_DETAIL_COURSE,
    GET_REPORT_BUSINESS_COURSE,
    GET_ALL_COURSE_URL
} from './constances';
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

function xAuthTokenForExport() {
    if (getTokens().authToken) {
      const headers = {
        headers: {
          "Authorization": 'Bearer ' + getTokens().authToken,
          'Content-Disposition': "attachment; filename=template.zip",
          'Content-Type': 'application/zip'
        },
        "responseType": 'arraybuffer',
      }
      return headers;
    }
}

function create(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_COURSE_URL, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function edit(data, courseId, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_COURSE_URL + `/${courseId}`, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function list(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_COURSE_URL, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getAllCourse(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_ALL_COURSE_URL, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function detail(id, responseCb, errorCb) {
    axios
        .get(GET_COURSE_URL + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function listOfStudentsInTheCourse(courseId, params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_COURSE_URL + `/${courseId}/students`, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function listOfLeaderInTheCourse(courseId, params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_COURSE_URL + `/${courseId}/leaders`, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function asyncListOfLeaderInTheCourseWithParams(courseId, params, responseCb, errorCb) {
    return axios.get(withQuery(GET_COURSE_URL + `/${courseId}/leaders`, params), xAuthToken())
}

function asyncListOfStudentsInTheCourse(courseId) {
    return axios.get(GET_COURSE_URL + `/${courseId}/students`, xAuthToken())
}

function addStudentsIntoCourse(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(COURSE_URL_ADD_STUDENT_INTO_COURSE, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function addLeadersIntoCourse(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(COURSE_URL_ADD_LEADER_INTO_COURSE, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function cloneCourse(id, responseCb, errorCb) {
    axios
        .post(COURSE_URL_CLONE + `/${id}`, null, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function asyncListOfLeaderInTheCourse(courseId) {
    return axios.get(GET_COURSE_URL + `/${courseId}/leaders`, xAuthToken())
}

function changePublicCourse(courseId, data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_COURSE_URL + `/${courseId}/change-publish`, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}


function checkJoinCourse(id, responseCb, errorCb) {
    axios
        .post(GET_COURSE_URL + `/${id}/` + CHECK_JOIN_COURSE_URL, null, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getLearingProcess(courseId, userId, responseCb, errorCb) {
    axios
        .get(GET_COURSE_URL + `/${courseId}/learning-process/${userId}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function searchCourse(params, responseCb, errorCb) {
    axios
        .get(withQuery(SEARCH_COURSE, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function exportListOfStudentsInTheCourse(courseId, params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_COURSE_URL + `/${courseId}/students`, params), xAuthTokenForExport())
        .then(responseCb)
        .catch(errorCb)
}

function exportListOfLLeadersInTheCourse(courseId, params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_COURSE_URL + `/${courseId}/leaders`, params), xAuthTokenForExport())
        .then(responseCb)
        .catch(errorCb)
}

function removeLeaderOfCourse(courseId, leaderId, responseCb, errorCb) {
    axios
        .post(GET_URL_REMOVE_LEADER + `/${courseId}` + `/leader` + `/${leaderId}`, null, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}


function getReportDetailCourse(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_REPORT_DETAIL_COURSE, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getFileCourse(params , responseCb, errorCb ) {
    axios
        .get(withQuery(GET_REPORT_DETAIL_COURSE, params), xAuthTokenForExport())
        .then(responseCb)
        .catch(errorCb)
}

function getReportBusinessCourse(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_REPORT_BUSINESS_COURSE, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getFileBusinessCourse(params , responseCb, errorCb ) {
    axios
        .get(withQuery(GET_REPORT_BUSINESS_COURSE, params), xAuthTokenForExport())
        .then(responseCb)
        .catch(errorCb)
}

const CourseService = {
    create,
    getFileCourse,
    list,
    detail,
    getFileBusinessCourse,
    listOfStudentsInTheCourse,
    listOfLeaderInTheCourse,
    edit,
    asyncListOfStudentsInTheCourse,
    addStudentsIntoCourse,
    asyncListOfLeaderInTheCourse,
    cloneCourse,
    changePublicCourse,
    checkJoinCourse,
    getLearingProcess,
    searchCourse,
    getAllCourse,
    addLeadersIntoCourse,
    asyncListOfLeaderInTheCourseWithParams,
    exportListOfStudentsInTheCourse,
    exportListOfLLeadersInTheCourse,
    removeLeaderOfCourse,
    getReportDetailCourse,
    getReportBusinessCourse
};

export default CourseService;