import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "./login.css";
import useAuth from "../../Authentication/useAuth";

const InitialError = {
  email: "",
  password: "",
};

function Login(props) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);
  const [errors, setErrors] = useState(InitialError);

  const ClearError = () => {
    setErrors(InitialError);
  };

  //read the values of loading and errorMessage from context

  const handleLogin = async (e) => {
    e.preventDefault();
    ClearError();
    setloading(false);
    if (email === "" && password === "") {
      setErrors({
        email: "This is a required field.",
        password: "This is a required field.",
      });
    } else if (email === "") {
      setErrors({ email: "This is a required field." });
    } else if (password === "") {
      setErrors({ password: "This is a required field." });
    } else {
      try {
        let response = await login(email, password); //login action makes the request and handles all the neccessary state changes
        setloading(true);
        if (response.message === "Login Successfully!") {
          //navigate to dashboard on success
          props.history.push("/dashboard");
        } else {
          alert("Invalid");
        }
      } catch (error) {
        props.history.push("/login");
      }
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setErrors({
      email: "",
      password: "",
    });
  };

  return (
    <Grid container className="gridContainer">
      <Grid item xs={12} lg={5} className="leftGrid">
      <div>
          <img src="/NigehbaanAppIcon.png"/>
        </div>
        {/* <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="500.423"
            height="205.874"
            viewBox="0 0 500.423 205.874"
          >
            <g
              id="Group_5004"
              data-name="Group 5004"
              transform="translate(-168.322 -13.208)"
            >
              <g
                id="Group_4992"
                data-name="Group 4992"
                transform="translate(168.358 -20.216)"
              >
                <g
                  id="Group_5003"
                  data-name="Group 5003"
                  transform="translate(393.001 155.845)"
                >
                  <g id="Group_3574" data-name="Group 3574">
                    <g id="Group_3573" data-name="Group 3573">
                      <g id="Group_3572" data-name="Group 3572">
                        <path
                          id="Path_6022"
                          data-name="Path 6022"
                          d="M381.427,112.85s-4.347-2.407-8.607,7.871a128.795,128.795,0,0,0-5.72,16.128s-1.169,2.175-2.7.933-3.779-4.928-6.141-4.047c-2.451.914-3.057,3.777-2.256,7.851s2.229,13.066,2.356,13.879-.244,2.019-1.421,1.339-8.163-7.328-11.12-3.824,1.141,14.488,1.566,15.7.225,1.756-.338,2.108-2.7-2.1-4.765-3.914-4.775-3.547-6.312-1.382-1.417,10.638,7.683,23.7l4.613,5.777,7.359-.991c15.62-3.081,21.59-9.095,21.988-11.719s-2.759-3.258-5.5-3.389-5.986.152-6.146-.492.075-1.176,1.22-1.751,11.721-5.633,12.027-10.208-9.338-4.641-10.657-4.971-.735-1.461-.092-1.95,7.927-5.976,11.333-8.351,4.958-4.856,3.829-7.216c-1.089-2.275-5.267-1.185-7.229-1.353s-1.292-2.545-1.292-2.545a128.711,128.711,0,0,0,7.084-15.577c4.072-10.354-.854-11.648-.854-11.648"
                          transform="translate(-335.231 -112.606)"
                          fill="#ebebeb"
                        />
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3578"
                    data-name="Group 3578"
                    transform="translate(13.289 9.443)"
                  >
                    <g id="Group_3577" data-name="Group 3577">
                      <g id="Group_3576" data-name="Group 3576">
                        <g id="Group_3575" data-name="Group 3575">
                          <path
                            id="Path_6023"
                            data-name="Path 6023"
                            d="M358.964,200.856c3.019-7.593,7.279-18.048,12.023-29.581s9.028-21.971,12.09-29.546l3.617-8.975.986-2.439.263-.632c.061-.142.1-.212.1-.212s-.021.077-.073.222l-.239.641-.942,2.457c-.821,2.132-2.031,5.209-3.542,9.006-3.019,7.593-7.279,18.047-12.021,29.576s-9.031,21.976-12.092,29.551"
                            transform="translate(-358.964 -129.47)"
                            fill="#d3d3d3"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3582"
                    data-name="Group 3582"
                    transform="translate(25.967 26.414)"
                  >
                    <g id="Group_3581" data-name="Group 3581">
                      <g id="Group_3580" data-name="Group 3580">
                        <g id="Group_3579" data-name="Group 3579">
                          <path
                            id="Path_6024"
                            data-name="Path 6024"
                            d="M381.609,159.779a2.2,2.2,0,0,1,.229.484c.134.317.313.781.529,1.356.428,1.151.978,2.757,1.551,4.541l1.447,4.572q.262.813.445,1.382a2.2,2.2,0,0,1,.141.516,2.213,2.213,0,0,1-.233-.482c-.133-.317-.312-.782-.521-1.36-.417-1.156-.946-2.768-1.519-4.551l-1.479-4.56-.452-1.381A2.15,2.15,0,0,1,381.609,159.779Z"
                            transform="translate(-381.605 -159.779)"
                            fill="#d3d3d3"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3586"
                    data-name="Group 3586"
                    transform="translate(30.998 33.854)"
                  >
                    <g id="Group_3585" data-name="Group 3585">
                      <g id="Group_3584" data-name="Group 3584">
                        <g id="Group_3583" data-name="Group 3583">
                          <path
                            id="Path_6025"
                            data-name="Path 6025"
                            d="M390.591,178.555c-.025-.065,3.235-1.347,7.28-2.862s7.345-2.691,7.369-2.625-3.234,1.347-7.28,2.862S390.615,178.62,390.591,178.555Z"
                            transform="translate(-390.591 -173.065)"
                            fill="#d3d3d3"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3590"
                    data-name="Group 3590"
                    transform="translate(22.915 55.114)"
                  >
                    <g id="Group_3589" data-name="Group 3589">
                      <g id="Group_3588" data-name="Group 3588">
                        <g id="Group_3587" data-name="Group 3587">
                          <path
                            id="Path_6026"
                            data-name="Path 6026"
                            d="M376.155,212.643a2.269,2.269,0,0,1,.541-.073l1.479-.114c1.248-.1,2.972-.239,4.868-.462s3.607-.476,4.844-.671l1.466-.228a2.3,2.3,0,0,1,.544-.055,2.241,2.241,0,0,1-.525.152c-.342.081-.838.189-1.454.307-1.231.24-2.943.526-4.846.746s-3.633.337-4.887.389c-.627.024-1.134.036-1.486.034A2.268,2.268,0,0,1,376.155,212.643Z"
                            transform="translate(-376.155 -211.035)"
                            fill="#d3d3d3"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3594"
                    data-name="Group 3594"
                    transform="translate(15.792 46.029)"
                  >
                    <g id="Group_3593" data-name="Group 3593">
                      <g id="Group_3592" data-name="Group 3592">
                        <g id="Group_3591" data-name="Group 3591">
                          <path
                            id="Path_6027"
                            data-name="Path 6027"
                            d="M363.435,194.81a1.974,1.974,0,0,1,.325.387c.195.259.471.638.807,1.109.673.943,1.589,2.255,2.587,3.712s1.89,2.786,2.525,3.754c.318.484.571.879.742,1.155a1.945,1.945,0,0,1,.243.442,1.92,1.92,0,0,1-.325-.387c-.2-.259-.471-.637-.808-1.109-.673-.942-1.589-2.254-2.587-3.713s-1.89-2.785-2.525-3.754c-.318-.484-.571-.879-.742-1.154A1.934,1.934,0,0,1,363.435,194.81Z"
                            transform="translate(-363.433 -194.809)"
                            fill="#d3d3d3"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3598"
                    data-name="Group 3598"
                    transform="translate(6.706 60.465)"
                  >
                    <g id="Group_3597" data-name="Group 3597">
                      <g id="Group_3596" data-name="Group 3596">
                        <g id="Group_3595" data-name="Group 3595">
                          <path
                            id="Path_6028"
                            data-name="Path 6028"
                            d="M347.209,220.592a3.15,3.15,0,0,1,.41.5l1.04,1.418c.868,1.2,2.054,2.876,3.352,4.731s2.46,3.546,3.291,4.776l.974,1.464a3.186,3.186,0,0,1,.329.556,3.2,3.2,0,0,1-.409-.5l-1.04-1.417c-.869-1.2-2.055-2.876-3.352-4.733s-2.46-3.545-3.291-4.775l-.974-1.464A3.2,3.2,0,0,1,347.209,220.592Z"
                            transform="translate(-347.208 -220.591)"
                            fill="#d3d3d3"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                  <g
                    id="Group_3602"
                    data-name="Group 3602"
                    transform="translate(15.969 71.015)"
                  >
                    <g id="Group_3601" data-name="Group 3601">
                      <g id="Group_3600" data-name="Group 3600">
                        <g id="Group_3599" data-name="Group 3599">
                          <path
                            id="Path_6029"
                            data-name="Path 6029"
                            d="M363.75,241.943a3.614,3.614,0,0,1,.684-.108l1.87-.212c1.578-.18,3.758-.435,6.157-.783s4.563-.713,6.129-.989l1.854-.324a3.584,3.584,0,0,1,.686-.09,3.677,3.677,0,0,1-.666.186c-.433.1-1.061.244-1.84.4-1.558.322-3.721.718-6.126,1.064s-4.59.576-6.176.711c-.793.066-1.435.111-1.879.132A3.6,3.6,0,0,1,363.75,241.943Z"
                            transform="translate(-363.75 -239.432)"
                            fill="#d3d3d3"
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <path
                  id="Path_765"
                  data-name="Path 765"
                  d="M551.155,269.7h-122.7v-2.529H372.817V269.7H249.61a8.3,8.3,0,0,0-8.3,8.3h0V446.014a8.3,8.3,0,0,0,8.3,8.3H551.155a8.3,8.3,0,0,0,8.3-8.3V278a8.3,8.3,0,0,0-8.3-8.3Z"
                  transform="translate(-160.281 -233.748)"
                  fill="#263238"
                />
                <rect
                  id="Rectangle_125"
                  data-name="Rectangle 125"
                  width="295.889"
                  height="166.912"
                  transform="translate(92.157 50.62)"
                  fill="#fff"
                />
                <rect
                  id="Rectangle_130"
                  data-name="Rectangle 130"
                  width="270.893"
                  height="144.274"
                  transform="translate(104.705 59.446)"
                  fill="#e6e6e6"
                />
                <path
                  id="Path_780"
                  data-name="Path 780"
                  d="M123.305,682.148H96.546a2.735,2.735,0,0,1-2.461-1.54l-5.826-11.976A2.735,2.735,0,0,1,90.72,664.7h38.411a2.735,2.735,0,0,1,2.461,3.934l-5.826,11.976a2.735,2.735,0,0,1-2.461,1.54Z"
                  transform="translate(-85.411 -443.794)"
                  fill="#e5e5e5"
                />
                <circle
                  id="Ellipse_120"
                  data-name="Ellipse 120"
                  cx="3.035"
                  cy="3.035"
                  r="3.035"
                  transform="translate(236.813 39.998)"
                  fill="#e8505b"
                />
                <g id="Plant" transform="translate(46.459 191.664)">
                  <g id="Group_3661" data-name="Group 3661">
                    <g id="Group_3635" data-name="Group 3635">
                      <g id="Group_3634" data-name="Group 3634">
                        <g id="Group_3633" data-name="Group 3633">
                          <g id="Group_3632" data-name="Group 3632">
                            <path
                              id="Path_6039"
                              data-name="Path 6039"
                              d="M136.77,409.452c6.463-4.482,7.955-12.838,7.726-20.355a8.16,8.16,0,0,0-.489-3.68,2.554,2.554,0,0,0-3.108-1.335c-.933.436-1.343,1.518-1.867,2.412a7.338,7.338,0,0,1-2.952,2.8,2.8,2.8,0,0,1-2.577.224c-1.08-.6-1.2-2.1-1.19-3.344q.034-3.488.068-6.976a11.628,11.628,0,0,0-.364-3.707,3.87,3.87,0,0,0-2.423-2.625,2.348,2.348,0,0,0-2.911,1.563,11.55,11.55,0,0,0-.041,1.554,1.313,1.313,0,0,1-.772,1.233,1.509,1.509,0,0,1-1.368-.578,16.591,16.591,0,0,1-2.963-4.507,23.015,23.015,0,0,0-2.762-4.65,6.746,6.746,0,0,0-4.563-2.581,4.04,4.04,0,0,0-4.152,2.742c-.459,1.758.561,3.546,1.673,4.974a27.86,27.86,0,0,0,5.78,5.548,2.294,2.294,0,0,1,.967,1.047c.268.833-.523,1.656-1.345,1.927a14.445,14.445,0,0,1-2.913.318,2.8,2.8,0,0,0-2.4,1.455c-.516,1.273.546,2.614,1.593,3.493a23.859,23.859,0,0,0,7.047,4.1,8.043,8.043,0,0,1,2.619,1.285,2.309,2.309,0,0,1,.731,2.648,2.352,2.352,0,0,1-2.56.974,16.647,16.647,0,0,1-2.735-1.056c-1.712-.653-3.927-.543-5.031.935a3.949,3.949,0,0,0-.432,3.491,9.1,9.1,0,0,0,1.881,3.09,23.99,23.99,0,0,0,10.219,7.235c3.973,1.393,7.657,1.78,11.615.348"
                              transform="translate(-109.949 -364.892)"
                              fill="#e8505b"
                            />
                          </g>
                        </g>
                      </g>
                    </g>
                    <g
                      id="Group_3640"
                      data-name="Group 3640"
                      transform="translate(1.921 1.044)"
                    >
                      <g id="Group_3639" data-name="Group 3639">
                        <g id="Group_3638" data-name="Group 3638">
                          <g id="Group_3637" data-name="Group 3637">
                            <g id="Group_3636" data-name="Group 3636">
                              <path
                                id="Path_6040"
                                data-name="Path 6040"
                                d="M138.427,412.7c-.262-2.978-.4-3.039-1.5-6.833a111.858,111.858,0,0,0-4.4-12.053l-1.315-3.1c-.434-1.016-.864-2.025-1.345-2.984a55.848,55.848,0,0,0-3.084-5.358c-1.063-1.657-2.133-3.19-3.143-4.617s-1.984-2.735-2.919-3.892a44.3,44.3,0,0,0-4.814-5.124c-.613-.559-1.1-.976-1.44-1.255l-.384-.314a.955.955,0,0,0-.136-.1.887.887,0,0,0,.12.119l.369.331c.326.29.806.718,1.41,1.286a46.776,46.776,0,0,1,4.748,5.161c.924,1.159,1.884,2.472,2.89,3.9s2.065,2.965,3.121,4.621a56.354,56.354,0,0,1,3.06,5.343c.478.955.9,1.955,1.337,2.974s.869,2.052,1.313,3.1a114.6,114.6,0,0,1,4.4,12.023c1.108,3.779,1.256,3.822,1.537,6.788"
                                transform="translate(-113.955 -367.068)"
                                fill="#263238"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                    <g
                      id="Group_3645"
                      data-name="Group 3645"
                      transform="translate(17.769 7.973)"
                    >
                      <g id="Group_3644" data-name="Group 3644">
                        <g id="Group_3643" data-name="Group 3643">
                          <g id="Group_3642" data-name="Group 3642">
                            <g id="Group_3641" data-name="Group 3641">
                              <path
                                id="Path_6041"
                                data-name="Path 6041"
                                d="M147,395.235a2.55,2.55,0,0,0,.124-.532c.067-.344.147-.846.237-1.467.181-1.242.372-2.965.575-4.866s.419-3.618.618-4.853c.1-.618.182-1.118.245-1.462a2.449,2.449,0,0,0,.071-.542,2.506,2.506,0,0,0-.159.522c-.089.34-.2.836-.317,1.452-.241,1.233-.483,2.952-.686,4.856-.2,1.876-.373,3.573-.508,4.87-.065.586-.12,1.079-.164,1.475A2.513,2.513,0,0,0,147,395.235Z"
                                transform="translate(-146.993 -381.514)"
                                fill="#263238"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                    <g
                      id="Group_3650"
                      data-name="Group 3650"
                      transform="translate(1.743 18.625)"
                    >
                      <g id="Group_3649" data-name="Group 3649">
                        <g id="Group_3648" data-name="Group 3648">
                          <g id="Group_3647" data-name="Group 3647">
                            <g id="Group_3646" data-name="Group 3646">
                              <path
                                id="Path_6042"
                                data-name="Path 6042"
                                d="M113.583,403.736a3.465,3.465,0,0,0,.64.079c.412.038,1.007.09,1.741.177,1.469.164,3.49.461,5.7.886s4.2.9,5.632,1.288c.716.187,1.291.354,1.689.467a3.488,3.488,0,0,0,.625.156,3.4,3.4,0,0,0-.6-.242c-.391-.14-.96-.331-1.673-.539-1.421-.426-3.41-.927-5.632-1.358a56.5,56.5,0,0,0-5.732-.821c-.738-.067-1.338-.094-1.752-.1A3.411,3.411,0,0,0,113.583,403.736Z"
                                transform="translate(-113.583 -403.721)"
                                fill="#263238"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                    <g
                      id="Group_3655"
                      data-name="Group 3655"
                      transform="translate(24.7 19.084)"
                    >
                      <g id="Group_3654" data-name="Group 3654">
                        <g id="Group_3653" data-name="Group 3653">
                          <g id="Group_3652" data-name="Group 3652">
                            <g id="Group_3651" data-name="Group 3651">
                              <path
                                id="Path_6043"
                                data-name="Path 6043"
                                d="M161.443,425.14a.815.815,0,0,0,.11-.2l.277-.579c.237-.5.563-1.242.952-2.16.78-1.835,1.779-4.4,2.842-7.253s2.037-5.425,2.778-7.274l.884-2.187.237-.6a.837.837,0,0,0,.069-.215.827.827,0,0,0-.111.2l-.276.579c-.238.5-.563,1.243-.953,2.161-.78,1.835-1.779,4.4-2.842,7.255s-2.037,5.424-2.777,7.273l-.884,2.187-.237.6A.813.813,0,0,0,161.443,425.14Z"
                                transform="translate(-161.442 -404.679)"
                                fill="#263238"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                    <g
                      id="Group_3660"
                      data-name="Group 3660"
                      transform="translate(3.407 32.598)"
                    >
                      <g id="Group_3659" data-name="Group 3659">
                        <g id="Group_3658" data-name="Group 3658">
                          <g id="Group_3657" data-name="Group 3657">
                            <g id="Group_3656" data-name="Group 3656">
                              <path
                                id="Path_6044"
                                data-name="Path 6044"
                                d="M117.052,432.854a.847.847,0,0,0,.212.088l.618.21,2.28.748c1.925.632,4.574,1.535,7.5,2.537s5.587,1.882,7.525,2.474c.969.3,1.756.528,2.3.677l.631.168a.82.82,0,0,0,.224.043.9.9,0,0,0-.212-.088l-.618-.209-2.28-.748c-1.925-.631-4.575-1.535-7.5-2.537s-5.586-1.882-7.525-2.474c-.969-.3-1.756-.528-2.3-.677l-.631-.168A.854.854,0,0,0,117.052,432.854Z"
                                transform="translate(-117.052 -432.852)"
                                fill="#263238"
                              />
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </g>
                </g>
                <path
                  id="Path_766"
                  data-name="Path 766"
                  d="M553.6,648.318H524.72v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.188v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.188v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.188v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.188v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.188v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.19v-2.081a.413.413,0,0,0-.413-.413H345.271a.413.413,0,0,0-.413.413h0v2.081H338.67v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.188v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.188v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.187v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081h-6.188v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081H254.1v-2.081a.413.413,0,0,0-.413-.413h-9.9a.413.413,0,0,0-.413.413h0v2.081H224.4a9.9,9.9,0,0,0-9.9,9.9V662.7a9.9,9.9,0,0,0,9.9,9.9H553.6a9.9,9.9,0,0,0,9.9-9.9V658.22a9.9,9.9,0,0,0-9.9-9.9Z"
                  transform="translate(-146.115 -433.822)"
                  fill="#263238"
                />
                <rect
                  id="Rectangle_126"
                  data-name="Rectangle 126"
                  width="188.051"
                  height="123"
                  transform="translate(145.642 70.216)"
                  fill="#fff"
                />
                <rect
                  id="Rectangle_128"
                  data-name="Rectangle 128"
                  width="500.386"
                  height="0.943"
                  transform="translate(0 238.354)"
                  fill="#e6e6e6"
                />
                <path
                  id="Path_776"
                  data-name="Path 776"
                  d="M1007.941,622.448c6.78,7.275,7.13,17.969,7.13,17.969s-10.642-1.1-17.422-8.378-7.13-17.969-7.13-17.969S1001.159,615.173,1007.941,622.448Z"
                  transform="translate(-548.756 -417.043)"
                  fill="#e8505b"
                />
                <path
                  id="Path_777"
                  data-name="Path 777"
                  d="M1052.578,636.394c-7.275,6.78-17.969,7.13-17.969,7.13s1.1-10.642,8.378-17.422,17.969-7.13,17.969-7.13S1059.856,629.614,1052.578,636.394Z"
                  transform="translate(-572.054 -419.633)"
                  fill="#e8505b"
                />
                <path
                  id="Path_778"
                  data-name="Path 778"
                  d="M1029.305,682.148h-26.759a2.735,2.735,0,0,1-2.461-1.54l-5.826-11.976a2.735,2.735,0,0,1,2.461-3.934h38.411a2.735,2.735,0,0,1,2.461,3.934l-5.826,11.976a2.735,2.735,0,0,1-2.461,1.54Z"
                  transform="translate(-550.587 -443.794)"
                  fill="#e5e5e5"
                />
                <path
                  id="Path_808"
                  data-name="Path 808"
                  d="M622.633,502.685l-.648,20.742-11.941,20.751,9.971-23.123Z"
                  transform="translate(-355.114 -358.189)"
                  opacity="0.1"
                />
                <g
                  id="Group_4998"
                  data-name="Group 4998"
                  transform="translate(-65.644 -256.749)"
                >
                  <rect
                    id="Rectangle_1"
                    data-name="Rectangle 1"
                    width="102.557"
                    height="0.961"
                    transform="translate(256.34 405.596)"
                    fill="#ccc"
                  />
                  <circle
                    id="Ellipse_2"
                    data-name="Ellipse 2"
                    cx="3.239"
                    cy="3.239"
                    r="3.239"
                    transform="translate(256.285 393.109)"
                    fill="#ff525f"
                  />
                  <circle
                    id="Ellipse_7"
                    data-name="Ellipse 7"
                    cx="3.239"
                    cy="3.239"
                    r="3.239"
                    transform="translate(266.864 393.109)"
                    fill="#ff525f"
                  />
                  <circle
                    id="Ellipse_8"
                    data-name="Ellipse 8"
                    cx="3.239"
                    cy="3.239"
                    r="3.239"
                    transform="translate(277.443 393.109)"
                    fill="#ff525f"
                  />
                </g>
                <g
                  id="Group_4999"
                  data-name="Group 4999"
                  transform="translate(-65.644 -256.749)"
                >
                  <rect
                    id="Rectangle_2"
                    data-name="Rectangle 2"
                    width="102.557"
                    height="0.961"
                    transform="translate(256.34 438.027)"
                    fill="#ccc"
                  />
                  <g id="Group_4993" data-name="Group 4993">
                    <circle
                      id="Ellipse_3"
                      data-name="Ellipse 3"
                      cx="3.239"
                      cy="3.239"
                      r="3.239"
                      transform="translate(256.285 425.541)"
                      fill="#ff525f"
                    />
                    <circle
                      id="Ellipse_9"
                      data-name="Ellipse 9"
                      cx="3.239"
                      cy="3.239"
                      r="3.239"
                      transform="translate(266.864 425.541)"
                      fill="#ff525f"
                    />
                    <circle
                      id="Ellipse_10"
                      data-name="Ellipse 10"
                      cx="3.239"
                      cy="3.239"
                      r="3.239"
                      transform="translate(277.443 425.541)"
                      fill="#ff525f"
                    />
                  </g>
                </g>
                <g
                  id="Group_5000"
                  data-name="Group 5000"
                  transform="translate(20.661 59.447)"
                >
                  <g id="Group_3605" data-name="Group 3605">
                    <g id="Group_3604" data-name="Group 3604">
                      <path
                        id="Path_6030"
                        data-name="Path 6030"
                        d="M676.248,265.773a18.862,18.862,0,1,0-35.12,9.529h-.011l.054.071c.724,1.219,1.63,2.09,2.545,3.371l10.952,14.507a3.406,3.406,0,0,0,5.437,0l10.769-14.268a40.721,40.721,0,0,0,2.739-3.629l.039-.052h-.008A18.743,18.743,0,0,0,676.248,265.773Zm-18.862,8.213a8.3,8.3,0,1,1,8.3-8.3A8.3,8.3,0,0,1,657.386,273.986Z"
                        transform="translate(-638.525 -246.912)"
                        fill="#e6e6e6"
                      />
                    </g>
                  </g>
                </g>
                <g
                  id="Group_5001"
                  data-name="Group 5001"
                  transform="translate(-54.064 -202.222)"
                >
                  <path
                    id="Path_6"
                    data-name="Path 6"
                    d="M513.542,320.265a6.75,6.75,0,0,1,3.379-5.849,6.754,6.754,0,1,0,0,11.7A6.749,6.749,0,0,1,513.542,320.265Z"
                    transform="translate(-226.147 -17.728)"
                    fill="#ccc"
                  />
                  <path
                    id="Path_7"
                    data-name="Path 7"
                    d="M544.279,320.265a6.75,6.75,0,0,1,3.379-5.849,6.754,6.754,0,1,0,0,11.7A6.749,6.749,0,0,1,544.279,320.265Z"
                    transform="translate(-249.368 -17.728)"
                    fill="#ccc"
                  />
                  <path
                    id="Ellipse_1"
                    data-name="Ellipse 1"
                    d="M6.754,0A6.754,6.754,0,1,1,0,6.754,6.754,6.754,0,0,1,6.754,0Z"
                    transform="translate(295.267 295.783)"
                    fill="#ff525f"
                  />
                  <path
                    id="Path_8"
                    data-name="Path 8"
                    d="M523.915,301.6H486.6a1.342,1.342,0,0,1-1.34-1.34v-37.32a1.342,1.342,0,0,1,1.34-1.34h37.32a1.342,1.342,0,0,1,1.34,1.34v37.32A1.342,1.342,0,0,1,523.915,301.6ZM486.6,262.133a.8.8,0,0,0-.8.8v37.32a.8.8,0,0,0,.8.8h37.32a.8.8,0,0,0,.8-.8v-37.32a.8.8,0,0,0-.8-.8Z"
                    transform="translate(-210.549 20.932)"
                    fill="#ccc"
                  />
                </g>
                <path
                  id="Path_779"
                  data-name="Path 779"
                  d="M110.938,622.448c6.78,7.275,7.13,17.969,7.13,17.969s-10.642-1.1-17.422-8.378-7.13-17.969-7.13-17.969S104.158,615.173,110.938,622.448Z"
                  transform="translate(-93.552 -417.043)"
                  fill="#e5e5e5"
                />
                <g
                  id="Group_5002"
                  data-name="Group 5002"
                  transform="translate(0 -2.208)"
                >
                  <circle
                    id="Ellipse_127"
                    data-name="Ellipse 127"
                    cx="15.92"
                    cy="15.92"
                    r="15.92"
                    transform="translate(318.758 73.371)"
                    fill="#ffb8b8"
                  />
                  <path
                    id="Path_803"
                    data-name="Path 803"
                    d="M531.686,515.663l10.281-64.724a24.539,24.539,0,0,1,31.117-19.7h0a24.465,24.465,0,0,1,17.243,28.042L579.5,515.663Z"
                    transform="translate(-233.639 -319.916)"
                    fill="#e8505b"
                  />
                  <path
                    id="Path_804"
                    data-name="Path 804"
                    d="M607.26,601.727a6.518,6.518,0,0,0,1.132-9.931l10.628-20.581-11.969,1.277-8.258,19.348a6.556,6.556,0,0,0,8.466,9.886Z"
                    transform="translate(-268.187 -394.4)"
                    fill="#ffb8b8"
                  />
                  <path
                    id="Path_805"
                    data-name="Path 805"
                    d="M616.136,525.112a2.921,2.921,0,0,1-1.573-.746l-4.066-3.757a2.927,2.927,0,0,1-.707-3.276l8.127-19.263-1.153-38.062a9.4,9.4,0,0,1,18.621,2.54h0l1.972,23.927a30.061,30.061,0,0,1-5.793,20.351l-12.674,17.133a2.915,2.915,0,0,1-2.752,1.153Z"
                    transform="translate(-274.787 -331.344)"
                    fill="#e8505b"
                  />
                  <path
                    id="Path_806"
                    data-name="Path 806"
                    d="M414.831,358.532a6.518,6.518,0,0,0,8.7,4.915l14.809,17.811,3.49-11.52-14.6-15.148a6.556,6.556,0,0,0-12.4,3.942Z"
                    transform="translate(-171.834 -277.915)"
                    fill="#ffb8b8"
                  />
                  <path
                    id="Path_807"
                    data-name="Path 807"
                    d="M439.092,378.756a2.921,2.921,0,0,1,1.3-1.157l5.046-2.279a2.926,2.926,0,0,1,3.293.626l14.57,14.994,35.5,13.778a9.4,9.4,0,0,1-9.6,16.157h0l-22.8-7.514a30.06,30.06,0,0,1-16.482-13.27L439.082,381.74a2.92,2.92,0,0,1-.269-2.363,2.889,2.889,0,0,1,.28-.621Z"
                    transform="translate(-184.494 -290.756)"
                    fill="#e8505b"
                  />
                  <path
                    id="Path_696"
                    data-name="Path 696"
                    d="M578.641,352.032c1.642,1.943,4.421,2.492,6.985,2.717a65.748,65.748,0,0,0,17.865-1.459c.363,3.52-.627,7.314,1.446,10.21a47.4,47.4,0,0,0,1.684-10.745,10.292,10.292,0,0,0-.6-4.6,4.232,4.232,0,0,0-3.605-2.658,9.036,9.036,0,0,1,4.031-1.723l-5.037-2.531,1.294-1.328-9.119-.558,2.641-1.678a57.281,57.281,0,0,0-12-.377,10.3,10.3,0,0,0-5.307,1.475c-1.505,1.077-2.376,3.217-1.441,4.8a6.966,6.966,0,0,0-5.308,4.212,11.245,11.245,0,0,0-.4,5.405,38.313,38.313,0,0,0,2.009,8.5"
                    transform="translate(-254.745 -270.72)"
                    fill="#2f2e41"
                  />
                </g>
              </g>
            </g>
          </svg>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            width="498.379"
            height="46.387"
            viewBox="0 0 498.379 46.387"
          >
            <defs>
              <filter
                id="Union_1"
                x="0"
                y="0"
                width="498.379"
                height="46.387"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="2" input="SourceAlpha" />
                <feGaussianBlur stdDeviation="2" result="blur" />
                <feFlood floodOpacity="0.2" />
                <feComposite operator="in" in2="blur" />
                <feComposite in="SourceGraphic" />
              </filter>
            </defs>
            <g id="Logo" transform="translate(123.863 -405.04)">
              <g
                transform="matrix(1, 0, 0, 1, -123.86, 405.04)"
                filter="url(#Union_1)"
              >
                <path
                  id="Union_1-2"
                  data-name="Union 1"
                  d="M369.312,21.324c0-7.839,4.717-12.78,12.062-12.78,6.648,0,10.894,4.043,11.208,9.545h-6.109a4.8,4.8,0,0,0-5.008-4.379c-3.37,0-5.5,2.875-5.5,7.614,0,4.829,2.133,7.614,5.525,7.614a4.664,4.664,0,0,0,5.009-4.223H392.6c-.382,5.75-4.694,9.411-11.185,9.411C374.029,34.126,369.312,29.274,369.312,21.324Zm76.03,5.256c0-4.493,3.437-7.031,9.749-7.412l6.177-.382v-1.64c0-2.381-1.64-3.684-4.335-3.684-2.38,0-4.043,1.258-4.358,3.055h-6c.18-4.717,4.447-7.973,10.624-7.973,6.356,0,10.511,3.256,10.511,8.2V33.7H461.38V29.881h-.134a8.463,8.463,0,0,1-7.57,4.11C448.915,33.991,445.342,31,445.342,26.58Zm10.737-3.415c-2.74.18-4.2,1.258-4.2,3.077s1.55,2.965,3.93,2.965c3.032,0,5.458-1.887,5.458-4.583V22.806ZM343.46,26.58c0-4.493,3.437-7.031,9.748-7.412l6.178-.382v-1.64c0-2.381-1.64-3.684-4.335-3.684-2.381,0-4.043,1.258-4.358,3.055h-6c.18-4.717,4.447-7.973,10.624-7.973,6.357,0,10.512,3.256,10.512,8.2V33.7H359.5V29.881h-.134a8.463,8.463,0,0,1-7.57,4.11C347.031,33.991,343.46,31,343.46,26.58ZM354.2,23.165c-2.741.18-4.2,1.258-4.2,3.077s1.55,2.965,3.93,2.965c3.032,0,5.458-1.887,5.458-4.583V22.806ZM472.117,33.7V8.97h6.333v4.424h.135a5.827,5.827,0,0,1,5.885-4.717,6.344,6.344,0,0,1,1.909.248v5.8a7.015,7.015,0,0,0-2.426-.383c-3.325,0-5.278,2.066-5.278,5.526V33.7Zm-35.2,0-7.232-10.152-1.775,1.909V33.7h-6.558V-.261h6.558V18.965H428L436.56,8.97h7.457l-9.524,10.624L444.467,33.7Zm-25.291,0L404.4,23.548l-1.775,1.909V33.7h-6.558V-.261h6.558V18.965h.09l8.557-9.994h7.457L409.2,19.594,419.176,33.7Zm-83.645,0V8.97h6.334v4.424h.135a5.827,5.827,0,0,1,5.884-4.717,6.346,6.346,0,0,1,1.91.248v5.8a7.02,7.02,0,0,0-2.426-.383c-3.324,0-5.278,2.066-5.278,5.526V33.7Zm-17.654,0H0V28.434H310.33V6.881h-9.478V1.289h25.762V6.881h-9.5V33.7Z"
                  transform="translate(6 4.26)"
                  fill="#e8505b"
                />
              </g>
            </g>
          </svg>
        </div> */}
      </Grid>
      <Grid item lg={1} className="dividerGrid">
        <Divider orientation="vertical" flexItem className="divider" />
      </Grid>
      <Grid item xs={12} lg={6} className="rightGrid">
        <div className="loginPage">
          <span>
            Don't have an account?
            <div>
              <Link to="/signup">Sign Up</Link>
            </div>
          </span>
          <form>
            <div className="loginForm">
              <div className="loginFormItem">
                <TextField
                  type="email"
                  label="Email Address"
                  id="email"
                  fullWidth={true}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
              <p>{errors.email}</p>

              <div className="loginFormItem">
                <TextField
                  type="password"
                  label="Password"
                  id="password"
                  fullWidth={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
              <p>{errors.password}</p>

              <div className="actionBtns">
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  Login
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="default"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

export default Login;
