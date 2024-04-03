import axios from 'ipretty/helpers/axios'
import { GET_OVERVIEW_DATA , GET_FEATURE_COURSES , GET_FEATURE_MEMBERS , GET_FEATURE_TEACHERS , GET_FEATURE_COURSES_CATEGORIES ,  GET_ANALYSIS_BUSINESS , GET_STATISTICAL_COURSES} from './constances';
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

function getOverviewData(responseCb, errorCb) {
    return axios
        .get(GET_OVERVIEW_DATA , xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function getFeatureCourses(responseCb, errorCb) {
    return axios
        .get(GET_FEATURE_COURSES , xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function getFeatureMembers(responseCb, errorCb) {
    return axios
        .get(GET_FEATURE_MEMBERS , xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function getFeatureTeachers(responseCb, errorCb) {
    return axios
        .get(GET_FEATURE_TEACHERS , xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function getFeatureCoursesCategories(responseCb, errorCb) {
    return axios
        .get(GET_FEATURE_COURSES_CATEGORIES , xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function getAnalysisBusiness(params , responseCb, errorCb) {
    return axios
        .get(withQuery(GET_ANALYSIS_BUSINESS, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function getStatisticalCourses(params , responseCb, errorCb) {
    return axios
        .get(withQuery(GET_STATISTICAL_COURSES, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)

}

function getFileBusinessSales(params , responseCb, errorCb ) {
    axios
        .get(withQuery(GET_ANALYSIS_BUSINESS, params), xAuthTokenForExport())
        .then(responseCb)
        .catch(errorCb)
}

function getFileBusinessCourse(params , responseCb, errorCb ) {
    axios
        .get(withQuery(GET_STATISTICAL_COURSES, params), xAuthTokenForExport())
        .then(responseCb)
        .catch(errorCb)
}

const DashboardService = {
    getOverviewData,
    getFileBusinessSales,
    getFeatureCourses,
    getFileBusinessCourse,
    getFeatureMembers,
    getFeatureTeachers,
    getFeatureCoursesCategories,
    getAnalysisBusiness,
    getStatisticalCourses
};

export default DashboardService;