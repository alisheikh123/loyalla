import React, { useState, useEffect } from 'react'
import logo_color from '../../styles/images/logo-color.png'
import { CreateMeeting, VerifyUserCredentials } from '../../MeetingServices.js'
import TextField from '@material-ui/core/TextField';
import history from '../../history.js';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Decrypted_Identity } from '../../utils'
import useAuth from '../../Authentication/useAuth'

const Signin = () => {

    const { login1 } = useAuth();
    const { user } = useAuth()
    const url = new URL(window.location.href);

    function handleClick() {
        history.push("/Signup");
    }

    const [message, setmessage] = useState('')
    const [loading, setloading] = useState(false)
    const [ContainLink, setContainLink] = useState(false)
    const [isLive, setisLive] = useState(false)
    const [errormessage, seterrormessage] = useState("Verifying Identity")
    const [action, setaction] = useState("")
    const [userInfo, setUserInfo] = useState({
        userID: '',
        password: '',
    })

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const handleScreen = () => {
        debugger;
        var userdata = JSON.parse(localStorage.getItem("usersMeetup"));

        CreateMeeting(userdata.enc_uid).then(({ data }) => {

            if (data.message === "Meeting Successfully Created.") {
                localStorage.setItem('MeetupLink', JSON.stringify(data.data));
                history.push('/Live_Srceen');
            }
        }).catch(function (error) {
            console.log(error);
        });

    }


    const handleSubmit = async () => {
        setloading(true)
        setmessage("");
        try {

            var response = await login1(userInfo.userID, userInfo.password)
            debugger;
            setloading(false)
            if (response) {
                    history.push('/dashboard');
            }
            else {
                setisLive(false)
                seterrormessage("Invalid credentials. Unable to identify user.")
                setmessage("ID/Password is incorrect.")
            }

        }
        catch (e) { console.log(e) }
    }

    const LoginViaLink = async (email,password,action) => {

        try {
            var response = await login1(email, password)
            debugger;
            setloading(false)
            if (response) {handleScreen()}
            else {MeetupError()}
        }
        catch (e) { console.log(e) }
    }


    const MeetupError = () => {
        setisLive(false)
        seterrormessage("Invalid credentials. Unable to identify user.")
    }

    const CheckForLogin = async () => {

        setisLive(true)

        if (url.pathname !== "/signin") {

            setContainLink(true);

            var link = url.pathname.split("/signin/");
            var token = ""
            var action = ""

            if (link[1].includes("=")) {

                var link2 = link[1].split("=");
                token = link2[0]
                action = link2[1]

                if (token.length === 75) {

                    VerifyUserCredentials(token).then(({ data }) => {

                        if (data.message === "Successfully Fetched.") {
                            debugger
                            var userdecrypted = Decrypted_Identity(data.data.credentials);
                            if (userdecrypted !== null) {

                                LoginViaLink(userdecrypted.email, userdecrypted.password, action)
                                
                            }
                            else { MeetupError() }
                        }
                        else {
                            MeetupError();
                        }

                    }).catch(function (error) {
                        console.log(error);
                    });
                }
                else { MeetupError(); }

            }
            else { MeetupError(); }
        }

    }
    useEffect(() => {
        CheckForLogin();
    }, [])


    return (

        <div className="login-sec ">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex flex-wrap justify-content-center align-items-center">
                        <div className="login-block login-area" >
                            {!ContainLink ?
                                <div className="login-inner">
                                    <div className="d-inline-block w-100">
                                        <a className="d-inline-block">
                                            <img src={logo_color} alt="" />
                                        </a>
                                        <p className="my-3 signin-text text-center">Sign In</p>
                                    </div>
                                    <div className="login-form-block">
                                        <div className="login100-form validate-form">
                                            <div className="form-row m-0">

                                                <React.Fragment>
                                                    <div className="form-group w-100">
                                                        {/* <label className="label-text" for="login-password">Username or Email</label> */}
                                                        {/* <input className="form-control mb-0" type="email" name="UserID" autocomplete="off" required /> */}
                                                        <TextField
                                                            className="form-control mb-0"
                                                            id="input-with-icon-textfield"
                                                            type="email"
                                                            label="Username or Email"
                                                            name="userID"
                                                            value={userInfo.userID}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <span className="icon">
                                                            <svg width="20px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-user fa-w-14 fa-2x">
                                                                <path fill="#D2D2D2" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" className=""></path>
                                                            </svg>
                                                        </span>
                                                    </div>
                                                    <div className="form-group w-100">
                                                        {/* <label className="label-text" for="login-password">Password</label>
                                                <input id="login-password" className="form-control mb-0" type="password" name="Password" autocomplete="off" required /> */}
                                                        <TextField
                                                            className="form-control mb-0"
                                                            id="input-with-icon-textfield"
                                                            type="password"
                                                            label="Password"
                                                            name="password"
                                                            value={userInfo.password}
                                                            onChange={handleChange}
                                                            required
                                                        />
                                                        <span className="icon">
                                                            <svg width="20px" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="key" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-key fa-w-16 fa-2x"><path fill="#D2D2D2" d="M336 32c79.529 0 144 64.471 144 144s-64.471 144-144 144c-18.968 0-37.076-3.675-53.661-10.339L240 352h-48v64h-64v64H32v-80l170.339-170.339C195.675 213.076 192 194.968 192 176c0-79.529 64.471-144 144-144m0-32c-97.184 0-176 78.769-176 176 0 15.307 1.945 30.352 5.798 44.947L7.029 379.716A24.003 24.003 0 0 0 0 396.686V488c0 13.255 10.745 24 24 24h112c13.255 0 24-10.745 24-24v-40h40c13.255 0 24-10.745 24-24v-40h19.314c6.365 0 12.47-2.529 16.971-7.029l30.769-30.769C305.648 350.055 320.693 352 336 352c97.184 0 176-78.769 176-176C512 78.816 433.231 0 336 0zm48 108c11.028 0 20 8.972 20 20s-8.972 20-20 20-20-8.972-20-20 8.972-20 20-20m0-28c-26.51 0-48 21.49-48 48s21.49 48 48 48 48-21.49 48-48-21.49-48-48-48z" className=""></path></svg>
                                                        </span>
                                                    </div>
                                                    <div className="form-group w-100 login-error">
                                                        <p>{message}</p>
                                                    </div>
                                                    <div className="form-group mt-4">
                                                        <div className="relative">

                                                            <button onClick={handleSubmit} disabled={loading} >Submit</button>
                                                            {loading && (
                                                                <CircularProgress
                                                                    size={24}
                                                                    className="button-loader"

                                                                />
                                                            )}
                                                        </div>
                                                    </div>
                                                </React.Fragment>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="my-2 signup-link">Don't have an account yet? <a onClick={handleClick}>Sign up Now</a></p>
                                </div>
                                :
                                <div className="login-verify">
                                    <div className="d-inline-block w-100 text-center">
                                        <a className="d-inline-block">
                                            <img src={logo_color} alt="" />
                                        </a>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <div className="meeting-loader-login">
                                            {isLive ?
                                                <React.Fragment>
                                                    <span>Verifying Identity</span>
                                                    <LinearProgress color="primary" />
                                                </React.Fragment>
                                                : <span>{errormessage}</span>}
                                        </div>
                                    </div>

                                </div>
                            }
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signin;