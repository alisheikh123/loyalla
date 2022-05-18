import React, { useState, useEffect, createContext } from "react";
import { GetActiveRiders } from "../config/services.js";
import { useAuthState } from "./index.js";

export const ActiveRidersContext = createContext();

export const ActiveRidersProvider = (props) => {
  const [activeRiders, setActiveRiders] = useState([]);
  const userDetails = useAuthState();

  useEffect(() => {
    GetActiveRiders(userDetails.user.id).then((response) => {
      setActiveRiders(response.data.data);
    });
  }, []);
  return (
    <ActiveRidersContext.Provider value={[activeRiders, setActiveRiders]}>
      {props.children}
    </ActiveRidersContext.Provider>
  );
};
