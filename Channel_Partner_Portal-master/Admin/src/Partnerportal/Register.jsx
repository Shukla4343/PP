import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
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
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase";


function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  //-------------------------//
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState(null);

  const signUpAction = async () => {
    try {
      if (password !== confirmPassword) {
        setLoginStatus("passwordMismatch");
        alert("Passwords do not match. Please try again.");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await axios.post("http://localhost:3307/register/", {
        username: email,
      });
      await sendEmailVerification(user);

      alert("Please check your mail for a verification link.");
      navigate("/portal");
    } catch (error) {
      console.error("Error:", error);
      alert("Error: " + error);
    }
  };

  

  //-------------------------//

  const [loginStatus, setLoginStatus] = useState(null);
  const navigate = useNavigate();

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
                alt="Registration form"
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
                    marginTop: "30px",
                    textAlign: "center",
                    fontSize: "28px",
                    fontFamily: "Arial, sans-serif",
                    color: "#333",
                  }}
                >
                  Create your account
                </h1>
                {loginStatus === "success" && (
                  <p
                    style={{
                      color: "green",
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Registration Successful! Please log in.
                  </p>
                )}
                {loginStatus === "failed" && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Registration Failed!
                  </p>
                )}
                {/* {loginStatus === "passwordMismatch" && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    Passwords do not match.
                  </p>
                )} */}
                <br />

                <div
                  style={{
                    marginBottom: "20px",
                    marginTop: "10px",
                    width: "80%",
                  }}
                >
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    htmlFor="username"
                  >
                    Email
                  </label>
                  <InputField
                    wrapperClass="mb-6"
                    id="username"
                    type={"email"}
                    size="lg"
                    name="username"
                    placeholder={"Enter Email"}
                    value={email}
                    handleChange={(data) => setEmail(data)}
                    required
                    style={{
                      fontSize: "13px",
                      fontFamily: "Arial, sans-serif",
                      color: "black",
                      fontWeight: "bold",
                    }}
                  />
                </div>
                <div style={{ marginBottom: "20px", width: "80%" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    <InputField
                      wrapperClass="mb-4"
                      id="password"
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      name="password"
                      placeholder={"Enter Password"}
                      value={password}
                      handleChange={(data) => setPassword(data)}
                      required
                      style={{
                        fontSize: "13px",
                        fontFamily: "Arial, sans-serif",
                        color: "black",
                        fontWeight: "bold",
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
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <div style={{ marginBottom: "20px", width: "80%" }}>
                  <label
                    style={{
                      display: "block",
                      marginBottom: "10px",
                      fontSize: "14px",
                      fontFamily: "Arial, sans-serif",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    htmlFor="confirmPassword"
                  >
                    Confirm Password
                  </label>
                  <div
                    style={{
                      position: "relative",
                      display: "inline-block",
                      width: "100%",
                    }}
                  >
                    <InputField
                      wrapperClass="mb-4"
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      size="lg"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      handleChange={(data) => setConfirmPassword(data)}
                      required
                      style={{
                        fontSize: "13px",
                        fontFamily: "Arial, sans-serif",
                        color: "black",
                        fontWeight: "bold",
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
                        top: "50%",
                        right: "15px",
                        transform: "translateY(-50%)",
                        cursor: "pointer",
                      }}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>
                <MDBBtn
                  className="mb-4 px-5"
                  color="dark"
                  style={{
                    minWidth: "200px",
                    height: "50px",
                    width: "80%",
                  }}
                  onClick={signUpAction}
                >
                  Register
                </MDBBtn>
                <div className="text-center mt-4">
                  <span style={{ fontSize: "16px", color: "#000" }}>
                    Already have an account?{" "}
                    <Link to="/portal" style={{ color: "#EF7F1A" }}>
                      <b>Sign In</b>
                    </Link>
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

const InputField = ({ placeholder, handleChange, type }) => {
  const [inputValue, setInputValue] = useState("");
  const handleChangeEvent = (e) => {
    setInputValue(e.target.value);
    handleChange(e.target.value);
  };
  return (
    <input
      value={inputValue}
      type={type}
      placeholder={placeholder}
      onChange={handleChangeEvent}
      style={{
        fontSize: "13px",
        fontFamily: "Arial, sans-serif",
        color: "black",
        padding: "0.5rem 1rem",
        borderRadius: "0.5rem",
        border: "1px solid #ccc",
        width: "100%",
        boxSizing: "border-box",
      }}
    />
  );
};

export default Register;
