import moment from "moment"
import queryString from 'query-string';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
} : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

function localStoragePersist(key, obj) {
    switch (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) {
        case 'string':
            window.localStorage.setItem(key, obj);
            break;
        case 'object':
            window.localStorage.setItem(key, JSON.stringify(obj));
            break;
    }
}

function getLocalStoragePersistedObject(key) {
    let strItem = window.localStorage.getItem(key);
    let result = null;
    if (strItem) {
        try {
            result = JSON.parse(strItem);
        } catch (err) {
            return strItem;
        }
        return result;
    }
}

function removeLocalStoragePersistedObject(key) {
    window.localStorage.removeItem(key);
}

function validateEmail(email) {
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function removeSpaces(str) {
    return str.replace(/\s/g, '');
}

function validateSiret(siret) {
    var siretRegex = /^\d{14}$/g; // 14 numbers
    return siretRegex.test(siret);
}

function validateIpAddress(ipAddress) {
    var regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    return regex.test(ipAddress);
}

function validatePort(port) {
    return port >= 1 && port <= 65535;
}

const convertLocalDateToDateFormat = (inputDate) => {
    let parseFormat = 'DD/MM/YYYY';
    let outputDate = moment(new Date(inputDate)).format(parseFormat);
    return outputDate;
}
const dateFormat = (inputDate) => {
    let parseFormat = 'DD/MM/YYYY - HH:mm';
    let outputDate = moment(new Date(inputDate)).format(parseFormat);
    return outputDate;
}

const convertLocalDateToTimeSinceFormat = (inputDate) => {
    let output = moment(new Date(inputDate)).fromNow();
    return output;
}

const validateImageExtension = (fileName) => {
    let validExtensions = ['jpg', 'png', 'jpeg', 'gif'];
    let fileExtension = fileName.split('.').pop().toLowerCase();
    return validExtensions.includes(fileExtension);
}

function renderAvatar(src) {
    let url = [];
    if (src) {
        url = src.split("/");
    }
    if (url.length > 1 && url[1] == "storage") {
        src = process.env.API_URL + src;
    }
    return src;
}

function convertHMS(value) {
    const sec = parseInt(value, 10);
    let hours = Math.floor(sec / 3600);
    let minutes = Math.floor((sec - (hours * 3600)) / 60);
    let seconds = sec - (hours * 3600) - (minutes * 60);
    if (hours < 10) {
        hours = "0" + hours;
    }
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (seconds < 10) {
        seconds = "0" + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
}

export function getPosition(el) {
    const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
        top: rect.top + scrollTop + 100,
        left: rect.left + scrollLeft - 1600,
        height: rect.height,
        width: rect.width
    }
}

export function sortFieldName(firtItem, lastItem, field, defaut) {
    let _firtItem = firtItem[field] && typeof firtItem[field] != 'number' ? firtItem[field].toLowerCase() : firtItem[field]
    let _lastItem = lastItem[field] && typeof lastItem[field] != 'number' ? lastItem[field].toLowerCase() : lastItem[field]

    if (defaut % 2 == 0) {
        if (_firtItem < _lastItem) {
            return -1;
        }
        if (_firtItem > _lastItem) {
            return 1;
        }
        return 0;
    } else {
        if (_firtItem > _lastItem) {
            return -1;
        }
        if (_firtItem < _lastItem) {
            return 1;
        }
        return 0;
    }
}

export const withQueryStr = (queryObj) => {
    return queryString.stringify(queryObj, {
        arrayFormat: 'comma'
    });
}

export function parseParams(search) {
    return queryString.parse(search.substr(1)); // remove '?'
}

export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        reader.readAsDataURL(file);
    });
}

export function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}

const fieldsErrors = [
    "email",
    "username",
    "check_password",
    "password",
    "first_name",
    "phone",
    "name",
    "address",
    "subject",
    "description",
    "school_id",
    "teacher_ids",
    "student_ids",
    "survey_ids",
    "start_time",
    "count_student",
    "contact_name",
    "province",
    "old_password",
    "user_id",
    "avatar",
    "_messages",
    "start_time_pretest",
    "start_time_posttest",
    "end_time",
    "budget",
];
const isEmpty = (value) => {
    return !value || (value && value.trim() == "");
}

