import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../../images/3.png";

function LegalInfo(props) {
  const [legalInfo, setLegalInfo] = useState([]);
  const [filteredLegalInfo, setFilteredLegalInfo] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios  
      .get(`http://localhost:3307/legal-info`)
      .then((res) => {
        setLegalInfo(res.data);
        setFilteredLegalInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter legal info based on search query
  useEffect(() => {
    const filtered = legalInfo.filter((info) =>
      info.info_email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLegalInfo(filtered);
  }, [searchQuery, legalInfo]);


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
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Legal Information
        </h3>
        <div style={{ textAlign: "right", marginBottom: "5px" }}>
          <Link to="/createinfo" className="btn btn-success">
            {" "}
            Create +
          </Link>
        </div>
        <div style={{ marginBottom: "20px" }}>
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
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Document</th>
            </tr>
          </thead>
          <tbody>
            {filteredLegalInfo.map((info) => (
              <tr key={info.info_id}>
                <td>{info.info_id}</td>
                <td>{info.info_email}</td>
                <td>
                  <a
                    href={info.document}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <u>(View Contract)</u>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="mt-4"
          style={{ position: "fixed", bottom: 50, left: 50 }}
        >
          <Link to="/adminpage" className="btn btn-primary me-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LegalInfo;
