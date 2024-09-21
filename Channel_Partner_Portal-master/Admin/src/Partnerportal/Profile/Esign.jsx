import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { Link,useNavigate } from "react-router-dom";
import background from "../../images/3.png";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";

function Esign() {
  const user = useSelector(selectUser);
  const [isDownloading, setIsDownloading] = useState(false);
  const [eSignature, setESignature] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [directors, setDirectors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    type_of_company: "",
    name_of_entity: "",
    pan_number: "",
    gstin: "",
    bank_details: "",
    ifsc_code: "",
    key_email: "",
    incorporation_certificate: null,
    pan_card: null,
    gstin_certificate: null,
    reg_email: "",
    cancelled_cheque: null,
    number_of_directors: "0",
    directors: [],
  });
  const [error, setError] = useState("");
  const [contractGenerated, setContractGenerated] = useState(false); 

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
    const fetchDirectors = async (companyId) => {
      await axios
        .post(`http://localhost:3307/getDirectors`, {
          companyId: companyId,
        })
        .then((res) => {
          setDirectors(res.data);
        })
        .catch((err) => console.log(err));
    };
    const fetch = async () => {
      await axios
        .post(`http://localhost:3307/getSingleCompany`, {
          user: user.username,
        })
        .then((res) => {
          const data = res.data;
          if (data.length > 0) {
            setValues(data[0]);
            fetchDirectors(data[0].id);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    };
    fetch();
  }, []);

  const saveToDb = async (pdf, email) => {
    try {
      const formData = new FormData();
      formData.append("file", pdf);
      formData.append("email", email);
      formData.append("eSignature", eSignature);

      const response = await axios.post(
        "http://localhost:3307/uploadPdf",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await axios.post("http://localhost:3307/updateStep", {
        count: 5,
        user: user.username,
      });

      console.log("PDF saved to database:", response.data);

      setContractGenerated(true); 
    } catch (error) {
      console.error("Error saving PDF to database:", error);
    }
  };

  const generatePDF = async () => {
    setIsDownloading(true);

    const doc = new jsPDF();
    let yPos = 20;

    doc.text(75, yPos, "INDOWINGS PVT. LTD.");
    yPos += 10;
    doc.text(80, yPos, "Partner Contract");
    yPos += 10;
    doc.text(15, yPos, `This contract is for ${values.name_of_entity}, who is working with us as a ${values.type_of_company}`);
    yPos += 10;
    doc.text(15, yPos, `Address: ${values.name_of_entity}`);
    yPos += 10;

    if (eSignature) {
      const imgData = eSignature;
      console.log("Image data:", imgData);
      doc.addImage(imgData, "PNG", 145, yPos+200, 50, 25);
      yPos += 30;
    }

    try {
      const pdfData = doc.output("blob");
      const downloadLink = document.createElement("a");
      downloadLink.href = URL.createObjectURL(pdfData);
      downloadLink.download = "Esign_contract.pdf";
      downloadLink.click();

      await saveToDb(pdfData, user.username);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      setIsDownloading(false);
      alert(
        "Thank you for Signing the contract, You can now access the dashboard from the button below."
      );
    } catch (error) {
      console.error("Error generating PDF:", error);
      setIsDownloading(false);
      alert("Error occurred while downloading PDF. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      console.log("Uploaded signature:", reader.result);
      setESignature(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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
                <b>E-sign Contract:</b>
              </h5>
              <br />
              <p className="card-text">
                Upload Your Signature to E-sign the Contract with IndoWings Pvt. Ltd. and Generate your contract to access the Partner Dashboard.
              </p>
              <div className="mb-3">
                <label htmlFor="eSignature" className="form-label">
                  <b>Upload Your E-Signature</b>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="eSignature"
                  accept="image/png, image/jpeg"
                  onChange={handleFileChange}
                />
              </div>
              {eSignature && (
                <div className="mb-3">
                  <h6>Uploaded E-Signature:</h6>
                  <img
                    src={eSignature}
                    alt="E-Signature"
                    style={{ maxWidth: "200px" }}
                  />
                </div>
              )}
              <div className="d-grid gap-2">
               
                {eSignature && (
                  <button
                    onClick={generatePDF}
                    disabled={isDownloading}
                    className="btn btn-success"
                  >
                    {isDownloading ? "Downloading..." : "Generate Contract"}
                  </button>
                )}
                 {contractGenerated && ( 
                  <Link to="/layout" className="btn btn-primary mb-3">
                    Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Esign;
