import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function Announce() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3307/announce/")
      .then((res) => {
        if (res.data.length > 0) {
          setAnnouncements(res.data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    margin: "auto",
    backgroundColor: "#f5f5f5",
  };

  const thStyle = {
    backgroundColor: "#191b30",
    color: "white",
    textAlign: "left",
    padding: "29px",
    border: "1px solid #dddddd",
  };

  const tdStyle = {
    textAlign: "left",
    padding: "20px",
    border: "1px solid #dddddd",
  };

  return (
    <div className="main-container" >
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <h3 style={{ color: "white" }}>Announcements</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          {announcements.map((announcements, index) => {
            return (
              <tr key={announcements.announce_id}>
                <td style={tdStyle}>
                <MdOutlineKeyboardArrowRight />
                  <b>{announcements.heading}</b>
                  <br />
                  {announcements.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Announce;
