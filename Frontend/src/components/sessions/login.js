import React, { useState } from 'react';
import { Container, Row, Col } from "shards-react";
import './loginstyle.css'
import Logo from '../../styles/images/S&DLogo.png'
import useAuth from '../../Authentication/useAuth'
import history from '../../history.js';
import {
    FormInput,
    FormCheckbox
} from "shards-react";
import { useHistory } from 'react-router';
import { CircularProgress, Button, Checkbox, MenuItem, Input, FormControlLabel, } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';

const errors = {
    message: "",
};
const useStyles = makeStyles(() => ({
    buttonProgress: {
        position: 'absolute',
        top: '89%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },

}))
const login = () => {
    const { login1 } = useAuth();
    const [message, setMessage] = useState(errors)
    const [loading, setLoader] = useState(false)
    const [userInfo, setUserInfo] = useState({
        usR_LOGINID: '',
        usR_PASSWORD: '',
        remember: false
    })
    const classes = useStyles();
    //clearning error states and message
    const clearState = () => {
        setMessage({ ...errors });
    };
    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const [values, setValues] = React.useState({

        showPassword: false,
    });
    const handleChange = ({ target: { name, value } }) => {
        let temp = { ...userInfo }
        temp[name] = value
        setUserInfo(temp)
    }
    const handleSubmit = async () => {
        debugger;
        clearState();
        setLoader(true)
        try {
            var response = await login1(userInfo.usR_LOGINID, userInfo.usR_PASSWORD)
            debugger;
            setLoader(false);
            if (response) {
                history.push('/dashboard');
            }
            else {

                setMessage({message: "Username/password is incorrect."})
            }
            debugger;
        }
        catch (e) {
            console.log(e)

        }
    }

    return (

        <div className="gradient">
            <div className="container h-100" >
                <div className="row h-100  align-items-center justify-content-center" style={{ textAlign: "center" }} >
                    <div className="col-md-9"  >
                        <div className="LoginForm shadow-lg">
                            <div className="row" style={{height:'500px'}}>
                                <div className="col-md-6 d-flex justify-content-center align-items-center">
                                    <div className="LoginFormLeft">

                                        <h1>Login</h1>
                                        <ValidatorForm onSubmit={handleSubmit}>


                                            <div className="form-group position-relative mb-4">

                                                <TextValidator
                                                    placeholder="Username"
                                                    onChange={handleChange}
                                                    type="text"
                                                    name="usR_LOGINID"
                                                    variant="outlined"
                                                    className="mb-2 w-100"
                                                    value={userInfo.usR_LOGINID}
                                                />

                                                <i className="fa fa-user-o"></i>
                                            </div>
                                            <div className="position-relative mb-4">

                                                <TextValidator

                                                    placeholder="Password"
                                                    onChange={handleChange}
                                                    name="usR_PASSWORD"
                                                    value={userInfo.usR_PASSWORD}
                                                    type={values.showPassword ? 'text' : 'password'}
                                                    variant="outlined"
                                                    className="mb-2 w-100"
                                                    customInput={Input}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                edge="end"
                                                            >
                                                                {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                />

                                            </div>
                                            <div className="row mt-4 mb-4 ml-2 form-group">
                                                <FormControlLabel
                                                    className="mb-1 min-w-288"
                                                    name="remember"
                                                    onChange={handleChange}
                                                    control={
                                                        <Checkbox
                                                            size="small"
                                                            onChange={({
                                                                target: { checked },
                                                            }) =>
                                                                handleChange({
                                                                    target: {
                                                                        name: 'remember',
                                                                        value: checked,
                                                                    },
                                                                })
                                                            }
                                                            checked={userInfo.remember}
                                                        />
                                                    }
                                                    label="Keep me signed in"
                                                />
                                            </div>
                                            <span className="error-message">{message.message}</span>
                                            <div className="relative">
                                                <Button
                                                    pill
                                                    className=""
                                                    disabled={loading}
                                                    // onClick={() => handleSubmit()}
                                                    type="submit"
                                                >
                                                    Sign In
                                            </Button>
                                                {loading && (
                                                    <CircularProgress
                                                        size={24}
                                                        className={
                                                            classes.buttonProgress
                                                        }
                                                    />
                                                )}
                                            </div>
                                        </ValidatorForm>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="LoginFormRight ">
                                        <img src={Logo} />
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default login;