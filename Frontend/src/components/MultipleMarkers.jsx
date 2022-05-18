import React, { useState, useEffect, useContext } from "react";
import { ActiveRidersContext } from "../context/ActiveRidersContext.js";
import app from "../config/firebase.js";
import { getDatabase, ref, get, child, onValue } from "firebase/database";
import { Marker, InfoWindow } from "react-google-maps";
import { constants } from "crypto";

var riders = [];

const MultipleMarkers = ({ activeriders }) => {
  // const [activeRiders, setActiveRiders] = useState(activeriders);
  const firebase_db = ref(getDatabase(app));
  const [activeRiderMarker, setActiveRiderMarker] = useState([]);
  const [infoWindow, setInfoWindow] = useState(false);

  const StartTracking = () => {
    const timer = setInterval(() => {
      if (activeriders.length > 0) {
        activeriders.map((item, index) => {
          get(child(firebase_db, `users/${item.riderId}/tracking`))
            .then((snapshot) => {
              var res = snapshot.val();
              riders.push({
                id: item.riderId,
                // date: res.date,
                // start_time: res.start_time,
                inProgress: res.inProgress,
                // start_point: res.start_point,
                // end_point: res.end_point,
                bearing: res.bearing,
                latitude: res.latitude,
                longitude: res.longitude,
              });
            })
            .catch((error) => {
              console.log(error);
            });
        });
      }
      setActiveRiderMarker(riders);
      riders = [];
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  };

  useEffect(() => {
    StartTracking();
  }, [activeriders]);

  const showHideInfoWindow = () => {
    setInfoWindow(!infoWindow);
  };
  return (
    <>
      {activeRiderMarker.map((activeRider, index) => {
        return (
          <Marker
            key={index}
            position={{
              lat: activeRider.latitude,
              lng: activeRider.longitude,
            }}
            // onClick={() =>
            //   showHideInfoWindow(activeRider.latitude, activeRider.longitude)
            // }
            animation={null}
          >
            {infoWindow ? (
              <InfoWindow
                onClick={() =>
                  showHideInfoWindow(activeRider.latitude, activeRider.latitude)
                }
              >
                <div>
                  <span>From: {activeRider.latitude}</span>
                  <span>To:</span>
                </div>
              </InfoWindow>
            ) : (
              <></>
            )}
          </Marker>
        );
      })}
    </>
  );
};

export default MultipleMarkers;
