import axios from 'ipretty/helpers/axios'
import { URL_API , LOGIN_URL , GET_ME_URL , RESET_PASSWORD_URL , SEND_REQUEST_URL , API_CHANGE_LANGUAGE, SIGNUP_URL, RESEND_EMAIL, LOGIN_BY_TOKEN, LOG_OUT} from './constances';
import { getTokens } from "ipretty/helpers/utils";

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

function login(email, password, isAdminPage, responseCb, errorCb) {
    axios
        .post(LOGIN_URL, { email, password, isAdminPage }, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

function loginByToken(email,token, isAdminPage, responseCb, errorCb){
    axios
    .post(LOGIN_BY_TOKEN, { email, token, isAdminPage}, xAuthToken())
    .then(responseCb)
    .catch(errorCb)
}

function signup(email, password, confirmpassword, responseCb, errorCb) {
    axios
       .post(SIGNUP_URL, {email, password, confirmpassword }, xAuthToken())
       .then(responseCb)
       .catch(errorCb)
}

function profile(responseCb, errorCb) {
    axios
        .get(GET_ME_URL, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}
function get_me(access_token, responseCb, errorCb) {
    axios
        .get(GET_ME_URL, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}
function changeLanguage(keyLanguage, responseCb, errorCb){
    axios
        .post(API_CHANGE_LANGUAGE, keyLanguage  ,xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}
function refresh_token(refresh_token, responseCb, errorCb) {
}

function update(userProfile, responseCb, errorCb) {
}

function send_request(data ,responseCb, errorCb){
    axios 
        .post(SEND_REQUEST_URL, data , xAuthToken()) 
        .then(responseCb)
        .catch(errorCb)
}

function reset_password(passwordForm, responseCb, errorCb) {
    axios
        .post(RESET_PASSWORD_URL, passwordForm , xAuthToken()) 
        .then(responseCb)
        .catch(errorCb)
}

function resend_mail(email, responseCb, errorCb){
    axios
        .post(RESEND_EMAIL, email , xAuthToken()) 
        .then(responseCb)
        .catch(errorCb)
}


function logout(responseCb, errorCb) {
    axios
        .get(LOG_OUT, xAuthToken())
        .then(responseCb)
        .catch(errorCb)
}

const AuthService = {
    login, signup, profile, update, reset_password, get_me, refresh_token, send_request, changeLanguage, resend_mail, loginByToken, logout
};

export default AuthService;
