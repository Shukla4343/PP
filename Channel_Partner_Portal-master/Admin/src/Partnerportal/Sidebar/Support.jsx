import React, { useEffect, useState } from "react";
import { IoCallSharp } from "react-icons/io5";
import { IoIosMail } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { FaMapMarkedAlt } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";

function Support() {

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
    textAlign: "center",
    padding: "20px",
    fontSize: "19px",
    border: "1px solid #dddddd",
  };

  const iconStyle = {
    color: "#0077b5",
    textDecoration: "none",
    marginRight: "5px",
    fontSize: "27px",
  };
  const mapiconStyle = {
    color: "#0077b5",
    textDecoration: "none",
    marginRight: "5px",
    fontSize: "39px",
  };

  return (
    <div className="main-container" >
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>
              <h3 style={{ color: "white" }}>Support</h3>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style={tdStyle}>
              <IoCallSharp /> 1800 572 7363
              <br />
              <IoIosMail />{" "}
              <a
                href="mailto:connect@indowings.com"
                style={{ color: "#000", textDecoration: "none" }}
              >
                connect@indowings.com
              </a>
              <br />
              <a
                href="https://api.whatsapp.com/send/?phone=7669032834&text=Hello...&type=phone_number&app_absent=0"
                style={iconStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.linkedin.com/company/indowings/?originalSubdomain=in"
                style={iconStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/indowings.uav/"
                style={iconStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.facebook.com/Indowings.uav/"
                style={iconStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook />
              </a>
              <a
                href="https://www.youtube.com/@indowingsofficial/"
                style={iconStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <IoLogoYoutube />
              </a>
              <br/><br/><br/><br/><br/>
              <a
                href="https://www.google.nl/maps/place/Indo+Wings+Private+Limited/@28.5993737,77.3308995,17z/data=!3m1!4b1!4m5!3m4!1s0x390ce5e96ae5e01f:0x9bbf8ee8b2677bab!8m2!3d28.599369!4d77.3330882?hl=en&shorturl=1"
                style={mapiconStyle}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaMapMarkedAlt />
              </a>
              <br />
              Corporate Office A-21, Sector-60, Noida,
              <br />
              Gautam Buddha Nagar, (U.P.) 201301, India
              <br/>
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Support;
