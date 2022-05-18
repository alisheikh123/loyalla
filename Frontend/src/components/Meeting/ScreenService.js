import axiosInstance from '../../axios.js';

const users = JSON.parse(localStorage.getItem("usersMeetup"));


export const Join_Meeting = (data) => {
    debugger;

    return axiosInstance.post('/api/Meeting/JoinMeeting?UserID='+data.UserID+'&role='+data.role+'&Meetup_ID='+data.Meetup_ID+'&Name='+data.Name+'');
}
export const VerifyMeeting = (data) => {
    debugger;

    return axiosInstance.post('/api/Meeting/VerifySession?Meetup_ID='+data+'');
}
export const GetUsersList = (Link) => {
    debugger;
    return axiosInstance.get('/api/Meeting/GetUsersList?Invitation_Link='+Link+'');
}
export const EndCall = (ChannelID) => {
    debugger;
    return axiosInstance.post('/api/Meeting/EndCall?InvitationLink='+ChannelID+'&UserID='+users.id+'');
}
