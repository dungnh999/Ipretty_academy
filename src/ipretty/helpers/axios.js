import axios from 'axios'

const instance = axios.create()

instance.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = error.response.status;

    switch (status) {
        // case 403:
        // window.location.href = "/#/error/403";
        // break;
        // case 404:
        // window.location.href = "/#/error/404";
        // break;
        case 500:
        window.location.href = "/#/error/500";
        break;
        case 401:
        localStorage.clear();
        window.location.replace("/");
        break;
        default:
        break;
    }
    
    return Promise.reject(error);

});

export default instance

