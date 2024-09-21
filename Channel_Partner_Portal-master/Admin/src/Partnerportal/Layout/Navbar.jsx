import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import { BsJustify } from "react-icons/bs";
import { IoPersonSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { auth } from "../../firebase.js";
import { signOut } from "firebase/auth";

function Header({ openSidebar }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef(null);

  const user = useSelector(selectUser);
  const [showDropdown, setShowDropdown] = useState(false);

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

  // const handleLogout = (e) => {
  //   e.preventDefault();
  //   dispatch(logout());
  //   navigate("/portal");
  // };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header
      className="header"
      style={{
        backgroundColor: "#25273c",
        color: "white",
        padding: "0 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div className="menu-icon">
        <BsJustify className="icon" onClick={openSidebar} />
      </div>
      <div
        className="header-content"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
          width: "100%",
        }}
      >
        <div className="header-left" style={{ flex: "1" }}>
          Welcome {user && user.username ? user.username : "Guest"}
        </div>
        <div
          className="header-right"
          style={{ display: "flex", alignItems: "center" }}
        >
          <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
              style={{
                backgroundColor: "#EF7F1A",
                color: "white",
                border: "none",
                borderRadius: "5px",
                padding: "8px 16px",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                display: "flex",
                alignItems: "center",
              }}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <IoPersonSharp className="icon" style={{ marginRight: "5px" }} />
              Profile
            </button>
            {showDropdown && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 5px)",
                  right: 0,
                  backgroundColor: "#fff",
                  borderRadius: "5px",
                  boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
                  minWidth: "120px",
                  zIndex: 9999,
                }}
              >
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  <li
                    style={{
                      padding: "8px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ccc",
                      color: "black",
                      borderRadius: "5px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#EF7F1A";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                    }}
                  >
                    <Link
                      to="/partnerprofiledetails"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Profile
                    </Link>
                  </li>
                  <li
                    style={{
                      padding: "8px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ccc",
                      color: "black",
                      borderRadius: "5px",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#EF7F1A";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                    }}
                  >
                    <Link
                      to="/partnerregisterationdetails"
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      Registration Details
                    </Link>
                  </li>
                  <li
                    style={{
                      padding: "8px 16px",
                      cursor: "pointer",
                      borderBottom: "1px solid #ccc",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      color: "black",
                      borderRadius: "5px",
                    }}
                    onClick={Logout}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor = "#EF7F1A";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor = "#ffffff";
                    }}
                  >
                    Logout
                    <span style={{ fontSize: "12px", marginLeft: "auto" }}>
                      ⇧
                    </span>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;