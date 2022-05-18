import React from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import InputField from "../../components/FormFields/inputField";
import PhoneField from "../../components/FormFields/phoneField";
import Button from "@material-ui/core/Button";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import "./signup.css";

function Signup(props) {
  const validate = Yup.object({
    fullName: Yup.string("Only letters are allowed")
      .min(4, "at least 4 characters")
      .max(15, "Not more than 15 characters")
      .required("Required"),
    emailAddress: Yup.string()
      .email("Please enter a valid email address")
      .required("Required"),
    phoneNum: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
  });
  async function submitData(contentType, formData) {
    await axios({
      url: "http://172.107.33.108:1600/api/v1/User",
      method: "POST",
      data: formData,
      headers: {
        "Content-Type": contentType,
      },
    })
      .then((result) => {
        console.log(result);
        alert("Your Message Has Been Submitted Successfully!");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function handleSignup(values) {
    const new_user = {
      Id: 0,
      FullName: values.fullName,
      PhoneNo: values.phoneNum,
      Email: values.emailAddress,
      Password: values.password,
    };

    const formData = new FormData();

    formData.append("Id", 0);
    formData.append("FullName", new_user.FullName);
    formData.append("PhoneNo", new_user.PhoneNo);
    formData.append("Email", new_user.Email);
    formData.append("Password", new_user.Password);

    submitData("multipart/form-data", formData);
  }
  return (
    <Grid container className="gridContainer">
      <Grid item xs={12} lg={5} className="leftGrid">
        <div>
          <img src="/NigehbaanAppIcon.png"/>
        </div>
      </Grid>
      <Grid item lg={1} className="dividerGrid">
        <Divider orientation="vertical" flexItem className="divider" />
      </Grid>
      <Grid item xs={12} lg={6} className="rightGrid">
        <Formik
          initialValues={{
            fullName: "",
            emailAddress: "",
            phoneNum: "",
            password: "",
          }}
          validationSchema={validate}
          onSubmit={handleSignup}
        >
          {(formik) => (
            <div>
              <span>
                Already have an account?
                <div>
                  <Link to="/login">Login</Link>
                </div>
              </span>
              <Form>
                <InputField name="fullName" label="Full Name" />
                <InputField name="emailAddress" label="Email Address" />
                <PhoneField name="phoneNum" />
                <InputField name="password" label="Password" type="password" />
                <div className="actionBtns">
                  <Button type="submit" variant="contained" color="primary">
                    Signup
                  </Button>
                  <Button type="button" variant="contained" color="default">
                    Cancel
                  </Button>
                </div>
                <span className="note">
                  By continuing, you agree to accept our Privacy Policy & Terms
                  of Services
                </span>
              </Form>
            </div>
          )}
        </Formik>
      </Grid>
    </Grid>
  );
}

export default Signup;
