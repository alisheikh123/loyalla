import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import  Nolayout  from "./layouts/Nolayout";

// Session Route Views

import Signin from "./components/sessions/Signin";
import Signup from "./components/sessions/Signup";
import landing from "./components/LandingPage/landing";
import ScreenShare from "./components/Meeting/ScreenShare";
import VC_Meeting from "./components/Meeting/VC_Meeting";


export default [
  // {
  //   path: "/",
  //   exact: true,
  //   layout: Nolayout,
  //   component: () => <Redirect to="/landing" />
  // },
  // {
  //   path: "/landing",
  //   layout: Nolayout,
  //   component: landing
  // },
  {
    path: "/signin/:id?",
    layout: Nolayout,
    component: Signin
  },
  {
    path: "/signup",
    layout: Nolayout,
    component: Signup
  },
  {
    path: "/screen_Share/:id",
    layout: Nolayout,
    component: ScreenShare
  },
  {
    path: "/Join_Meeting/:id",
    layout: Nolayout,
    component: VC_Meeting
  },
  
];
