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
    const f = new FormData();
    Object.entries(data).forEach(([k, v]) => {
        f.append(k, v);
    })
    return axios.post(`${API}/api${pref}`, f, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        },
        params
    });
};
const putReq = (pref = '', data = {}, params) => {
    const f = new FormData();
    Object.entries(data).forEach(([k, v]) => {
        f.append(k, v);
    })
    return axios.put(`${API}/api${pref}`, f, {
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