import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import background from "../../images/3.png";
import axios from "axios";

function ReadProfile(props) {
  const { profile_id } = useParams();
  const [profile, setProfile] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3307/read_profile/${profile_id}`)
      .then((res) => {
        console.log(res);
        setProfile(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [profile_id]);

  const handleDelete = (profile_id) => {
    axios
      .delete(`http://localhost:3307/delete_profile/${profile_id}`)
      .then((res) => {
        navigate("/admin_profile");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
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
        <h3 className="mb-4">Profile Details:</h3>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{profile.profile_id}</td>
            </tr>

            <tr>
              <th>Company Name:</th>
              <td>{profile.company_name}</td>
            </tr>
            <tr>
              <th>Registered Email ID:</th>
              <td>{profile.reg_email}</td>
            </tr>

            <tr>
              <th>Company website:</th>
              <td>{profile.website}</td>
            </tr>
            <tr>
              <th>Registered Phone</th>
              <td>
                {profile.country_code}-{profile.reg_phone}
              </td>
            </tr>
            <tr>
              <th>Total Number of Employees</th>
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
              <th> Key Contacts</th>
              <td>
                <b>Name :</b> {profile.key_name}
                <br />
                <b>Email :</b> {profile.key_email}
                <br />
                <b>Phone :</b> {profile.key_phone}
                <br />
                <b>Position/Dept :</b> {profile.key_position}
              </td>
            </tr>
            <tr>
              <th>Focus Industries</th>
              <td>{profile.industries}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-4">
          <Link to="/addpartner" className="btn btn-primary me-2">
            Back
          </Link>
          {/* <Link to={`/update_profiles/${profile.profile_id}`} className='btn btn-primary mx-2'>Edit</Link> */}
          <div className="d-flex justify-content-end">
            {/* <button
              onClick={() => handleDelete(profile.profile_id)}
              className="btn btn-danger"
            >
              Delete
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadProfile;
