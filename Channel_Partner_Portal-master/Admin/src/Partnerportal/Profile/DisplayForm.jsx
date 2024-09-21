import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import background from "../../images/3.png";

function DisplayForm() {
  const [form, setForm] = useState([]);
  const [filteredForm, setFilteredForm] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:3307/fetchCompany/")
      .then((res) => {
        if (res.data.length > 0) {
          setForm(res.data);
          setFilteredForm(res.data); // Initialize filtered form with all forms
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const filtered = form.filter((display) =>
      display.reg_email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredForm(filtered);
  }, [searchQuery, form]);

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
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          Partner Registration Details
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
              <th>Type of Company</th>
              {/* <th>Name of Entity</th> */}
              <th>All details</th>
            </tr>
          </thead>
          <tbody>
            {filteredForm.map((display, index) => (
              <tr
                key={index}
                style={{
                  backgroundColor: isHovering ? "#f8f9fa" : "transparent",
                }}
              >
                <td>{display.id}</td>
                <td>{display.reg_email}</td>
                <td>{display.type_of_company}</td>
                {/* <td>{display.name_of_entity}</td> */}

                <td>
                  <Link
                    to={`/read_form/${display.id}`}
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

export default DisplayForm;
