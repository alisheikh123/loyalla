import axiosInstance from '../axios.js';



export const RefreshJWTToken = () => {
    debugger;
    const users = JSON.parse(localStorage.getItem("users"));
    var  accessToken= localStorage.getItem('accessTokens&d');
    var  refreshToken= localStorage.getItem('retoken');
    var  id= users.userId;
    var data = {
        accessToken : accessToken,
        refreshToken : refreshToken,
        usR_ID : id
    };
    return axiosInstance.put('/api/Authentication/RefreshToken' , data);
}
