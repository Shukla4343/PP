import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import background from "../images/3.png";

function Update(props) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
    category: "",
    commission: "",
    steps: "",
    review:"",
  });

  // const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:3307/read/${id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const { username, password, category, commission, steps, review } =
            res.data[0];
          setValues({ username, password, category, commission, steps , review});
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3307/update/${id}`, values)
      .then((res) => {
        console.log(res);
        navigate("/addpartner");
      })
      .catch((err) => console.log(err));
  };

  const handleCategoryChange = (e) => {
    setValues({ ...values, category: e.target.value });
  };
  const handleStepsChange = (e) => {
    // Parse the input value as an integer before updating the state
    const steps = parseInt(e.target.value);
    setValues({ ...values, steps });
  };

  // const togglePasswordVisibility = () => {
  //     setShowPassword(!showPassword);
  // };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <form onSubmit={handleUpdate}>
          <h2>Update Partner</h2>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Update Email"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.username}
              readOnly // Set readOnly attribute to true
            />
          </div>

          {/* <div style={{ marginBottom: '20px' }}>
                        <label htmlFor="password">Password</label>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Update Password"
                                style={{
                                    width: 'calc(100% - 40px)',
                                    padding: '8px',
                                    border: '1px solid #ccc',
                                    borderRadius: '5px'
                                }}
                                value={values.password}
                                onChange={e => setValues({ ...values, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={{
                                    backgroundColor: '#007bff',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '5px',
                                    padding: '5px 10px',
                                    marginLeft: '10px',
                                    cursor: 'pointer'
                                }}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </button>
                        </div> */}
          {/* </div> */}
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="commission">Commission</label>
            <input
              type="text"
              id="commission"
              placeholder="Update Commission"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.commission}
              onChange={(e) =>
                setValues({ ...values, commission: e.target.value })
              }
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="steps">Steps(1: profile, 3: KYC, 4: dashboard)</label>
            <input
              type="number" 
              id="steps"
              placeholder="Update Steps"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.steps}
              onChange={handleStepsChange} 
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="category">Choose Category below:</label>
            <select
              id="category"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.category}
              onChange={handleCategoryChange}
            >
              <option value="">--select--</option>
              <option value="AgriSeries">AgriSeries</option>
              <option value="CyberoneSeries">CyberOneSeries</option>
              <option value="All">All</option>
            </select>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="review">Write review</label>
            <input
              type="text"
              id="review"
              placeholder="Update Review"
              style={{
                width: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.review}
              onChange={(e) =>
                setValues({ ...values, review: e.target.value })
              }
            />
          </div>
          <Link
            to="/addpartner"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              marginRight: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Back
          </Link>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              backgroundColor: "#28a745",
              color: "#fff",
            }}
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default Update;
