import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../../images/3.png";

function Admin_profile() {
  const [profile, setProfile] = useState([]);
  const [filteredProfile, setFilteredProfile] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3307/allpartnersprofile/")
      .then((res) => {
        if (res.data.length > 0) {
          setProfile(res.data);
          setFilteredProfile(res.data); 
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter profile based on search query
  useEffect(() => {
    const filtered = profile.filter((partner_profile) =>
      partner_profile.reg_email
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
    setFilteredProfile(filtered);
  }, [searchQuery, profile]);

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
        <h3 style={{ textAlign: "center", marginBottom: "5px" }}>
          Partner Profiles
        </h3>
        <div style={{ marginBottom: "5px" }}>
          <input
            type="text"
            placeholder="Search by Email ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "40%",
              padding: "7px",
              borderRadius: "5px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <table
          className="table table-bordered table-hover "
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Company Name</th>
              <th>Phone</th>
              <th>Full Profile</th>
            </tr>
          </thead>
          <tbody>
            {filteredProfile.map((partners_profile, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: isHovering ? "#f8f9fa" : "transparent",
                }}
              >
                <td>{partners_profile.profile_id}</td>
                <td>{partners_profile.reg_email}</td>
                <td>{partners_profile.company_name}</td>
                <td>
                  {partners_profile.country_code}-{partners_profile.reg_phone}
                </td>

                <td>
                  <Link
                    to={`/read_profile/${partners_profile.profile_id}`}
                    className="btn btn-sm btn-info"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4" style={{ position: "fixed", bottom: 50, left: 50 }}>
          <Link to="/adminpage" className="btn btn-primary me-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Admin_profile;
