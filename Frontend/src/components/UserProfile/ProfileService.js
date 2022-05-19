import axiosInstance from '../../axios.js';


export const UpdateUserProfile = (data) => {
    debugger;
    return axiosInstance.put('/api/Admin/UpdateAdminProfile',data);
}
