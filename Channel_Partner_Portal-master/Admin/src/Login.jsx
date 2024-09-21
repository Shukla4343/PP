import React, { useState } from "react";
import AdminPage from "./AdminPage";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { adminLogin, adminLogout } from "../src/features/userSlice";
import backgroundImage from "./images/3.png";
import logo from "./images/partner.png";

function Login(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginSuccess = (id) => {
    dispatch(
      adminLogin({
        username: "123",
        password: "123",
      })
    );
    // localStorage.setItem("isLoggedIn", true);
    // localStorage.setItem("id", id);
    navigate("/adminPage");
  };

  const handleSubmit = (user, pass) => {
    // event.preventDefault();
    if (user === "123" && pass === "123") {
      handleLoginSuccess(id);
    } else {
      alert("Invalid ID or password");
    }
  };

  // if (i === "root" && pass === "root") {
  //   return (
  //     <AdminPage
  //     // onLogout={props.onLoginSuccess}
  //     // id={localStorage.getItem("id")}
  //     />
  //   );
  // }

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "rgba(255, 255, 255, 0.25)",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <form
        style={{
          width: "300px",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={logo}
            alt="Logo"
            style={{ width: "150px", marginBottom: "20px" }}
          />
        </div>
        <h2
          style={{
            textAlign: "center",
            marginBottom: "20px",
            fontSize: "24px",
            color: "#000",
          }}
        >
          Admin Login
        </h2>
        <div style={{ marginBottom: "15px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#000" }}
          >
            ID:
          </label>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{ display: "block", marginBottom: "5px", color: "#000" }}
          >
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "5px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
          }}
          onClick={() => handleSubmit(id, password)}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
