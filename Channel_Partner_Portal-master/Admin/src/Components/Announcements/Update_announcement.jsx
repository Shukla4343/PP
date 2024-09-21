import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import background from "../../images/3.png";

function Update_announcement() {
  const { announce_id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    heading: "",
    description: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3307/read_announcement/${announce_id}`)
      .then((res) => {
        if (res.data && res.data.length > 0) {
          const { heading, description } = res.data[0];
          setValues({ heading, description });
        } else {
          console.error("No data found for the given announce_id");
        }
      })
      .catch((err) => console.log(err));
  }, [announce_id]);

  const handleUpdate = (event) => {
    event.preventDefault();
    axios
      .put(`http://localhost:3307/update_announcement/${announce_id}`, values)
      .then((res) => {
        console.log("Update response:", res);
        navigate("/announcements"); // Navigate back to announcements page
      })
      .catch((err) => console.error("Update error:", err));
  };

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
          width: "90%",
          maxWidth: "1000px",
        }}
      >
        <form onSubmit={handleUpdate}>
          <h2 className="text-center mb-4">Update Announcement</h2>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="heading">Heading</label>
            <input
              type="text"
              id="heading"
              placeholder="Update Heading"
              style={{
                width: "auto",
                minWidth: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              value={values.heading}
              onChange={(e) =>
                setValues({ ...values, heading: e.target.value })
              }
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="Update Description"
              style={{
                width: "auto",
                minWidth: "100%",
                padding: "8px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                minHeight: "100px",
              }}
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
          </div>

          <div className="text-center">
            <Link
              to="/announcements"
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update_announcement;
