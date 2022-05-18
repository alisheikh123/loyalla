import React, { useEffect } from 'react'
import logo_color from '../../styles/images/logo-color.png'
import './style.css'

const MeetupError = () => {

    useEffect(() => {
       
    }, [])

    return (

        <div className="meeterror-sec">
            <div className="container">
                <div className="row">
                    <div className="col-md-12 d-flex flex-wrap justify-content-center align-items-center">
                        <div className="meeterror-block login-area" >
                            <div className="login-inner">
                                <div className="d-inline-block w-100">
                                    <a className="d-inline-block">
                                        <img src={logo_color} alt="" />
                                    </a>
                                    <p className="my-3 meeterror-text text-center">Screen Sharing</p>
                                </div>
                                <div className="meeterror-form-block">
                                    <p>The meeting has been ended.</p>
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default MeetupError;