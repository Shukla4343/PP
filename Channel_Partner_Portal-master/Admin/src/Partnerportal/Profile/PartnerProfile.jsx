import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../images/partner.png";
import background from "../../images/3.png";
import { useSelector, useDispatch } from "react-redux";
import { logout,selectUser } from "../../features/userSlice";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";

function PartnerProfile() {
  const [profile, setProfile] = useState(null);
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  
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

  useEffect(() => {
    const fetch = async () => {
      await axios
        .post(`http://localhost:3307/loginUser`, {
          user: user.username,
        })
        .then((res) => {
          setProfile(res.data[0]);
        })
        .catch((err) => console.log(err));
    };

    fetch();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const onSubmit = async () => {
    await Promise.all([
      axios
        .post("http://localhost:3307/updateStep", {
          count: 2,
          user: user.username,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err)),
    ])
      .then(() => {
        navigate("/insert_kyc");
      })
      .catch((e) => {
        console.log("err-->", e);
      });
  };

  return profile ? (
    <div
      // className="d-flex flex-column vh-100 justify-content-center align-items-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        width: "max",
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
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "1200px",
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
            fontFamily: "Arial, Helvetica, sans-serif",
            fontWeight: "bold",
            color: "#000",
          }}
        >
          Partner Profile
        </h2>
        <div className="d-flex justify-content-end mb-4">
          <Link to="/update_profile" className="btn btn-success">
            Edit Profile
          </Link>
        </div>
        {/* Profile details */}

        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>Registered E-mail Address:</th>
              <td>{user && user.username ? user.username : "Guest"}</td>
            </tr>
            <tr>
              <th>Company Name:</th>
              <td>{profile.company_name}</td>
            </tr>
            <tr>
              <th>Company website(url):</th>
              <td>{profile.website}</td>
            </tr>
            <tr>
              <th>Company Phone:</th>
              <td>
                {profile.country_code}-{profile.reg_phone}
              </td>
            </tr>
            <tr>
              <th>Number of Employees:</th>
              <td>{profile.employees}</td>
            </tr>
            <tr>
              <th>Company Address:</th>
              <td>
                {profile.address} <br />
                {profile.city}
                <br />
                {profile.state}
                <br /> {profile.pincode}
              </td>
            </tr>

            <tr>
              <th> Key Contacts-</th>
              <td>
                <b>Full Name: </b>
                {profile.key_name}
                <br />
                <b>E-mail Address:</b> {profile.key_email}
                <br />
                <b>WhatsApp Number:</b> {profile.key_phone}
                <br />
                <b>Position/Dept: </b>
                {profile.key_position}
              </td>
            </tr>
            <tr>
              <th>Focus Industries:</th>
              <td>{profile.industries}</td>
            </tr>
          </tbody>
        </table>
        <p  style={{
            textAlign: "center",
            fontSize: "14px",
            color: "#000",
          }}>Please submit correct profile details</p>
        <div
          className="mt-4 d-flex justify-content-end"
          style={{ flexBasis: "100%" }}
        >
          <button className="btn btn-primary me-2" onClick={onSubmit}>
            Next
          </button>
        </div>
      </div>
    </div>
  ) : null;
}

export default PartnerProfile;
