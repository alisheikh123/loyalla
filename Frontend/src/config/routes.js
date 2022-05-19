import Signup from "../pages/signup";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import PageNotFound from "../pages/notFound";

const routes = [
  {
    path: "/login",
    component: Login,
    isPrivate: false
  },
  {
    path: "/signup",
    component: Signup,
    isPrivate: false
  },
  {
    path: "/dashboard",
    component: Dashboard,
    isPrivate: true
  },
  {
    path: "/",
    component: Login,
    isPrivate: false
  },
  
];

export default routes;
