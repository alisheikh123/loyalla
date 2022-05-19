import React, { useEffect, useState } from 'react'
import { Col, Row, Footer } from "shards-react";
import logo_color from '../../styles/images/logo-color.png'
import { Link } from "react-router-dom";
import './style.css'

const Head = () => {
    return (
        <header class="pb-0">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 p-0 landing-page">
                        <nav class="navbar navbar-expand-lg py-0 pb-3 navbar-light justify-content-between">
                            <a class="navbar-brand p-0" href="#">
                                <img src={logo_color} alt="Meetup" />
                            </a>
                            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                                <span class="navbar-toggler-icon"></span>
                            </button>
                            <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                                <ul class="navbar-nav list-unstyled m-0 w-100 d-flex flex-wrap justify-content-end">
                                    <li class="nav-item active">
                                        <a class="nav-link" href="#">About Us <span class="sr-only">(current)</span></a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Features</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Pricing</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" href="#">Download</a>
                                    </li>
                                    <li class="nav-item">
                                        <div class="login-signup h-100">
                                            <ul class="list-unstyled m-0 h-100 d-flex flex-wrap align-items-center">
                                                <li class="sign-in mx-2">
                                                    <Link to="/signin"> Sign in </Link>
                                                </li>
                                                <li class="sign-up mx-2">
                                                    <Link to="/signup"> Sign up for free </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default Head;