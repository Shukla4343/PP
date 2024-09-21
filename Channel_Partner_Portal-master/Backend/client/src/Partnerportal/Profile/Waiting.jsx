
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {logout, selectUser } from "../../features/userSlice";
import background from "../../images/3.png";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";
import {  useNavigate } from "react-router-dom";

function Waiting(props) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const Logout = async (e) => {
      e.preventDefault();
      await signOut(auth)
        .then(() => {
          console.log("logout");
          dispatch(logout());
          navigate("/portal");
        })
        .catch((err) => {
          console.log(err);
        });
    };

    return (
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
          <button
        style={{
          position: "absolute",
          top: "15px", 
          right: "15px",
          padding: "6px 8px",
          fontSize: "14px",
          cursor: "pointer",
          borderBottom: "1px solid #ccc",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "black",
          borderRadius: "5px",
          backgroundColor: "white",
          border: "none",
          outline: "none",
        }}
        onClick={Logout}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#EF7F1A";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "white";
        }}
      >
        Logout
      </button>
        <div
          className="row justify-content-center"
          style={{
            padding: "20px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "1200px",
          }}
        >
          <div className="col-md-6">
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.8)",
                boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
                padding: "20px",
                borderRadius: "10px",
                width: "90%",
                maxWidth: "1200px",
              }}
            >
              <div className="card-body">
                <h5 className="card-title">
                  <b>Thank You For Submiting Your Application!</b>
                </h5>
                <br />
                <p className="card-text">
                  Your Profile has been sent for verification, Our team will contact you soon!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  

export default Waiting;
