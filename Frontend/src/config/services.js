import axiosIns from "../axios.js";
import {Decrypted_Viewer} from '../utilis';
var viewers = Decrypted_Viewer();

export const GetActiveRiders = async () => {
  return await axiosIns.get(
    `/api/Viewer/GetRiderListForTracking?ViewerId=` + viewers.id
  );
};

export const GetAllTrackingRequests = () => {
  return axiosIns.get(`/api/Viewer/GetRiderListForTrackingRequest`, {
    params: { ViewerId: viewers.id },
  });
};

export const AcceptTrackingRequest = (data) => {

  data.viewerId = viewers.id;
  return axiosIns.put(`/api/Viewer/AcceptTrackingRequest`,data);
};


