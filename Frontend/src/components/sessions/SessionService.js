import axiosInstance from '../../axios.js';

export const Register = (data) => {
    debugger;

    return axiosInstance.post('/api/Authentication/Signup',data);
}