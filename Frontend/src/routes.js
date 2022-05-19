import React from "react";
import { Redirect } from "react-router-dom";

// Layout Types
import { DefaultLayout } from "./layouts";
import  Nolayout  from "./layouts/Nolayout";
import  Conditional_Layout  from "./layouts/Conditional_Layout";

// Route Views
import DashboardOverview from "./components/Dashboard/DashboardOverview";
import Live_Srceen_Sharing from './components/Meeting/Live_Srceen_Sharing'
import GroupMeeting from './components/Meeting/Group_Meeting'
import MeetupError from './components/Meeting/MeetupError'

export default [

  {
    path: "/dashboard",
    layout: Conditional_Layout,
    component: DashboardOverview
  },
  {
    path: "/Live_Srceen",
    layout: Conditional_Layout,
    component: Live_Srceen_Sharing
  },
  {
    path: "/Group_Meeting",
    layout: Conditional_Layout,
    component: GroupMeeting
  },
  {
    path: "/MeetupError",
    layout: Conditional_Layout,
    component: MeetupError
  },

];
