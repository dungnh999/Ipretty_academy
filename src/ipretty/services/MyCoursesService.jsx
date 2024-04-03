import axios from 'ipretty/helpers/axios';
import _axios from 'axios'
import { GET_MY_COURSES, GET_COURSE_URL, FREE_COURSE, GET_CATEGORY_HIGHLIGHT, GET_COURSE_HIGHLIGHT, 
  DETAIL_COURSE_STUDENT, CONFIRM_NOTICE, RATING_COMMENT, GET_RELATED_COURSES, GET_OVERVIEW_STUDENT, GET_OPINIONS,DOWNLOAD,CERTIFICATES } from "./constances";
import { getTokens } from 'ipretty/helpers/utils';
import { withQuery } from "ipretty/helpers/withQuery";

function xAuthToken() {
    if (getTokens().authToken) {
        const headers = {
          headers: {
            Authorization: "Bearer " + getTokens().authToken,
            "Content-Type": "application/json",
          },
        };
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
function getMyCourses(params, responseCb, errorCb) {
  _axios
        .get(withQuery(GET_MY_COURSES, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getDetailMyCourse(idCourse, responseCb, errorCb) {
  _axios
        .get(`${GET_COURSE_URL}/${idCourse}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getListCourse(params, responseCb, errorCb) {
  _axios
    .get(withQuery(GET_COURSE_URL, params), xAuthToken())
    .then(responseCb)
    .catch(errorCb);
}

function getListCourseFree(params, responseCb, errorCb) {
  _axios
    .get(withQuery(FREE_COURSE, params), xAuthToken())
    .then(responseCb)
    .catch(errorCb);
}

function getListCategoryHighlight(responseCb, errorCb) {
  _axios
    .get(GET_CATEGORY_HIGHLIGHT, xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function getListCourseHighlight(responseCb, errorCb) {
  _axios
    .get(GET_COURSE_HIGHLIGHT, xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function getDetailCourseNew(idCourse, responseCb, errorCb) {
  console.log(`${DETAIL_COURSE_STUDENT}/${idCourse}`, xAuthToken());
  _axios
    .get(`${DETAIL_COURSE_STUDENT}/${idCourse}`, xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function confirmNotice(data, responseCb, errorCb) {
  axios
    .post(CONFIRM_NOTICE, data, xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function ratingAndComment(course_id, data, responseCb, errorCb) {
  axios
    .post(GET_COURSE_URL + '/' + course_id + '/' + RATING_COMMENT, data, xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function getRelatedCourse(idCourse, responseCb, errorCb) {
  _axios
    .get(GET_RELATED_COURSES + `/${idCourse}`, xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function getOverviewData(responseCb, errorCb) {
  _axios
    .get(GET_OVERVIEW_STUDENT, xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function getOpinions(responseCb, errorCb) {
  _axios
    .get(GET_OPINIONS, xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function getDownload(course_id,responseCb, errorCb) {
  _axios
    .get(CERTIFICATES + '/' +course_id + '/' + DOWNLOAD, xAuthTokenForExport())
    .then(responseCb)
    .catch(errorCb)
   
}


const MyCoursesService = {
  getMyCourses,
  getListCourse,
  getDetailMyCourse,
  getListCourseFree,
  getListCategoryHighlight,
  getListCourseHighlight,
  getDetailCourseNew,
  confirmNotice,
  ratingAndComment,
  getRelatedCourse,
  getOverviewData,
  getOpinions,
  getDownload,
};

export default MyCoursesService;