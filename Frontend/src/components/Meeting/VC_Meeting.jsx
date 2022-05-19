import React, { useEffect, useState } from 'react'
import { Button } from "shards-react";
import logo_color from '../../styles/images/logo-color.png'
import { useHistory } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import useAuth from '../../Authentication/useAuth'
import history from '../../history.js';
import { useParams } from 'react-router-dom'
import { Join_Meeting, VerifyMeeting } from './ScreenService'
import CircularProgress from '@material-ui/core/CircularProgress';


const VC_Meeting = () => {

    var link = useParams()

    const { user } = useAuth()

    const [userInfo, setUserInfo] = useState({
        name: '',
        userId: '',
    })

    const [isLive, setIslive] = useState(false)
    const [loader, setLoader] = useState(true)
    const [isLoggedin, setisLoggedin] = useState(false)

    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }

    const CheckForLogin = () => {

        if (user !== null) { setisLoggedin(true) }
        else { setisLoggedin(false) }

    }

    const JoinMeeting = (data) => {

        try {

            Join_Meeting(data).then(({ data }) => {
                debugger;
                console.log(data);
                if (data.isSuccess) {
                    if (data.data.isLive && !data.data.isLocked && !data.data.isProtected && data.data.valid) {
                        localStorage.setItem('MeetupLink', JSON.stringify(data.data));
                        history.push('/Group_Meeting');
                    }
                }
            })
        }
        catch (e) {

            console.log(e)

        }
    }

    const handleSubmit = async (loggedIn) => {

        var userdata = {
            role: "Audience",
            Meetup_ID: link.id,
            Name: userInfo.name,
            UserID: 0
        }

        if (loggedIn) { userdata.UserID = user.id; JoinMeeting(userdata) }

        else {
            if (userInfo.name !== '') {
                JoinMeeting(userdata)
            }
        }
    }


    const MeetingVerification = (MeetID) => {

        VerifyMeeting(MeetID).then((data) => {

            setLoader(false)
            debugger;
            console.log(data);
            if (data.data) {
                setIslive(true)
                CheckForLogin();
            }
            else {
                setIslive(false)
            }

        })
    }

    useEffect(() => {
        MeetingVerification(link.id);
    }, [link])
    return (

        <div className="login-sec ">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex flex-wrap justify-content-center align-items-center">
                        {loader ? <CircularProgress /> :
                            <div className="login-block login-area" >
                                <div className="login-inner">
                                    <div className="d-inline-block w-100">
                                        <a className="d-inline-block">
                                            <img src={logo_color} alt="Meetup Logo" />
                                        </a>
                                        <p className="my-3 signin-text text-center">Join Screen Meeting</p>
                                    </div>
                                    <div className="login-form-block">
                                        <div className="login100-form validate-form">
                                            {isLive ?
                                                <div className="form-row m-0">
                                                    {!isLoggedin ?
                                                            <React.Fragment>
                                                                <div className="form-group w-100">
                                                                    <TextField
                                                                        className="form-control mb-0"
                                                                        id="input-with-icon-textfield"
                                                                        type="text"
                                                                        label="Your Name"
                                                                        autocomplete="off"
                                                                        name="name"
                                                                        value={userInfo.name}
                                                                        onChange={handleChange}
                                                                    />
                                                                    <span className="icon">
                                                                        <svg width="20px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="svg-inline--fa fa-user fa-w-14 fa-2x">
                                                                            <path fill="#D2D2D2" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" className=""></path>
                                                                        </svg>
                                                                    </span>
                                                                </div>
                                                                <div className="form-group mt-4">
                                                                    <button onClick={() => handleSubmit(false)}>Join</button>
                                                                </div>
                                                            </React.Fragment> :
                                                            <div className="form-group mt-4">
                                                                <button onClick={() => handleSubmit(true)}>Join Now</button>
                                                            </div>
                                                    }
                                                </div>
                                                : <p>Meeting has been ended.</p>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default VC_Meeting;