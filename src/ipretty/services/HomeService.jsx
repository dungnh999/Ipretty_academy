import axios from 'ipretty/helpers/axios';
import { API_VERSION } from "./constances";

function xAuthToken() {
    if (localStorage.getItem('authToken')) {
        const headers = {
            headers: {
                "Authorization": 'Bearer ' + localStorage.getItem('authToken'),
                'Content-Type': 'application/json',
            }
        }
        return headers;
    }
}



const HomeService = {

}

export default HomeService;