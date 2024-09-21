import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../images/3.png";
import * as XLSX from "xlsx"; // Import xlsx

function AddPartner() {
  const [partners, setPartners] = useState([]);
  const [filteredPartners, setFilteredPartners] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3307/partner")
      .then((res) => {
        if (res.data.length > 0) {
          setPartners(res.data);
          setFilteredPartners(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleVerification = (partnerId) => {
    const updatedPartners = partners.map((partner) => {
      if (partner.id === partnerId) {
        return {
          ...partner,
          is_verified: partner.is_verified === 0 ? 1 : 0,
        };
      }
      return partner;
    });

    axios
      .put(`http://localhost:3307/updateverify/${partnerId}`, {
        is_verified: updatedPartners.find((partner) => partner.id === partnerId)
          .is_verified,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const downloadProfileDetails = async () => {
    const profileData = [];

    for (const partner of partners) {
      if (partner.profile_id) {
        try {
          const res = await axios.get(
            `http://localhost:3307/read_profile/${partner.profile_id}`
          );
          profileData.push(res.data[0]); // Assuming the response contains an array with one profile
        } catch (err) {
          console.log(err);
        }
      }
    }

    if (profileData.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(profileData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Profile Details");
      XLSX.writeFile(workbook, "Profile_Details.xlsx");
    }
  };

  useEffect(() => {
    const filtered = partners.filter((partner) =>
      partner.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPartners(filtered);
  }, [searchQuery, partners]);

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "5px" }}>
          Partner Insights
        </h3>

        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Search by Email"
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
          className="table table-bordered table-hover"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Profile Details</th>
              <th>KYC Details</th>
              <th>Manage Partner</th>
              <th>Manage Contract</th>
              <th>Confirm / Decline</th>
              <th>Review</th>
            </tr>
          </thead>
          <tbody>
            {filteredPartners.map((partner, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: isHovering ? "#f8f9fa" : "transparent",
                }}
              >
                <td>{partner.id}</td>
                <td>{partner.username}</td>
                <td>
                  {partner?.profile_id ? (
                    <Link
                      to={`/read_profile/${partner.profile_id}`}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </Link>
                  ) : (
                    "Not Available"
                  )}
                </td>
                <td>
                  {partner?.company_id ? (
                    <Link
                      to={`/read_form/${partner.company_id}`}
                      className="btn btn-sm btn-info"
                    >
                      View
                    </Link>
                  ) : (
                    "Not Available"
                  )}
                </td>
                <td>
                  <Link
                    to={`/read/${partner.id}`}
                    className="btn btn-sm btn-info"
                  >
                    Manage
                  </Link>
                </td>
                <td>
                  <Link
                    to={`/contract/${partner.id}`}
                    className="btn btn-sm btn-info"
                  >
                    Manage Contract
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => toggleVerification(partner.id)}
                    className="btn btn-sm btn-primary"
                  >
                    {partner.is_verified === 0 ? "Approve" : "Discard"}
                  </button>
                </td>
                <td>{partner.review}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={downloadProfileDetails}
            className="btn btn-success"
            style={{ marginRight: "10px" }}
          >
            Download Profile Details
          </button>
          <Link to="/adminpage" className="btn btn-primary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AddPartner;
