
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../images/partner.png";
import background from "../../images/3.png";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";


const Partner_Profile_details = () => {
    const [profile, setProfile] = useState(null);
    const user = useSelector(selectUser);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetch = async () => {
        await axios
          .post(`https://backend.indowings.com/loginUser`, {
            user: user.username,
          })
          .then((res) => {
            setProfile(res.data[0]);
          })
          .catch((err) => console.log(err));
      };
  
      fetch();
    }, []);
  
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
            <Link to="/profileedit" className="btn btn-success">
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
          <div className="mt-4" style={{ flexBasis: "100%" }}>
            <Link to="/layout" className="btn btn-primary me-2">
              Back
            </Link>
          </div>
        </div>
      </div>
    ) : null;
  }
export default Partner_Profile_details;


