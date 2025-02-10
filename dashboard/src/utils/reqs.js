import axios from "axios";
const API = 'http://localhost:5000';
const getReq = (pref = '', params) => {
    return axios(`${API}/api${pref}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        params
    });
};
const postReq = (pref = '', data = {}, params) => {
    return axios.post(`${API}/api${pref}`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        params
    });
};
const putReq = (pref = '', data = {}, params) => {
    return axios.put(`${API}/api${pref}`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        params
    });
};
const deleteReq = (pref = '', params) => {
    return axios.delete(`${API}/api${pref}`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        params
    });
};
export { API, getReq, postReq, putReq, deleteReq };