import React, { useEffect, useState } from 'react'
import { Button } from "shards-react";
import logo_color from '../../styles/images/logo-color.png'
import TextField from '@material-ui/core/TextField';
import history from '../../history.js';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { Register } from './SessionService'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const initialState = {
    email: '',
    pass: '',
    firstName: '',
    lastName: '',
    gender: 'Male',
    picPath: '',
}

const Signup = () => {

    function handleClick() {

        history.push("/Signin");
    }
    const [user, setUser] = useState(initialState)
    const [visible, setvisible] = useState(false)

    const [error, seterror] = useState({
        pass: ''
    });

    const ClearState = () => {
        setUser({ ...initialState })
    }
    const toggleVisible = () => {
        debugger
        setvisible(prevCheck => !prevCheck);

    }

    const handleChange = ({ target: { name, value } }) => {

        let temp = { ...user }
        temp[name] = value
        setUser(temp)
    }

    const handleSubmit = () => {

        seterror({ pass: "" })

        if (user.pass.length < 6) {
            seterror({ pass: "Password length must be at least 6 digits long." })
        }
        else {
            Register(user).then(({ data }) => {
                debugger
                console.log(data);
                if (data.message === "Successfully signup.") {
                    toast.success("Successfully Registered.")
                    ClearState();
                }
                else if (data.message === "Email already exist.") {
                    toast.error(data.message)
                }
            })
        }

    }

    return (
        <div class="signup-sec" >
            <ToastContainer />
            <div class="container">
                <div class="row">
                    <div class="col-md-12 d-flex flex-wrap justify-content-center align-items-center">
                        <div class="signup-block">
                            <div class="signup-inner signup-area">
                                <div class="d-inline-block w-100">
                                    <a class="d-inline-block" href="javascript:;"><img src={logo_color} alt="" /></a>
                                    <p class="my-3 signup-text text-center">Sign up</p>
                                </div>
                                <div class="signup-form-block">
                                    <ValidatorForm onSubmit={handleSubmit}>
                                        <div id="signup" class="login100-form validate-form">
                                            <div class="form-row m-0">

                                                <div class="form-group w-100">
                                                    {/* <label class="label-text" for="first-name">First Name *</label> */}
                                                    <TextValidator
                                                        className="form-group w-100"
                                                        type="text"
                                                        label="First Name"
                                                        autocomplete="off"
                                                        name="firstName"
                                                        value={user.firstName}
                                                        onChange={handleChange}
                                                        validators={['required', 'matchRegexp:^[a-zA-Z ]+$']}
                                                        errorMessages={['this field is required', 'first name is invalid']}
                                                    />
                                                    <span class="icon">
                                                        <svg width="20px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-user fa-w-14 fa-2x"><path fill="#D2D2D2" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" class=""></path></svg>
                                                    </span>
                                                </div>
                                                <div class="form-group w-100">
                                                    {/* <label class="label-text" for="last-name">Last Name *</label> */}
                                                    <TextValidator
                                                        className="form-group w-100"
                                                        type="text"
                                                        label="First Name"
                                                        autocomplete="off"
                                                        name="lastName"
                                                        value={user.lastName}
                                                        onChange={handleChange}
                                                        validators={['required', 'matchRegexp:^[a-zA-Z ]+$']}
                                                        errorMessages={['this field is required', 'last name is invalid']}
                                                    />
                                                    <span class="icon">
                                                        <svg width="20px" aria-hidden="true" focusable="false" data-prefix="far" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-user fa-w-14 fa-2x"><path fill="#D2D2D2" d="M313.6 304c-28.7 0-42.5 16-89.6 16-47.1 0-60.8-16-89.6-16C60.2 304 0 364.2 0 438.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-25.6c0-74.2-60.2-134.4-134.4-134.4zM400 464H48v-25.6c0-47.6 38.8-86.4 86.4-86.4 14.6 0 38.3 16 89.6 16 51.7 0 74.9-16 89.6-16 47.6 0 86.4 38.8 86.4 86.4V464zM224 288c79.5 0 144-64.5 144-144S303.5 0 224 0 80 64.5 80 144s64.5 144 144 144zm0-240c52.9 0 96 43.1 96 96s-43.1 96-96 96-96-43.1-96-96 43.1-96 96-96z" class=""></path></svg>
                                                    </span>
                                                </div>
                                                {/* <div class="form-group w-100">
                                                    <Select
                                                        name="gender"
                                                        value={user.gender}
                                                        className="form-control mb-0"
                                                        style={{ textAlign: "left" }}
                                                        onChange={handleChange}
                                                    >
                                                        <MenuItem value="Male">Male</MenuItem>
                                                        <MenuItem value="Female">Female</MenuItem>
                                                    </Select>
                                                    <span class="icon">
                                                        <svg width="25px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="restroom" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" class="svg-inline--fa fa-restroom fa-w-20 fa-2x"><path fill="#D2D2D2" d="M128 128c35.3 0 64-28.7 64-64S163.3 0 128 0 64 28.7 64 64s28.7 64 64 64zm384 0c35.3 0 64-28.7 64-64S547.3 0 512 0s-64 28.7-64 64 28.7 64 64 64zm127.3 226.5l-45.6-185.8c-3.3-13.5-15.5-23-29.8-24.2-15 9.7-32.8 15.5-52 15.5-19.2 0-37-5.8-52-15.5-14.3 1.2-26.5 10.7-29.8 24.2l-45.6 185.8C381 369.6 393 384 409.2 384H464v104c0 13.3 10.7 24 24 24h48c13.3 0 24-10.7 24-24V384h54.8c16.2 0 28.2-14.4 24.5-29.5zM336 0h-32c-8.8 0-16 7.2-16 16v480c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V16c0-8.8-7.2-16-16-16zM180.1 144.4c-15 9.8-32.9 15.6-52.1 15.6-19.2 0-37.1-5.8-52.1-15.6C51.3 146.5 32 166.9 32 192v136c0 13.3 10.7 24 24 24h8v136c0 13.3 10.7 24 24 24h80c13.3 0 24-10.7 24-24V352h8c13.3 0 24-10.7 24-24V192c0-25.1-19.3-45.5-43.9-47.6z" class=""></path></svg>
                                                    </span>
                                                </div> */}
                                                <div class="form-group w-100">
                                                    {/* <label class="label-text" for="singup-user">Username or Email *</label> */}
                                                    <TextValidator
                                                        className="form-group w-100"
                                                        type="text"
                                                        label="Email"
                                                        autocomplete="off"
                                                        name="email"
                                                        value={user.email}
                                                        onChange={handleChange}
                                                        validators={['required', 'isEmail']}
                                                        errorMessages={['this field is required', 'email is not valid']}
                                                    />
                                                    <span class="icon">
                                                        <svg width="20px" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-user fa-w-14 fa-2x"><path fill="#D2D2D2" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z" class=""></path></svg>
                                                    </span>
                                                </div>
                                                <div class="form-group w-100">
                                                    {/* <label class="label-text" for="signup-password">Password *</label> */}
                                                    <TextValidator
                                                        className="form-group w-100"
                                                        type={visible ? "text" : "password"}
                                                        label="Password"
                                                        autocomplete="off"
                                                        name="pass"
                                                        value={user.pass}
                                                        onChange={handleChange}
                                                        validators={['required']}
                                                        errorMessages={['this field is required']}
                                                    />
                                                    {visible ?
                                                    <span class="icon" onClick={toggleVisible}>
                                                        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-eye fa-w-18 fa-2x" width="20px" height="20px"><path fill="#adadad" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z" class=""></path></svg>
                                                    </span>:
                                                    <span class="icon" onClick={toggleVisible}>
                                                         <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="20px" height="20px" class="svg-inline--fa fa-eye-slash fa-w-20 fa-2x"><path fill="#adadad" class="" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path></svg>
                                                    </span>
                                                    }
                                                </div>
                                                <span className="signup-error">{error.pass}</span>
                                                <div class="form-group mt-4">
                                                    <button type="submit">Signup</button>
                                                </div>
                                            </div>
                                        </div>
                                    </ValidatorForm>
                                </div>
                                <p class="my-2 signup-link">Already Registered? <a onClick={handleClick}>Login Now</a></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Signup;