import React, { useEffect, useState } from 'react';
import AgoraRTC from "agora-rtc-sdk";
import { appID } from '../../config.js';
import { Grid } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import LinearProgress from '@material-ui/core/LinearProgress';
import { GetUsersList, EndCall } from './ScreenService'
import { Domain } from '../../config'
import { Container } from "shards-react";
import history from '../../history.js';
import MeetupError from './MeetupError';
import { VerifyMeeting } from './ScreenService'

import './style.css'


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

// -----initialize socket.io----------

var rtc = {
    client: AgoraRTC.createClient({ mode: "rtc", codec: "vp8" }),
    joined: false,
    published: false,
    localStream: null,
    remoteStreams: [],
    params: {}
};

// Options for joining a channel
var option = {
    appID: appID,
    channel: "",
    uid: null,
    token: "0",
    role: "",
    key: '',
    secret: ''
}


const Live_Srceen_Sharing = () => {

    const [open, setOpen] = useState(false);
    const [activesSide, setactivesSide] = useState(false);
    const [invitelink, setinvitelink] = useState('');
    const [isLive, setisLive] = useState(false);
    const [copy, setCopy] = useState(false);
    const [end, setEnd] = useState(false); 
    const [participants, setparticipants] = useState([]);
    const [isaudio, setIsAudio] = useState(true);
    const [role, setRole] = useState('');
    const [errorTitle, seterrorTitle] = useState('');


    rtc.client.on("connection-state-change", function (evt) {
        console.log("bhai jan status change ho gaya", evt)
    })
    rtc.client.on('track-ended', () => {
        console.log('stopScreenSharing')
        })
    rtc.client.on("mute-audio", function (evt) {
        debugger;
        console.log("New muted event", evt);
    });

    rtc.client.on("unmute-audio", function (evt) {
        debugger;
        console.log("new unmuted event", evt);
    });
    rtc.client.on("user-unpublished", function (evt) {
        debugger;
        console.log("user-unpublished the chat", evt);
    });

    function joinChannel(role) {
        // Create a client
        // Initialize the client
        rtc.client.init(option.appID, function () {
            console.log("init success");

            // Join a channel
            rtc.client.join(option.token ? option.token : null, option.channel, option.uid ? +option.uid : null, function (uid) {
                console.log("join channel: " + option.channel + " success, uid: " + uid);
                rtc.params.uid = uid;

                debugger;

                if (role === "host") {

                    rtc.client.setClientRole("host");
                    // Create a local stream
                    rtc.localStream = AgoraRTC.createStream({
                        streamID: rtc.params.uid,
                        audio: true,
                        video: false,
                        screen: true,
                    })
                    // Initialize the local stream
                    rtc.localStream.init(function () {
                        console.log("init local stream success");
                        setisLive(true);
                        rtc.localStream.play("local_stream");
                        rtc.client.publish(rtc.localStream, function (err) {

                            console.log("publish failed");
                            console.error(err);
                        })
                    }, function (err) {
                        console.error("init local stream failed ", err);
                    });

                    rtc.client.enableDualStream();

                }
                else {

                    rtc.client.setClientRole('audience');

                    debugger;
                    rtc.localStream = AgoraRTC.createStream({
                        streamID: rtc.params.uid,
                        audio: true,
                        video: false,
                        screen: false,
                    });

                    // ----------------other events---------------

                    rtc.client.on("stream-added", function (evt) {
                        setisLive(true);
                        debugger;
                        var remoteStream = evt.stream;
                        console.log("print", JSON.stringify(evt));
                        var id = remoteStream.getId();
                        if (id !== rtc.params.uid) {
                            // var element = document.getElementById("remote_video_");
                            // element.parentNode.removeChild(element);
                            rtc.client.subscribe(remoteStream, function (err) {
                                console.log("stream subscribe failed", err);
                            })
                        }
                        console.log('stream-added remote-uid: ', id);
                    });

                    rtc.client.setStreamFallbackOption(rtc.localStream, 2);

                    rtc.client.on("stream-removed", function (evt) {
                        debugger;
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        console.log('stream-removed remote-uid: ', id);
                    });

                    rtc.client.on("stream-unsubscribed", function (evt) {
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        remoteStream.pause("remote_video_");
                        console.log('stream-unsubscribed remote-uid: ', id);
                    });

                    rtc.client.on("stream-subscribed", function (evt) {
                        setisLive(true);
                        var remoteStream = evt.stream;
                        var id = remoteStream.getId();
                        // var element = document.getElementById("remote_video_");
	                    // element.parentNode.removeChild(element);
                        // var element = document.getElementById("remote_video_");
                        // element.parentNode.appendChild(element);
                        remoteStream.play("remote_video_");
                        console.log('stream-subscribed remote-uid: ', id);
                    });

                }
            }, function (err) {
                console.error("client join failed", err)
            });

        }, (err) => {
            console.error(err);
        });
    }

    function leaveEventHandle(role) {
        debugger;

        localStorage.setItem('MeetupLink', null);
        seterrorTitle("You have left the Meeting.");

        if (role === "Host") {

            rtc.client.unpublish(rtc.localStream, function (err) {
                console.log("publish failed");
                console.error(err);
            });

            rtc.client.leave(function () {
                console.log("client leaves channel");
                //……
            }, function (err) {
                console.log("client leave failed ", err);
                //error handling
            })

            EndMeeting(option.channel)
            setEnd(true)

        }
        else {

            rtc.client.leave(function () {
                console.log("client leaves channel");
                //……
            }, function (err) {
                console.log("client leave failed ", err);
                //error handling
            })

            setEnd(true)
        }
        window.location.reload();
    }


    function AudioHandle(IsMic) {

        IsMic ? rtc.localStream.muteAudio() : rtc.localStream.unmuteAudio();
        setIsAudio(prevCheck => !prevCheck);

    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleCopy = () => {

        navigator.clipboard.writeText(invitelink);
        setCopy(true);
    };

    const handleDialog = () => {
        setOpen(true);
    };


    const HandleToggle = () => {

        setactivesSide(prevCheck => !prevCheck);
    }


    const getAllMembers = (channelId) => {

        try {
            GetUsersList(channelId).then(({ data }) => {
                debugger;
                console.log(data);
                if (data.isSuccess) {
                    setparticipants(data.data)
                }
            })
        }
        catch (e) { console.log(e) }
    }

    const EndMeeting = (channelId) => {

        try {
            EndCall(channelId).then(({ data }) => {
                debugger;
                console.log(data);

            })
        }
        catch (e) { console.log(e) }
    }
    const MeetingVerification = (MeetID) => {

        VerifyMeeting(MeetID).then((data) => {

            if (data.data) {
                setEnd(false)
            }
            else {
                seterrorTitle("The meeting has been ended.");
                setEnd(true)
            }

        })
    }

    useEffect(() => {

        var data = JSON.parse(localStorage.getItem("MeetupLink"))
        if (data !== null) {
            setEnd(false)
            var url = window.location.protocol + '//' + window.location.host + '/screen_Share/' + data.encWEBLink;
            setinvitelink(url);
            setRole(data.role)
            console.log(data);

            getAllMembers(data.channelId);

            if (data.role === "Host") {
                option.channel = data.channelId;
                option.token = data.token;
                option.uid = data.userID;
                option.role = data.role;
                joinChannel('host')

            }
            else {
                option.channel = data.channelId;
                option.token = data.token;
                option.uid = data.userId;
                option.role = data.role;
                MeetingVerification(option.channel);
                joinChannel('audience')
            }
        }
        else {
            seterrorTitle("The meeting has been ended.");
            setEnd(true)
        }
        // console.log();

    }, [])

    return (
        <React.Fragment>{end ? <MeetupError title={errorTitle} /> :
            <Container fluid className="main-content-container">
                {isLive ?
                    <Grid container className="container-wrap">

                        <div className="main-video-container" >
                            {role === "Host" ?
                                <div id="local_stream" className="local_stream full-screen-video"> </div>
                                : <div id="remote_video_" className="full-screen-video"> </div>
                            }


                            <div className="button-area">
                                <div class="d-flex justify-content-around">
                                    <button class="btn btn-primary" onClick={() => AudioHandle(isaudio)}><i className="material-icons screen-mic">{!isaudio ? 'mic_off' : 'mic'}</i></button>
                                    <button class="btn btn-danger" onClick={() => leaveEventHandle(option.role)}>End Meeting</button>
                                    <button class="btn btn-primary" onClick={handleDialog}><i className="material-icons screen-mic">add</i></button>
                                </div>
                            </div>
                        </div>

                        {/* -----------------------------Side Panel---------------------------------- */}

                        <div className={`user-chat-block ${activesSide ? "active" : ""}`}>
                            <div class="collapse-btn" onClick={HandleToggle}>
                                <span class="collapse-icon">
                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="arrow-circle-left" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-arrow-circle-left fa-w-16 fa-3x"><path fill="currentColor" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zm28.9-143.6L209.4 288H392c13.3 0 24-10.7 24-24v-16c0-13.3-10.7-24-24-24H209.4l75.5-72.4c9.7-9.3 9.9-24.8.4-34.3l-11-10.9c-9.4-9.4-24.6-9.4-33.9 0L107.7 239c-9.4 9.4-9.4 24.6 0 33.9l132.7 132.7c9.4 9.4 24.6 9.4 33.9 0l11-10.9c9.5-9.5 9.3-25-.4-34.3z" class=""></path></svg>
                                </span>
                            </div>
                            <div class="chat-user-block">
                                <div class="user-head d-inline-block w-100">
                                    <h6>Participants <span>(10)</span></h6>
                                </div>
                                <div class="chat-user-list">
                                    <ul class="list-unstyled m-0">
                                        {
                                            participants.map((item) => (
                                                <li class="mb-2">
                                                    <div class="d-flex flex-wrap justify-content-between">
                                                        <div class="chat-user-img-name d-inline-block">
                                                            <span class="user-img p-2">
                                                                <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png" alt="Alternate Text" />
                                                            </span>
                                                            <span class="user-name d-inline-block mx-3">{item.name} {' '} {'(' + item.role_Name + ')'}</span>
                                                        </div>
                                                        <div class="chat-user-actions d-flex flex-wrap justify-content-between">
                                                            <span class="chat-user-mic mx-2">
                                                                <i className="material-icons">{item.isMic ? 'mic' : 'mic_off'}</i>
                                                            </span>
                                                            {/* <span class="chat-user-video mx-2">
                                                    <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="video" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-video fa-w-18 fa-2x"><path fill="currentColor" d="M336.2 64H47.8C21.4 64 0 85.4 0 111.8v288.4C0 426.6 21.4 448 47.8 448h288.4c26.4 0 47.8-21.4 47.8-47.8V111.8c0-26.4-21.4-47.8-47.8-47.8zm189.4 37.7L416 177.3v157.4l109.6 75.5c21.2 14.6 50.4-.3 50.4-25.8V127.5c0-25.4-29.1-40.4-50.4-25.8z" class=""></path></svg>
                                                </span> */}
                                                        </div>
                                                    </div>
                                                </li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    :
                    <div className="meeting-loader">
                        <span>Initializing Meeting</span>
                        <LinearProgress color="secondary" />
                    </div>
                }


                {/* -----------------------------Invitation Dialog---------------------------------- */}
                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    className="main-dialog"
                >
                    {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                    <DialogContent className="custom-dialog">
                        <h1 className="dialog-title">Copy Meeting Invitation</h1>
                        <div>
                            <span class="LinkBox">{invitelink}</span>
                        </div>
                        {copy ?
                            <div className="dialog-copied">
                                <span>copied! <i className="material-icons">check</i> </span>
                            </div>
                            : null
                        }
                        <div class="form-group mt-4" style={{ textAlign: 'center' }}>
                            <button onClick={handleCopy}>Copy Invitation Link</button>
                        </div>
                    </DialogContent>
                </Dialog>
            </Container>
        }</React.Fragment>
    );
}

export default Live_Srceen_Sharing;