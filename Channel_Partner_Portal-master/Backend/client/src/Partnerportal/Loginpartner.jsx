import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "../features/userSlice";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
import img from "../images/2.png";
import logo from "../images/partner.png";
import backgroundImg from "../images/3.png";
import { signOut, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function LoginPartner() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const [loginStatus, setLoginStatus] = useState(null);
  const [loginStep, setLoginStep] = useState(-1);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async () => {
    // e.preventDefault();
    try {
      const res = await axios.post(
        "https://backend.indowings.com/login/",
        credentials
      );
      if (res.status === 200) {
        const { username, category, commission, steps, is_verified } = res.data;
        // If steps is null, update it to 0
        const updatedSteps = steps === null ? 0 : steps;
        dispatch(
          login({
            username: username,
            // password: password,
            category: category,
            commission: commission,
            steps: updatedSteps,
            is_verified: is_verified,
          })
        );
        await signInWithEmailAndPassword(
          auth,
          credentials.username,
          credentials.password
        ).then(async (authUser) => {
          console.log("cred-->", authUser.user.emailVerified);
          if (authUser.user.emailVerified) {
            setLoginStatus("success");
            console.log("steps-->", updatedSteps);
            if (updatedSteps === 0) {
              navigate("/update_profile");
            } else if (updatedSteps === 1) {
              navigate("/partnerprofile");
            } else if (updatedSteps === 2) {
              navigate("/insert_kyc");
            } else if (updatedSteps === 3) {
              navigate("/partnerkyc");
            } else if (updatedSteps === 4) {
              if (is_verified) {
                navigate("/partnerdashboard");
              } else {
                navigate("/waiting");
              }
            } 
            // else if (updatedSteps === 5) {
            //   if (is_verified) {
            //     navigate("/layout");
            //   } else {
            //     navigate("/waiting");
            //   }
            // }
          } else {
            alert("Please verify your email");
          }
        });
      } else {
        setLoginStatus("failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setLoginStatus("failed");
    }
  };
  // console.log("logint user-->", user);
  // useEffect(() => {
  //   if (user) {
  //     navigate("/update_profile");
  //   }
  // }, [user]);

  // useEffect(() => {
  //   if (loginStep != -1) {
  //     if (loginStep === 0) {
  //       navigate("/update_profile");
  //     } else if (loginStep === 1) {
  //       navigate("/partnerprofile");
  //     } else if (loginStep === 2) {
  //       navigate("/partnerregisterationdetails");
  //     } else if (loginStep === 3) {
  //       navigate("/partnerkyc");
  //     } else {
  //       alert("working on this route");
  //     }

  //   }
  // }, [loginStep]);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImg})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MDBContainer className="my-5" style={{ padding: "5px" }}>
        <MDBCard
          style={{
            border: "3px solid #EF7F1A",
            width: "100%",
            backgroundColor: "#f9f9f9",
            borderRadius: "20px",
            boxShadow: "0px 0px 20px 0px rgba(0, 0, 0, 0.1)",
          }}
        >
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src={img}
                alt="login form"
                className="rounded-start"
                style={{ width: "100%", height: "100%" }}
              />
            </MDBCol>
            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column align-items-center">
                <div className="d-flex flex-row mt-2 align-items-center">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-0"
                    style={{ color: "#ff6219" }}
                  />
                  <img src={logo} alt="Logo" style={{ width: "380px" }} />
                </div>
                <h1
                  style={{
                    marginTop: "60px",
                    marginBottom: "35px",
                    textAlign: "center",
                    fontSize: "34px",
                    fontFamily: "Arial, sans-serif",
                    color: "#333",
                  }}
                >
                  Welcome Partner!
                </h1>
                {loginStatus === "success" && (
                  <p
                    style={{
                      color: "green",
                      fontSize: "16px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Login Successful!
                  </p>
                )}
                {loginStatus === "failed" && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "16px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Login Failed!
                  </p>
                )}

                <div style={{ width: "80%" }}>
                  <div style={{ marginBottom: "20px", marginTop: "10px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontFamily: "Arial, sans-serif",
                        color: "#555",
                      }}
                      htmlFor="username"
                    >
                      <b>Email</b>
                    </label>
                    <MDBInput
                      wrapperClass="mb-4"
                      id="username"
                      type="email"
                      size="lg"
                      name="username"
                      placeholder="Enter email"
                      value={credentials.username}
                      onChange={handleInputChange}
                      required
                      style={{
                        fontSize: "16px",
                        fontFamily: "Arial, sans-serif",
                        color: "#333",
                        borderRadius: "10px",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label
                      style={{
                        display: "block",
                        marginBottom: "10px",
                        fontSize: "16px",
                        fontFamily: "Arial, sans-serif",
                        color: "#555",
                      }}
                      htmlFor="password"
                    >
                      <b>Password</b>
                    </label>
                    <div
                      style={{
                        position: "relative",
                        display: "inline-block",
                        width: "100%",
                      }}
                    >
                      <MDBInput
                        wrapperClass="mb-4"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        size="lg"
                        name="password"
                        placeholder="Enter password"
                        value={credentials.password}
                        onChange={handleInputChange}
                        required
                        style={{
                          fontSize: "16px",
                          fontFamily: "Arial, sans-serif",
                          color: "#333",
                          borderRadius: "10px",
                        }}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="btn btn-sm btn-outline-primary ms-2"
                        style={{
                          backgroundColor: "#191b30",
                          color: "#fff",
                          border: "none",
                          borderRadius: "10px",
                          padding: "5px 10px",
                          position: "absolute",
                          top: "32%",
                          right: "15px", // Adjust the positioning as needed
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                      >
                        {showPassword ? "👁️" : "👁️"}
                      </button>
                    </div>
                  </div>
                  <div className="text" style={{ textAlign: "right" }}>
                    <span style={{ fontSize: "12px", color: "#EF7F1A" }}>
                      <Link to="/forgotpw">
                        <b>Forgot Password?</b>
                      </Link>
                    </span>
                  </div>
                  <MDBBtn
                    className="mb-4 px-5"
                    color="dark"
                    size="lg"
                    required
                    style={{
                      width: "100%",
                      minWidth: "200px",
                      height: "50px",
                    }}
                    onClick={handleSubmit}
                  >
                    Login
                  </MDBBtn>
                </div>
                <div className="text-center mt-4">
                  <span style={{ fontSize: "16px", color: "#000" }}>
                    Don't have an account yet?{" "}
                    <Link to="/register" style={{ color: "#EF7F1A" }}>
                      <b>Sign Up</b>
                    </Link>
                    <br />
                    {/* <Link to="/file">
                      <u>File</u>
                    </Link>
                    <Link to="/filed">
                      <u>File d</u>
                    </Link> */}
                  </span>
                </div>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default LoginPartner;
