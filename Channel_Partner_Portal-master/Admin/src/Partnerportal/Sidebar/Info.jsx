import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

function Info() {
  const tableStyle = {
    borderCollapse: "collapse",
    width: "100%",
    margin: "auto",
  };

  const thStyle = {
    backgroundColor: "#191b30",
    color: "white",
    textAlign: "left",
    padding: "29px",
    border: "1px solid #dddddd",
  };

  const [info, setInfo] = useState([]);
  const user = useSelector(selectUser);

  useEffect(() => {
    axios
      .get(`http://localhost:3307/legal-info`)
      .then((res) => {
        setInfo(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="main-container">
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <h3 style={{ color: "white" }}>Legal Information</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <div className="d-flex flex-column vh-200 justify-content-center align-items-center">
            <div className="w-75 bg-white rounded p-5">
              {/* <h3 className="mb-4">Partner Profile</h3> */}
              {/* <div className='d-flex justify-content-end mb-4'>
                  <Link to="/update_profile" className='btn btn-success'> Update Profile</Link>
              </div> */}
              {info.map((legal_info, index) => {
                if (legal_info.info_email === user.username) {
                  return (
                    <table className="table table-bordered" key={index}>
                      <tbody>
                        <tr>
                          <th>Registered E-mail:</th>
                          <td>
                            {user && user.username ? user.username : "Guest"}
                          </td>
                        </tr>
                        <tr>
                          <th>Document:</th>
                          <td>
                            <a
                              href={legal_info.document}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <u>(View Contract)</u>
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </tbody>
      </table>
    </div>
  );
}

export default Info;
