import React, { useEffect, useState } from 'react'
import { Col, Row } from "shards-react";
import Head from './header'
import Foot from './footer'
import Section from './sections'
import './media.css'
import './style.css'
import AOS from 'aos';
import "aos/dist/aos.css";

const landing = () => {

    useEffect(() => {
        AOS.init();
    }, []);
    return (
        <div className="landing-page">
            <Head />
            <Section />
            <Foot />

        </div>
    )
}
export default landing;