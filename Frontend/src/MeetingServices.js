import axiosInstance from './axios.js';


export const CreateMeeting = (id) => {
    debugger;
    return axiosInstance.post('/api/Meeting/CreateMeeting?Userid='+ id +'');
}
export const VerifyUserCredentials = (token) => {
    debugger;
    return axiosInstance.post('/api/Meeting/VerifyUser_Credentials?token='+ token +'');
}