const fieldsError = ["address", "phone", "email", "first_name", "name"];

function handleThrowError(fieldsError, errors, message, cb) {
    if (typeof errors == "string") {
        return cb(errors);
    } else {
        const isShowError = fieldsError.some((f) => {
            if (errors[f]) {
                cb(errors[f][0]);
                return true;
            }
        });
        if (isShowError.length == 0) return cb(message);
    }
}

function handleError(err, logout, navigate, resCb = (args) => new Error(args)) {
    const {
        data,
        status
    } = err.response;
    const {
        errors,
        message,
        error
    } = data;
    switch (status) {
        case 400:
        case 403:
            return navigate("/error/403");
        case 404:
            return navigate("/error/404");
        case 401:
            if (message) return resCb(message);
            else if (errors) {
                if (errors._messages) return resCb(errors._messages[0]);
            } else return logout();
        case 422: {
            if (error) return resCb(message);
            else if (errors)
                return handleThrowError(fieldsErrors, errors, message, resCb);
            return handleThrowError(fieldsError, data, data, resCb);
        }
        default:
            return resCb(message);
    }
}

export const initialPrams = (query, perpage = 10) => {
    if (query.page == undefined || !query.perpage) query = {
        perpage,
        page: 1,
        total: 0
    }
    if (!query.fieldName) query.fieldName = []
    if (!query.keyword) query.keyword = []
    if (!query.fixed) query.fixed = []
    return query
}

export const initialPramsCourse = (query, perpage = 10) => {
    if (query.page == undefined || !query.perpage) query = {
        perpage,
        page: 1,
        total: 0,
        paging: true
    }
    if (!query.fieldName) query.fieldName = []
    if (!query.keyword) query.keyword = []
    if (!query.fixed) query.fixed = []
    return query
}

function checkStudent(roles) {
    if (
        roles &&
        (roles.indexOf("user") > -1 || roles.indexOf("employee") > -1) &&
        roles.indexOf("admin") == -1 &&
        roles.indexOf("teacher") == -1
    ) {
        return true;
    }
    return false;
};

export const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

export const convertToBlob = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(window.URL.createObjectURL(new Blob([reader.result])));
    reader.onerror = error => reject(error);
});

function compactText(text, lengthNumber) {
    let newText = '';
    if (text.length > lengthNumber) {
        newText = `${text.slice(0, lengthNumber)}...`;
    } else {
        newText = text;
    }
    return newText;
}

// function b64toBlob(dataURI) {
    
//     var byteString = atob(dataURI.split(',')[1]);
//     var ab = new ArrayBuffer(byteString.length);
//     var ia = new Uint8Array(ab);
    
//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }
//     return new Blob([ab], { type: 'image/jpeg' });
// }


var contextHelper = {
    localStoragePersist: localStoragePersist,
    getLocalStoragePersistedObject: getLocalStoragePersistedObject,
    removeLocalStoragePersistedObject: removeLocalStoragePersistedObject,
    validateEmail: validateEmail,
    validateSiret: validateSiret,
    removeSpaces: removeSpaces,
    validateIpAddress: validateIpAddress,
    validatePort: validatePort,
    convertLocalDateToDateFormat: convertLocalDateToDateFormat,
    dateFormat: dateFormat,
    convertLocalDateToTimeSinceFormat: convertLocalDateToTimeSinceFormat,
    validateImageExtension: validateImageExtension,
    renderAvatar: renderAvatar,
    handleError: handleError,
    isEmpty: isEmpty,
    initialPrams: initialPrams,
    checkStudent: checkStudent,
    compactText: compactText,
    convertTommss: convertHMS,
    initialPramsCourse: initialPramsCourse,
    sortFieldName: sortFieldName,
    getPosition: getPosition,
};

export default contextHelper;