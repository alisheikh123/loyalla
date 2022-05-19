import React, {
    useContext,
    useEffect,
    useState,
} from 'react'
import { Redirect, useLocation } from 'react-router-dom'
import AppContext from "./AppContext";
import useAuth from './useAuth'
import history from '../history.js';

const getLoginStatus = (pathname, user, routes) => {
    
    var isPath = pathname.includes("screen_Share") ;
    if(isPath === true || pathname === "/Live_Srceen") {
        return true
    }
    else {
        const matched = routes.find((r) => r.path === pathname);
        const authenticated = matched ? true : false
        console.log(authenticated, user)
        return authenticated
    }

};
const getPublicPage = (pathname) => {
  
    var isPath = pathname.includes("screen_Share") ;
    if(isPath === true || pathname === "/Live_Srceen")  
    return true 
    else 
    return false

};
// function getrole(){

//     if(user.role === null){return 'ADMIN'} else{return}
// }
const AuthGuard = ({ children }) => {
    const {
        isAuthenticated,
        user
    } = useAuth()

    const [previouseRoute, setPreviousRoute] = useState(null)
    const { pathname } = useLocation()
    const { routes } = useContext(AppContext);

    const isUserLoggedIn = getLoginStatus(pathname, user, routes);
    const ispageFound = getPublicPage(pathname);
    let authenticated = isAuthenticated;

    // IF YOU NEED ROLE BASED AUTHENTICATION,
    // UNCOMMENT ABOVE TWO LINES, getUserRoleAuthStatus METHOD AND user VARIABLE
    // AND COMMENT OUT BELOW LINE
    // let authenticated = isAuthenticated

    useEffect(() => {
        if (previouseRoute !== null) setPreviousRoute(pathname)
    }, [pathname, previouseRoute])

    if (isUserLoggedIn && authenticated) { return <>{children}</> }
    else if(ispageFound && authenticated === false) {return <>{children}</>}


    // else if(isUserLoggedIn === "Out") {
    //     return <>{children}</> 
    // }

    else {
        return (
            <Redirect
                to={{
                    pathname: '/signin',
                    state: { redirectUrl: previouseRoute },
                }}
            />
        )
    }
}

export default AuthGuard
