import axios from "axios";
import {baseURL} from './config';

let headers = {};

if(localStorage.getItem("accessTokens&d"))
{
    headers.Authorization = `Bearer ${localStorage.getItem("accessTokens&d")}`;
}
console.log("dwad",localStorage.getItem("accessTokens&d"))
const axiosInstance = axios.create({
baseURL:baseURL,
headers
});
// axios.interceptors.response.use(null,error =>{

//     const expectedError =
//     error.response &&
//     error.response.status >= 400 &&
//     error.response.status > 500;
//     if(!expectedError){
//         console.log("Logging the error, error");
//         alert("Something went wrong.");
//     }

//     return Promise.reject(error);
// });


export default axiosInstance; 

//{
//     get: axios.get,
//     post:axios.post,
//     put:axios.put,
//     delete: axios.delete,
//     baseURL : baseURL
// };