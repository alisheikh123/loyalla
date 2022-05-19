import React, { useEffect, useState } from 'react'
import { Col, Row, Footer } from "shards-react";
import chat_icon from '../../styles/images/chat-icon.png'
import clock_icon from '../../styles/images/clock-icon.png'
import conference_call from '../../styles/images/conference-call.png'
import external_user from '../../styles/images/external-user-icon.png'
import file_icon from '../../styles/images/file-icon.png'
import landing from '../../styles/images/landing-banner.png'
import logo_white from '../../styles/images/logo-white.png'
import market_global from '../../styles/images/market-globe-icon.png'
import meet_schedule from '../../styles/images/meet-schedule-icon.png'
import mockup_screen from '../../styles/images/mockup-screen.png'
import participent from '../../styles/images/participent-icon.png'
import screen_share from '../../styles/images/screen-share-icon.png'
import security_icon from '../../styles/images/security-icon.png'
import signup_bg from '../../styles/images/signup-bg.png'
import step_1 from '../../styles/images/step1-icon.png'
import step_2 from '../../styles/images/step2-icon.png'
import step_3 from '../../styles/images/step3-icon.png'
import { Link} from "react-router-dom";
import step_arrow from '../../styles/images/steps-arrow.png'
import './style.css'

const Section = () => {
    return (
        <div>
            <section class="banner-sec">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="banner-content">
                                <div class="meetup-block" data-aos="fade-right" data-aos-duration="5000">
                                    <h3>MeetUp</h3>
                                    <p>Meet, chat, call and collaborate in just one place.</p>
                                </div>
                                <div class="connect-block" data-aos="fade-left" data-aos-duration="5000">
                                    <h3>Connect Now</h3>
                                    <ul class="list-unstyled m-0 my-4 d-flex flex-wrap align-items-center">
                                        <li class="sign-up mr-3">
                                            <Link to="/signup"> Sign up for free </Link>
                                            
                                            {/* <a href="account/Login?id=1"> Sign up for free </a> */}
                                        </li>
                                        <li class="sign-in mr-3">
                                        <Link to="/signin"> Sign in </Link>

                                            {/* <a href="account/Login"> Sign in </a> */}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="top-feature-sec">
                <div class="container">
                    <div class="row">
                        <div class="d-flex flex-wrap justify-content-between col-12 p-0">
                            <div class="col-lg-4 mb-3">
                                <div data-aos="fade-left" data-aos-duration="5000" class="feature-block meetup-timer d-flex flex-wrap flex-column justify-content-start">
                                    <span class="d-inline-block w-100 feature-icon">
                                        <img src={clock_icon} alt="" />
                                    </span>
                                    <h4>Meetup for 60 minutes</h4>
                                    <p>Schedule an unlimited number of meetings and, for a limited time, meet for up to 24 hours.</p>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <div data-aos="fade-up" data-aos-duration="5000" class="feature-block host-member d-flex flex-wrap flex-column justify-content-start">
                                    <span class="d-inline-block w-100 feature-icon">
                                        <img src={participent} alt="" />
                                    </span>
                                    <h4>Host up to 100 participants</h4>
                                    <p>Schedule an unlimited number of meetings and, for a limited time, meet for up to 24 hours.</p>
                                </div>
                            </div>
                            <div class="col-lg-4 mb-3">
                                <div data-aos="fade-right" data-aos-duration="5000" class="feature-block unlimited-chat d-flex flex-wrap flex-column justify-content-start">
                                    <span class="d-inline-block w-100 feature-icon">
                                        <img src={chat_icon} alt="" />
                                    </span>
                                    <h4>Unlimited chat</h4>
                                    <p>For a limited time, host up to 300 meeting participants at a time.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="mockup-sec">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12 mockup-content d-flex flex-wrap justify-content-between">
                            <div class="col-lg-4 pl-0">
                                <div class="mockup-descript" data-aos="fade-right" data-aos-duration="5000">
                                    <p>With Our MeetUp Application connect with everyone everywhere!</p>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <div class="mockup-screen" data-aos="fade-left" data-aos-duration="5000">
                                    <img src={mockup_screen} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="features-block-sec">
                <div class="container">
                    <div class="row">
                        <div class="free-feature-descript" data-aos="fade-up" data-aos-duration="5000">
                            <p>get all these features for free</p>
                        </div>
                        <div class="col-md-12 p-0 d-flex flex-wrap justify-content-between free-features-list">
                            <div class="col-lg-5">
                                <div data-aos="fade-right" data-aos-duration="5000" class="free-feature-block d-flex align-items-center justify-content-lg-between">
                                    <span class="free-icon">
                                        <img src={meet_schedule} alt="" />
                                    </span>
                                    <div class="feature-descript">
                                        <p class="title">Scheduled meeting</p>
                                        <p class="text">Plan your meetings and invite participants in advance.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div data-aos="fade-left" data-aos-duration="5000" class="free-feature-block d-flex align-items-center justify-content-lg-between">
                                    <span class="free-icon">
                                        <img src={file_icon} alt="" />
                                    </span>
                                    <div class="feature-descript">
                                        <p class="title">File sharing</p>
                                        <p class="text">Securely store, access, and co-author files with Word, Excel, and PowerPoint for the web.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div data-aos="fade-right" data-aos-duration="5000" class="free-feature-block d-flex align-items-center justify-content-lg-between">
                                    <span class="free-icon">
                                        <img src={screen_share} alt="" />
                                    </span>
                                    <div class="feature-descript">
                                        <p class="title">Screen sharing</p>
                                        <p class="text">Choose what you show in a chat or meeting: your desktop, a specific app, a presentation, or a file.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div data-aos="fade-left" data-aos-duration="5000" class="free-feature-block d-flex align-items-center justify-content-lg-between">
                                    <span class="free-icon">
                                        <img src={security_icon} alt="" />
                                    </span>
                                    <div class="feature-descript">
                                        <p class="title">Security and compliance</p>
                                        <p class="text">Help keep information secure with Microsoft Teams data encryption, at rest and in transit.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div data-aos="fade-right" data-aos-duration="5000" class="free-feature-block d-flex align-items-center justify-content-lg-between">
                                    <span class="free-icon">
                                        <img src={external_user} alt="" />
                                    </span>
                                    <div class="feature-descript">
                                        <p class="title">Up to 500K internal and external users</p>
                                        <p class="text">Communicate and collaborate with large and small teams, including people outside of your organization.</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-5">
                                <div data-aos="fade-left" data-aos-duration="5000" class="free-feature-block d-flex align-items-center justify-content-lg-between">
                                    <span class="free-icon">
                                        <img src={market_global} alt="" />
                                    </span>
                                    <div class="feature-descript">
                                        <p class="title">Market availabilty</p>
                                        <p class="text">Connect across Windows, Mac, iOS, and Android. Available in 53 languages and 181 markets.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="three-step-sec">
                <div class="container">
                    <div class="row">
                        <div class="three-step-descript" data-aos="fade-up" data-aos-duration="5000">
                            <p>3 easy steps to start meetingon Meetup</p>
                        </div>
                        <div class="three-step-content w-100">
                            <div class="d-flex flex-wrap justify-content-between">
                                <div class="col-lg-4 my-3">
                                    <div class="step-content step1" data-aos="flip-right" data-aos-duration="4000">
                                        <div class="icon-area">
                                            <img src={step_1} alt="" />
                                        </div>
                                        <p class="step-title">Create a room</p>
                                        <p class="step-text m-0">Create a room as a Host</p>
                                    </div>
                                    <img data-aos="fade-right" data-aos-duration="10000" class="step-arrow" src={step_arrow} alt="" />
                                </div>
                                <div class="col-lg-4 my-3">
                                    <div class="step-content step2" data-aos="flip-right" data-aos-duration="4000">
                                        <div class="icon-area">
                                            <img src={step_2} alt="" />
                                        </div>
                                        <p class="step-title">Send an Invitation</p>
                                        <p class="step-text m-0">Send an invitation ID from your friends list</p>
                                    </div>
                                    <img data-aos="fade-right" data-aos-duration="10000" class="step-arrow" src={step_arrow} alt="" />
                                </div>
                                <div class="col-lg-4 my-3">
                                    <div class="step-content step3" data-aos="flip-right" data-aos-duration="4000">
                                        <div class="icon-area">
                                            <img src={step_3} alt="" />
                                        </div>
                                        <p class="step-title">Start the meeting</p>
                                        <p class="step-text m-0">Start the meeting by</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section class="get-meetup-sec">
                <div class="container">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="signup-form-block" data-aos="flip-left" data-aos-duration="5000">
                                <h4>Get MeetUp for your organization today</h4>
                                <form id="sign-up" action="" method="POST">
                                    <div class="form-row">
                                        <div class="form-group">
                                            <input type="email" class="form-control" placeholder="Email Address" />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <input type="password" class="form-control" placeholder="Password" />
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group">
                                            <button type="submit" class="btn btn-submit">SIGN-UP FOR FREE</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Section;