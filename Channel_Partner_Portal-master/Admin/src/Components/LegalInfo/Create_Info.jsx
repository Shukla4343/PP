import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import background from "../../images/3.png";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imgDB } from "../../firebase.js";

function Create_Info() {
  const [values, setValues] = useState({
    email: "",
    document: null,
    uploading: false, 
  });

  const navigate = useNavigate();

  const handleUpload = (e, fieldName) => {
    const file = e.target.files[0];
    console.log(file);
    const imgs = ref(imgDB, `Files/${v4()}.${file.name.split(".").pop()}`);
    setValues({ ...values, uploading: true }); 
    uploadBytes(imgs, file).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        console.log(val);
        setValues({ ...values, [fieldName]: val, uploading: false }); 
      });
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestData = {
      info_email: values.email,
      document: values.document
    };
    axios
      .post("http://localhost:3307/create-info", requestData)
      .then((res) => {
        console.log(res);
        navigate("/legalinfo");
      })
      .catch((err) => console.log(err));
  };

  const handleFileChange = (e) => {
    setValues({
      ...values,
      document: e.target.files[0],
      documentURL: URL.createObjectURL(e.target.files[0]),
    });
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
      <div style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
        }}>
        <form onSubmit={handleSubmit}>
          <h3 className="mb-4">Add Legal Document</h3>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="info_email"
              placeholder="Enter Email"
              className="form-control"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="document" className="form-label">
              Document
            </label>
            <input
              type="file"
              onChange={(e) => {
                handleUpload(e, "document");
              }}
              className="form-control"
            />
          </div>
          {values.uploading && <p>Uploading...</p>}
          {values.documentURL && (
            <div className="mb-3">
              {values.document.type === "application/pdf" ? (
                <embed
                  src={values.documentURL}
                  type="application/pdf"
                  width="100%"
                  height="500px"
                />
              ) : (
                <img
                  src={values.documentURL}
                  alt="Document"
                  style={{ maxWidth: "100%" }}
                />
              )}
            </div>
          )}
          <div className="mb-3">
            <Link to="/legalinfo" className="btn btn-secondary me-2">
              Back
            </Link>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create_Info;
