import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../images/partner.png";
import background from "../../images/3.png";
import { logout, selectUser } from "../../features/userSlice.js";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imgDB } from "../../firebase.js";

function Insert_KYC(props) {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState([]);
  const [directors, setDirectors] = useState({});
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const finalData = new FormData();

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
    no_of_directors: "0",
    directors: [],
    uploading: false,
  });
  const [error, setError] = useState("");

  const handleUpload = (e, fieldName) => {
    const file = e.target.files[0];
    console.log(file);
    const imgs = ref(imgDB, `Files/${v4()}.${file.name.split(".").pop()}`);
    uploadBytes(imgs, file).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        console.log(val);
        setValues({ ...values, [fieldName]: val });
      });
    });
  };
  const handledocs = (e, fieldName) => {
    const file = e.target.files[0];
    console.log(file);
    const imgs = ref(imgDB, `Files/${v4()}.${file.name.split(".").pop()}`);
    setValues({ ...values, uploading: true });
    uploadBytes(imgs, file).then((data) => {
      console.log(data, "imgs");
      getDownloadURL(data.ref).then((val) => {
        console.log(val);
        const directorIndex = parseInt(fieldName.split("_").pop());
        const updatedField = fieldName.includes("aadhar")
          ? "aadhar_file"
          : "pan_file";
        setDirectors((prevDirectors) => ({
          ...prevDirectors,
          [`Dir_${directorIndex}`]: {
            ...prevDirectors[`Dir_${directorIndex}`],
            [updatedField]: val,
          },
        }));
        setValues({ ...values, uploading: false });
      });
    });
  };

  useEffect(() => {
    if (user) {
      setValues((prevValues) => ({
        ...prevValues,
        reg_email: user.username,
      }));
    }
  }, [user]);

  const headingstyle = {
    fontWeight: "bold",
    fontSize: "14px",
    display: "block",
    fontFamily: "Arial, Helvetica, sans-serif",
    marginBottom: "5px",
    color: "#000",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    marginBottom: "5px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  };
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

  useEffect(() => {
    const fetchDirectors = async (companyId) => {
      await axios
        .post(`https://backend.indowings.com/getDirectors`, {
          companyId: companyId,
        })
        .then((res) => {
          setDirectors(res.data);
        })
        .catch((err) => console.log(err));
    };
    const fetch = async () => {
      await axios
        .post(`https://backend.indowings.com/getSingleCompany`, {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form...");

    const formattedValues = {
      ...values,
      directors: directors,
      user: user.username,
    };

    finalData.append("values", formattedValues);

    console.log("Formatted form values:", formattedValues);

    try {
      console.log("Sending form data to server...");

      const [submitResponse, updateStepResponse] = await Promise.all([
        axios.post("https://backend.indowings.com/submitform/", formattedValues),
        axios.post("https://backend.indowings.com/updateStep", {
          count: 3,
          user: user.username,
        }),
      ]);

      console.log("Submit response:", submitResponse);
      console.log("Update step response:", updateStepResponse);

      navigate("/partnerkyc");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const generateDirectorForms = (numDirectors) => {
    const directorForms = [];

    for (let i = 1; i <= numDirectors; i++) {
      directorForms.push(
        <div key={i} className="director-form">
          <h3
            style={{
              fontWeight: "bold",
              fontSize: "19px",
              display: "block",
              marginTop: "5px",
              fontFamily: "Arial, Helvetica, sans-serif",
              marginBottom: "5px",
              color: "#000",
            }}
          >
            Director {i}
          </h3>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-12">
              <label htmlFor={`din_${i}`} style={headingstyle}>
                DIN Number:
              </label>
              <input
                type="text"
                id={`din_${i}`}
                name={`din_${i}`}
                value={directors[`Dir_${i}`]?.DIN || ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numRegex = /^[0-9]*$/;

                  // Only update state if inputValue is numeric and its length is <= 8
                  if (numRegex.test(inputValue) && inputValue.length <= 8) {
                    setDirectors(prevDirectors => ({
                      ...prevDirectors,
                      [`Dir_${i}`]: {
                        ...prevDirectors[`Dir_${i}`],
                        DIN: inputValue,
                      },
                    }));
                  }
                }}
                onInput={(e) => {
                  const value = e.target.value;
                  e.target.value = value.slice(0, 8); // Enforce maxLength
                }}
                style={inputStyle}
                inputMode="numeric"
                pattern="[0-9]*"
                title="Should contain only numeric characters"
                maxLength={8}
                required
              />

            </div>

            <div className="col-sm-6 col-md-6 col-12">
              <label htmlFor={`name_${i}`} style={headingstyle}>
                Director's Name:
              </label>
              <input
                type="text"
                id={`name_${i}`}
                name={`name_${i}`}
                style={inputStyle}
                pattern="[A-Za-z\s]*"
                title="Should contain only alphabetical characters and spaces"
                value={directors[`Dir_${i}`]?.name || ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const alphaRegex = /^[A-Za-z\s]*$/;

                  // Only update state if inputValue matches the regex
                  if (alphaRegex.test(inputValue)) {
                    setDirectors(prevDirectors => ({
                      ...prevDirectors,
                      [`Dir_${i}`]: {
                        ...prevDirectors[`Dir_${i}`],
                        name: inputValue,
                      },
                    }));
                  }
                }}
                onInput={(e) => {
                  // Optional: Enforce maxLength if required
                  const value = e.target.value;
                  e.target.value = value.replace(/[^A-Za-z\s]/g, ''); // Remove non-alphabetic characters
                }}
                inputMode="text"
                maxLength={50} // Optional: Set a maximum length if needed
                required
              />

            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-12">
              <label htmlFor={`mobile_${i}`} style={headingstyle}>
                Director's Phone Number:
              </label>
              <input
                type="text"
                id={`mobile_${i}`}
                name={`mobile_${i}`}
                value={directors[`Dir_${i}`]?.mobile || ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numRegex = /^[0-9]*$/;

                  if (numRegex.test(inputValue) && inputValue.length <= 10) {
                    setDirectors(prevDirectors => ({
                      ...prevDirectors,
                      [`Dir_${i}`]: {
                        ...prevDirectors[`Dir_${i}`],
                        mobile: inputValue,
                      },
                    }));
                  }
                }}
                onInput={(e) => {
                  // Ensure only numeric characters are present
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
                style={inputStyle}
                maxLength={10}
                inputMode="numeric" // Show numeric keyboard on mobile
                required
              />

            </div>

            <div className="col-sm-6 col-md-6 col-12">
              <label htmlFor={`email_${i}`} style={headingstyle}>
                Director's Email Address:
              </label>
              <input
                type="email"
                id={`email_${i}`}
                name={`email_${i}`}
                value={directors[`Dir_${i}`]?.email}
                onChange={(e) =>
                  setDirectors({
                    ...directors,
                    [`Dir_${i}`]: {
                      ...directors[`Dir_${i}`],
                      email: e.target.value,
                    },
                  })
                }
                style={inputStyle}
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-12">
              <label htmlFor={`aadhar_${i}`} style={headingstyle}>
                Director's Aadhar Number:
              </label>
              <input
                type="text"
                id={`aadhar_${i}`}
                name={`aadhar_${i}`}
                value={directors[`Dir_${i}`]?.Aadhar || ''}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numRegex = /^[0-9]*$/;

                  if (numRegex.test(inputValue) && inputValue.length <= 12) {
                    setDirectors(prevDirectors => ({
                      ...prevDirectors,
                      [`Dir_${i}`]: {
                        ...prevDirectors[`Dir_${i}`],
                        Aadhar: inputValue,
                      },
                    }));
                  }
                }}
                onInput={(e) => {
                  // Ensure only numeric characters are present
                  e.target.value = e.target.value.replace(/[^0-9]/g, '');
                }}
                style={inputStyle}
                maxLength={12}
                inputMode="numeric" // Show numeric keyboard on mobile
                required
              />

            </div>

            <div className="col-sm-6 col-md-6 col-12">
              <label htmlFor={`aadhar_file_${i}`} style={headingstyle}>
                Upload Aadhar Card:
              </label>
              <input
                type="file"
                id={`aadhar_file_${i}`}
                name={`aadhar_file_${i}`}
                onChange={(e) => {
                  handledocs(e, `aadhar_file_${i}`);
                }}
                style={inputStyle}
                required
              />

            </div>
          </div>
          <div className="row">
            <div className="col-sm-6 col-md-6 col-12">
              <label htmlFor={`pan_${i}`} style={headingstyle}>
                Director's PAN Number:
              </label>
              <input
                type="text"
                id={`pan_${i}`}
                name={`pan_${i}`}
                value={directors[`Dir_${i}`]?.PAN || ''}
                onChange={(e) => {
                  const inputValue = e.target.value.toUpperCase(); // Convert input to uppercase
                  const alphaNumericRegex = /^[A-Z0-9]*$/; // Regex to allow only uppercase alphanumeric characters

                  if (inputValue.length <= 10 && alphaNumericRegex.test(inputValue)) {
                    setDirectors(prevDirectors => ({
                      ...prevDirectors,
                      [`Dir_${i}`]: {
                        ...prevDirectors[`Dir_${i}`],
                        PAN: inputValue,
                      },
                    }));
                  }
                }}
                onInput={(e) => {
                  // Remove non-alphanumeric characters and enforce max length
                  e.target.value = e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 10);
                }}
                style={inputStyle}
                maxLength={10} // Maximum length allowed
                inputMode="text" // Ensure proper keyboard for text input
                required
              />


              {/* <input
                type="text"
                id={`pan_${i}`}
                name={`pan_${i}`}
                value={directors[`Dir_${i}`]?.PAN}
                onChange={(e) =>
                  setDirectors({
                    ...directors,
                    [`Dir_${i}`]: {
                      ...directors[`Dir_${i}`],
                      PAN: e.target.value,
                    },
                  })
                }
                style={inputStyle}
                pattern="[A-Za-z0-9]{10}"
                title="Should be 10 characters/digits"
                placeholder="e.g., ABC1234567"
                required
              /> */}
            </div>

            <div className="col-sm-6 col-md-6 col-12">
              <label htmlFor={`pan_file_${i}`} style={headingstyle}>
                Upload PAN Card:
              </label>
              <input
                type="file"
                id={`pan_file_${i}`}
                name={`pan_file_${i}`}
                onChange={(e) => {
                  handledocs(e, `pan_file_${i}`);
                }}
                style={inputStyle}
                required
              />
              {values.uploading && <p>Uploading...</p>}
            </div>

          </div>
        </div>
      );
    }
    return directorForms;
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

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
          padding: "20px",
          borderRadius: "10px",
          width: "90%",
          maxWidth: "1200px",
        }}
      >
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: "150px", marginBottom: "20px" }}
            />
          </div>
          <br />
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
            Partner KYC Form
          </h2>
          <br />
          <br />
          <br />
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="type_of_company" style={headingstyle}>
              Type of Company:
            </label>
            <select
              id="type_of_company"
              name="type_of_company"
              value={values.type_of_company}
              onChange={(e) =>
                setValues({ ...values, type_of_company: e.target.value })
              }
              style={inputStyle}
              required
            >
              <option value=""></option>
              <option value="Proprietor">Proprietor</option>
              <option value="Partner">Partner</option>
              <option value="Private Limited">Private Limited</option>
              <option value="Limited">Limited</option>
              <option value="Limited Liability Partnership">
                Limited Liability Partnership
              </option>
            </select>
          </div>
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="" style={headingstyle}>
              Company Name:
            </label>
            {profile ? (
              <input
                type="text"
                className="form-control"
                required
                value={profile.company_name}
                disabled
              />
            ) : (
              <span>Loading...</span>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="pan_number" style={headingstyle}>
              Company's PAN Number:
            </label>
            <input
              type="text"
              id="pan_number"
              name="pan_number"
              value={values.pan_number}
              onChange={(e) => {
                const inputValue = e.target.value.toUpperCase();
                const alphaNumericRegex = /^[A-Za-z0-9]*$/;

                if (
                  inputValue.length <= 10 &&
                  alphaNumericRegex.test(inputValue)
                ) {
                  setValues({ ...values, pan_number: inputValue });
                }
              }}
              style={inputStyle}
              maxLength={10}
              required
            />
          </div>
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="pan_card" style={headingstyle}>
              Upload PAN Card:
            </label>
            <input
              type="file"
              onChange={(e) => {
                handleUpload(e, "pan_card");
              }}
              style={inputStyle}
              required
            />
          </div>
        </div>

        <div className="row">
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="gstin" style={headingstyle}>
              GSTIN:
            </label>

            <input
              type="text"
              id="gstin"
              name="gstin"
              value={values.gstin}
              onChange={(e) => {
                const inputValue = e.target.value.toUpperCase();
                const alphaNumericRegex = /^[A-Za-z0-9]*$/;
                const len = inputValue.length;

                if (len <= 15 && alphaNumericRegex.test(inputValue)) {
                  setValues({ ...values, gstin: inputValue });
                }
              }}
              style={inputStyle}
              maxLength={15}
              required
            />
          </div>
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="gstin_certificate" style={headingstyle}>
              Upload GSTIN File:
            </label>
            <input
              type="file"
              onChange={(e) => {
                handleUpload(e, "gstin_certificate");
              }}
              style={inputStyle}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="incorporation_date" style={headingstyle}>
              Date of Incorporation:
            </label>
            <input
              type="date"
              id="incorporation_date"
              name="incorporation_date"
              value={values.incorporation_date?.split("T")[0]}
              onChange={(e) => {
                console.log("-->", typeof e.target.value, e.target.value);
                setValues({ ...values, incorporation_date: e.target.value });
              }}
              style={inputStyle}
              required
            />
          </div>
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="incorporation_certificate" style={headingstyle}>
              Upload Incorporation Certificate:
            </label>
            <input
              type="file"
              onChange={(e) => {
                handleUpload(e, "incorporation_certificate");
              }}
              style={inputStyle}
              required
            />
          </div>
        </div>
        <div className="row">
          <h5>Bank Details:</h5>
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="bank_details" style={headingstyle}>
              Account Number:
            </label>
            <input
              type="text"
              id="bank_details"
              name="bank_details"
              value={values.bank_details}
              onChange={(e) => {
                let alphaRegex = /^[a-zA-Z]+$/;
                const inputVal = e.target.value;
                if (inputVal === "" || !alphaRegex.test(inputVal)) {
                  setValues({ ...values, bank_details: inputVal });
                } else {
                  const numericValue = inputVal
                    .replace(/[^0-9]/g, "")
                    .toUpperCase();
                  if (numericValue.length >= 10) {
                    setValues({
                      ...values,
                      bank_details: numericValue.substring(0, 20),
                    });
                  }
                }
              }}
              style={inputStyle}
              pattern="[0-9]*"
              title="Should be numeric"
              minLength={10}
              maxLength={20}
              required
            />
          </div>

          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="cancelled_cheque" style={headingstyle}>
              Upload Cancelled Cheque:
            </label>
            <input
              type="file"
              onChange={(e) => {
                handleUpload(e, "cancelled_cheque");
              }}
              style={inputStyle}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="BankName" style={headingstyle}>
              Bank Name:
            </label>
            <input
              type="text"
              id="BankName"
              name="BankName"
              value={values.BankName}
              onChange={(e) => {
                const inputValue = e.target.value;
                const alphaRegex = /^[A-Za-z\s]*$/;

                if (alphaRegex.test(inputValue)) {
                  setValues({ ...values, BankName: inputValue });
                }
              }}
              style={inputStyle}
              required
            />
          </div>
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="ifsc_code" style={headingstyle}>
              IFSC Code:
            </label>
            <input
              type="text"
              id="ifsc_code"
              name="ifsc_code"
              value={values.ifsc_code}
              onChange={(e) => {
                const inputValue = e.target.value.toUpperCase();
                const alphaNumericRegex = /^[A-Za-z0-9]*$/;
                const len = inputValue.length;

                if (len <= 11 && alphaNumericRegex.test(inputValue)) {
                  setValues({ ...values, ifsc_code: inputValue });
                }
              }}
              style={inputStyle}
              maxLength={11}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="BranchName" style={headingstyle}>
              Branch Name:
            </label>
            <input
              type="text"
              id="BranchName"
              name="BranchName"
              value={values.BranchName}
              onChange={(e) =>
                setValues({ ...values, BranchName: e.target.value })
              }
              style={inputStyle}
              required
            />
          </div>
          <div className="col-sm-6 col-md-6 col-12">
            <label htmlFor="no_of_directors" style={headingstyle}>
              Number of Directors:
            </label>
            <select
              id="no_of_directors"
              name="no_of_directors"
              value={values?.no_of_directors}
              onChange={(e) =>
                setValues({ ...values, no_of_directors: e.target.value })
              }
              style={{
                width: "100%",
                padding: "8px",
                marginTop: "5px",
                marginBottom: "5px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              defaultValue={values.no_of_directors}
              required
            >
              <option value="0"></option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
        </div>
        <div id="directors_info">
          {generateDirectorForms(values.no_of_directors)}
        </div>
        <div>
          <input
            type="submit"
            value="Next"
            className="btn btn-success"
            style={{ float: "right" }}
          />
        </div>
      </form>
    </div>
  );
}

export default Insert_KYC;
