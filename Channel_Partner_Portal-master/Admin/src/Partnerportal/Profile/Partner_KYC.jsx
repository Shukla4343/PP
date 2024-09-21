  import React, { useEffect, useState, useRef } from "react";
  import emailjs from '@emailjs/browser';
  import { Link, useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  import background from "../../images/3.png";
  import { useSelector, useDispatch } from "react-redux";
  import { logout, selectUser } from "../../features/userSlice.js";
  import { auth } from "../../firebase.js";
  import { signOut } from "firebase/auth";

  function Partner_KYC(props) {
    const { id } = useParams();
    const [profile, setProfile] = useState({});
    const [directors, setDirectors] = useState([]);
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
    useEffect(() => {
      const fetch = async () => {
        await axios
          .post(`http://localhost:3307/fetchRegDetails`, {
            user: user.username,
          })
          .then((res) => {
            console.log("Profile Data:", res.data);
            setProfile(res.data[0]);
          })
          .catch((err) => console.log(err));
      };
      fetch();
    }, [user]);

    useEffect(() => {
      const fetch = async () => {
        await axios
          .get(`http://localhost:3307/fetchDirectors/${profile.id}`)
          .then((res) => {
            if (res.data.length > 0) {
              console.log("Directors Data:", res.data);
              setDirectors(res.data);
            }
          })
          .catch((err) => console.log(err));
      };
      if (profile) {
        fetch();
      }
    }, [profile]);

    const onSubmit = async (e) => {
      e.preventDefault();
    
      try {
        await emailjs.send('service_kcrv39j', 'template_u21veje', {
          to_email: 'jogaly@clip.lat',
          from_name: 'software@indowings.com', 
          message: 'A new partner has registered on the partner portal',
        }, 'S7KBqsJ-qWd3njYHf');
    
        await axios.post("http://localhost:3307/updateStep", {
          count: 4,
          user: user.username,
        });
    
        if (user.is_verified) {
          navigate("/layout");
        } else {
          navigate("/waiting");
        }
      } catch (error) {
        console.error('Error sending email:', error);
      }
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
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            padding: "20px",
            borderRadius: "10px",
            width: "90%",
            maxWidth: "1200px",
          }}
        >
          <h3 className="mb-4">Registration Details:</h3>
          <div className="d-flex justify-content-end mb-4">
            <Link to="/insert_kyc" className="btn btn-success">
              Update Registration Form
            </Link>
          </div>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>ID</th>
                <td>{profile.id}</td>
              </tr>
              <tr>
                <th>Registered Email ID:</th>
                <td>{profile.reg_email}</td>
              </tr>
              <tr>
                <th>Type of Company:</th>
                <td>{profile.type_of_company}</td>
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
          <div className="mt-4 d-flex justify-content-end">
            <button onClick={onSubmit} className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }

  export default Partner_KYC;
