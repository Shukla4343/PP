import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import backgroundImage from "../../images/3.png";

function Read_announcement(props) {
  const { announce_id } = useParams();
  const [announcements, setAnnouncements] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`https://backend.indowings.com/read_announcement/${announce_id}`)
      .then((res) => {
        setAnnouncements(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (announce_id) => {
    axios
      .delete(`https://backend.indowings.com/delete_announcement/${announce_id}`)
      .then((res) => {
        navigate("/announcements");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        minHeight: "100vh",
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
          maxWidth: "1200px",
        }}
      >
        <h3 className="text-center mb-4">Partner Details</h3>
        <table className="table table-bordered table-hover">
          <tbody>
            <tr>
              <th className="text-center" style={{ width: "30%" }}>
                Attribute
              </th>
              <th className="text-center">Value</th>
            </tr>
            <tr>
              <td>ID</td>
              <td>{announcements.announce_id}</td>
            </tr>
            <tr>
              <td>Heading</td>
              <td>{announcements.heading}</td>
            </tr>
            <tr>
              <td>Description</td>
              <td>{announcements.description}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center">
          <Link to="/announcements" className="btn btn-primary me-2">
            Back
          </Link>
          <Link
            to={`/update_announcement/${announcements.announce_id}`}
            className="btn btn-info"
          >
            Edit
          </Link>
          <button
            onClick={() => handleDelete(announcements.announce_id)}
            className="btn btn-danger ms-2"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default Read_announcement;
