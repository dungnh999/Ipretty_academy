import axios from 'ipretty/helpers/axios'
import { GET_USER_URL, UPLOAD_FILE_USERS ,INVITE_USER ,ACTIVE_ACCOUNT , LOCK_USER ,GET_ALL_DEPARTMENT_URL, CREATE_USER_URL, UPLOAD_AVATAR_URL, UPDATE_PROFILE_URL, GET_USER_BY_ROLE ,GET_ME_PROFILE ,CHANGE_PASSWORD_URL, GET_LIST_POSTION_URL , GET_EXPORT_TEMPLATE, IMPORT_USER , RECEIVE_INFO} from './constances';
import { withQuery } from 'ipretty/helpers/withQuery'
import { getTokens } from "ipretty/helpers/utils";

function xAuthToken(formData = null, isJson = null) {
    let contentType = 'application/x-www-form-urlencoded';
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


function getListUser(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_USER_URL, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function getDepartments(responseCb, errorCb) {
    axios
        .get(GET_ALL_DEPARTMENT_URL, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function create(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(CREATE_USER_URL, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function uploadAvatar(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(UPLOAD_AVATAR_URL, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function detail(id,responseCb, errorCb) {
    axios
        .get(GET_USER_URL + `/${id}`, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}
function active (id , responseCb , errorCb) {
    axios
        .post(GET_USER_URL + `/${id}` + ACTIVE_ACCOUNT , null,  xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function lockUser (id , data , responseCb , errorCb) {
    const isformData = true
    axios
    .post(GET_USER_URL + `/${id}` + LOCK_USER , data ,  xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function updateUser(id, data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(GET_USER_URL + `/${id}`, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function updateAdmin(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(UPDATE_PROFILE_URL, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function updateProfileUser(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(UPDATE_PROFILE_URL, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function getUsersByRole(params, responseCb, errorCb) {
    return axios.get(withQuery(GET_USER_BY_ROLE, params), xAuthToken())
            .then(responseCb)
            .catch(errorCb)
}

function getExportFile(params , responseCb, errorCb ){
    axios
        .get(withQuery(GET_USER_BY_ROLE, params), xAuthTokenForExport())
        .then(responseCb)
        .catch(errorCb)
}

function getExportTemplate (params ,responseCb, errorCb ) {
    axios
        .get(withQuery(GET_EXPORT_TEMPLATE, params), xAuthTokenForExport())
        .then(responseCb)
        .catch(errorCb)
}

function getExportTemplateInvite (params ,responseCb, errorCb ) {
    axios
        .get(withQuery(GET_EXPORT_TEMPLATE, params), xAuthTokenForExport())
        .then(responseCb)
        .catch(errorCb)
}

function invite_user(invite_user ,responseCb, errorCb){
    axios 
        .post(INVITE_USER, invite_user , xAuthToken()) 
        .then(responseCb)
        .catch(errorCb)
}

function receive_information(data ,responseCb, errorCb){
    axios 
        .post(RECEIVE_INFO, data , xAuthToken()) 
        .then(responseCb)
        .catch(errorCb)
}

function uploadFileUsers(data, responseCb, errorCb) {
    const isformData = true
    axios
        .post(UPLOAD_FILE_USERS, data, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}

function profile (responseCb, errorCb) {
    axios
        .get(GET_ME_PROFILE, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function change_password(passwordForm, responseCb, errorCb) {
    axios
        .post(CHANGE_PASSWORD_URL, passwordForm , xAuthToken()) 
        .then(responseCb)
        .catch(errorCb)
}

function asyncDepartments() {
    return axios.get(GET_ALL_DEPARTMENT_URL, xAuthToken())
}

function getListPostions(params) {
    return axios.get(withQuery(GET_LIST_POSTION_URL, params), xAuthToken())
}

function getListPostionsInPaticipant(params) {
    return axios.get(withQuery(GET_LIST_POSTION_URL, params), xAuthToken())
}

function getListUserFollowRole(params, responseCb, errorCb) {
    axios
        .get(withQuery(GET_USER_BY_ROLE, params), xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function importUser(params ,file, responseCb, errorCb) {
    const isformData = true
    axios
        .post(withQuery(IMPORT_USER, params) , file, xAuthToken(isformData))
        .then(responseCb)
        .catch(errorCb)
}




const UserService = {
    updateProfileUser,
    getListUser,
    uploadFileUsers,
    getDepartments,
    create,
    invite_user,
    active,
    uploadAvatar,
    detail,
    getExportTemplate,
    updateAdmin,
    updateUser,
    receive_information,
    getExportFile,
    getUsersByRole,
    profile,
    getExportTemplateInvite,
    change_password,
    asyncDepartments,
    getListUserFollowRole,
    lockUser,
    getListPostions,
    importUser,
    getListPostionsInPaticipant
};

export default UserService;

// export const instance = axios.create()

// instance.interceptors.response.use(function (response) {
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     if (error.response.status == 422) {
//         console.log(33)
//     }
//     return Promise.reject(error);
// });


