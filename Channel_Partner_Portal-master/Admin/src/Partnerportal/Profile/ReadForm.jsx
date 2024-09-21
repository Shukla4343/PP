import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import background from "../../images/3.png";

function ReadForm(props) {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [directors, setDirectors] = useState([]); // Corrected: Change to array
  const navigate = useNavigate();
  const [profil, setProfil] = useState([]);
  const [filteredProfile, setFilteredProfile] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3307/allpartnersprofile/")
      .then((res) => {
        if (res.data.length > 0) {
          setProfil(res.data);
          setFilteredProfile(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // Filter profile based on search query
  useEffect(() => {
    const filtered = profil.filter((partner_profile) => {
      if (partner_profile.reg_email) {
        return partner_profile.reg_email
          .toLowerCase()
          .includes(searchQuery.toLowerCase());
      }
      return false;
    });
    setFilteredProfile(filtered);
  }, [searchQuery, profil]);
  

  useEffect(() => {
    axios
      .get(`http://localhost:3307/read_form/${id}`)
      .then((res) => {
        console.log("Profile Data:", res.data);
        setProfile(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (profile && profile.id) {
      axios
        .get(`http://localhost:3307/fetchDirectors/${profile.id}`)
        .then((res) => {
          if (res.data.length > 0) {
            console.log("Directors Data:", res.data);
            setDirectors(res.data);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [profile?.id]);
  

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
        <h3 className="mb-4">Partner KYC Details:</h3>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>ID</th>
              <td>{profile.id}</td>
            </tr>
            <tr>
              <th>Type of Company:</th>
              <td>{profile.type_of_company}</td>
            </tr>
            <tr>
              <th>Company Name:</th>
              {filteredProfile
                .filter(
                  (partners_profile) =>
                    partners_profile.reg_email === profile.reg_email
                )
                .map((partners_profile, index) => (
                  <td key={index}>{partners_profile.company_name}</td>
                ))}
            </tr>
            <tr>
              <th>Registered Email ID:</th>
              <td>{profile.reg_email}</td>
            </tr>

            <tr>
              <th>PAN Number:</th>
              <td>
                {profile.pan_number}
                <br />
                <a
                  href={profile.pan_card}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <u>(View PAN Card)</u>
                </a>
              </td>
            </tr>
            <tr>
              <th>GSTIN:</th>
              <td>
                {profile.gstin}
                <br />
                <a
                  href={profile.gstin_certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <u>(View GSTIN Certificate)</u>
                </a>
              </td>
            </tr>
            <tr>
              <th>Date of Incorporation:</th>
              <td>
                {profile.incorporation_date?.split("T")[0]}
                <br />
                <a
                  href={profile.incorporation_certificate}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <u>(View Incorporation Certificate)</u>
                </a>
              </td>
            </tr>
            <tr>
              <th>Account Number:</th>
              <td>{profile.bank_details}</td>
            </tr>
            <tr>
              <th>Bank Name:</th>
              <td>{profile.BankName}</td>
            </tr>
            <tr>
              <th>Branch Name</th>
              <td>{profile.BranchName}</td>
            </tr>
            <tr>
              <th>IFSC Code:</th>
              <td>
                {profile.ifsc_code}
                <br />
                <a
                  href={profile.cancelled_cheque}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <u>(View Cancelled Cheque)</u>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <h3 className="mb-4">Directors:</h3>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>DIN</th>
              <th>PAN</th>
              <th>Aadhar</th>
              <th>Mobile</th>
              <th>Email</th>
            </tr>
            {directors.map((director, index) => (
              <tr key={index}>
                <td>{director.company_id}</td>
                <td>{director.name}</td>
                <td>{director.DIN}</td>
                <td>
                  {director.PAN}
                  <br />
                  {director.pan_file && (
                    <a
                      href={director.pan_file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <u>(View PAN Card)</u>
                    </a>
                  )}
                </td>

                <td>
                  {director.Aadhar}
                  <br />
                  {director.aadhar_file && (
                    <a
                      href={director.aadhar_file}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <u>(View Aadhar Card)</u>
                    </a>
                  )}
                </td>
                <td>{director.mobile}</td>
                <td>{director.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          className="mt-4"
          style={{ position: "fixed", bottom: 50, left: 50 }}
        >
          <Link to="/addpartner" className="btn btn-primary me-2">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReadForm;
