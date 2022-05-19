import React, { useEffect, useState } from 'react'
import { Col, Row } from "shards-react";
import logo_white from '../../styles/images/logo-white.png'
import './style.css'

const Foot = () => {

    return (
        <footer>
            <div class="container">
                <div class="row">
                    <div class="col-md-12 p-0 d-flex flex-wrap justify-content-between foot-main-content">
                        <div class="col-lg-3" data-aos="fade-up" data-aos-duration="4000">
                            <div class="foot foot-logo-descript">
                                <p class="logo">
                                    <a href="javascript:;">
                                        <img src={logo_white} alt="" />
                                    </a>
                                </p>
                                <p class="descript">A communication software design and developed by DigitalLandScape.Pvt.Ltd (www.dls-global.com)</p>
                            </div>
                        </div>
                        <div class="col-lg-3" data-aos="fade-up" data-aos-duration="4000">
                            <div class="foot foot-links">
                                <h5 class="title">Terms & Conditions</h5>
                                <ul class="list-unstyled m-0">
                                    <li>
                                        <p class="my-2 d-flex flex-wrap justify-content-start">
                                            <span></span>
                                            <a href="javascript:;" class="ml-3">Privacy Policy</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p class="my-2 d-flex flex-wrap justify-content-start">
                                            <span></span>
                                            <a href="javascript:;" class="ml-3">Online Security</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p class="my-2 d-flex flex-wrap justify-content-start">
                                            <span></span>
                                            <a href="javascript:;" class="ml-3">Preventing Fraud</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p class="my-2 d-flex flex-wrap justify-content-start">
                                            <span></span>
                                            <a href="javascript:;" class="ml-3">FAQs</a>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3" data-aos="fade-up" data-aos-duration="4000">
                            <div class="foot foot-contact">
                                <h5 class="title">Contact Us</h5>
                                <ul class="list-unstyled m-0">
                                    <li>
                                        <p class="my-2 d-flex flex-wrap justify-content-start">
                                            <span class="icon">
                                            <i className="material-icons" style={{color:"white" ,fontSize : '19px'}}>phone</i>

                                            </span>
                                            <a href="tel:02134536652" class="ml-3">02134536652</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p class="my-2 d-flex flex-wrap justify-content-start">
                                            <span>
                                            <i className="material-icons" style={{color:"white" ,fontSize : '19px'}}>email</i>
                                                
                                            </span>
                                            <a href="mailto:info@dls-global.com" class="ml-3">info@dls-global.com</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p class="my-2 d-flex flex-wrap justify-content-start">
                                            <span>
                                            <i className="material-icons" style={{color:"white" ,fontSize : '19px'}}>location_on</i>
                                            </span>
                                            <a href="javascript:;" class="ml-3">Karachi</a>
                                        </p>
                                    </li>
                                    <li>
                                        <p class="my-2 d-flex flex-wrap justify-content-start">
                                            <span>
                                                <i className="material-icons" style={{ color: "white", fontSize: '19px' }}>language</i>
                                            </span>
                                            <a href="www.dls-global.com" class="ml-3">www.dls-global.com</a>
                                        </p>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-lg-3" data-aos="fade-up" data-aos-duration="4000">
                            <div class="foot foot-subscribe">
                                <h5 class="title">Suscribe to Newsletter</h5>
                                <p>To be notified about our new update/features submit your email.</p>
                                <div class="subcribe-form">
                                    <form action="" method="post">
                                        <div class="form-row">
                                            <div class="form-group">
                                                <input type="email" class="form-control" placeholder="Your Email Address..." />
                                                <button>
                                                    {/* <svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-paper-plane fa-w-16 fa-2x">
                                                    <path fill="#ffffff" d="M440 6.5L24 246.4c-34.4 19.9-31.1 70.8 5.7 85.9L144 379.6V464c0 46.4 59.2 65.5 86.6 28.6l43.8-59.1 111.9 46.2c5.9 2.4 12.1 3.6 18.3 3.6 8.2 0 16.3-2.1 23.6-6.2 12.8-7.2 21.6-20 23.9-34.5l59.4-387.2c6.1-40.1-36.9-68.8-71.5-48.9zM192 464v-64.6l36.6 15.1L192 464zm212.6-28.7l-153.8-63.5L391 169.5c10.7-15.5-9.5-33.5-23.7-21.2L155.8 332.6 48 288 464 48l-59.4 387.3z" class=""></path>
                                                </svg> */}
                                                    <i className="material-icons" style={{ color: "white" }}>send</i>
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <p>or Connect with Us</p>
                                <ul class="list-unstyled d-flex flex-wrap justify-content-start social-icons">
                                    <li>
                                        <a href="javascript:;">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="facebook" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-facebook fa-w-16 fa-2x"><path fill="#ffffff" d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z" class=""></path></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="twitter-square" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-twitter-square fa-w-14 fa-2x"><path fill="#ffffff" d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-48.9 158.8c.2 2.8.2 5.7.2 8.5 0 86.7-66 186.6-186.6 186.6-37.2 0-71.7-10.8-100.7-29.4 5.3.6 10.4.8 15.8.8 30.7 0 58.9-10.4 81.4-28-28.8-.6-53-19.5-61.3-45.5 10.1 1.5 19.2 1.5 29.6-1.2-30-6.1-52.5-32.5-52.5-64.4v-.8c8.7 4.9 18.9 7.9 29.6 8.3a65.447 65.447 0 0 1-29.2-54.6c0-12.2 3.2-23.4 8.9-33.1 32.3 39.8 80.8 65.8 135.2 68.6-9.3-44.5 24-80.6 64-80.6 18.9 0 35.9 7.9 47.9 20.7 14.8-2.8 29-8.3 41.6-15.8-4.9 15.2-15.2 28-28.8 36.1 13.2-1.4 26-5.1 37.8-10.2-8.9 13.1-20.1 24.7-32.9 34z" class=""></path></svg>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="javascript:;">
                                            <svg aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google-plus" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-google-plus fa-w-16 fa-2x"><path fill="#ffffff" d="M256,8C119.1,8,8,119.1,8,256S119.1,504,256,504,504,392.9,504,256,392.9,8,256,8ZM185.3,380a124,124,0,0,1,0-248c31.3,0,60.1,11,83,32.3l-33.6,32.6c-13.2-12.9-31.3-19.1-49.4-19.1-42.9,0-77.2,35.5-77.2,78.1S142.3,334,185.3,334c32.6,0,64.9-19.1,70.1-53.3H185.3V238.1H302.2a109.2,109.2,0,0,1,1.9,20.7c0,70.8-47.5,121.2-118.8,121.2ZM415.5,273.8v35.5H380V273.8H344.5V238.3H380V202.8h35.5v35.5h35.2v35.5Z" class=""></path></svg>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <p class="copy-right text-align">Copyrights ©2021 Meetup. All Rights Reserved.</p>
        </footer>
    )
}
export default Foot