import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { adminLogout } from "./features/userSlice";
import logo from "./images/4.png";

function AdminPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedId = localStorage.getItem("id");
    setUserName(storedId);
  }, []);

  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin");
  };

  const mainContainerStyle = {
    position: "relative",
    backgroundImage: `url(${logo})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const cardStyle = {
    background: "rgba(255, 255, 255, 0.8)",
    transition: "background 0.3s ease-in-out",
    margin: "10px",
    width: "250px",
    height: "150px",
    textAlign: "center",
    cursor: "pointer",
    borderRadius: "15px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const textStyle = {
    fontWeight: "bold",
    padding: 0,
    transition: "color 0.3s ease-in-out",
  };

  const handleHover = (event) => {
    event.target.style.background = "#Ef7f1a";
    event.target.style.color = "orange";
  };

  const handleHoverOut = (event) => {
    event.target.style.background = "rgba(255, 255, 255, 0.8)";
    event.target.style.color = "black";
  };

  return (
    <div style={mainContainerStyle}>
      <div className="Main">
        <div className="topbar">
          <h1 style={{ color: "white", fontSize: "30px" }}>
          Partner Information Hub{userName}
          </h1>
          <Button onClick={handleLogout} variant="contained" color="primary">
            Logout
          </Button>
        </div>
        <div
          className="buttons"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Card
            style={cardStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            onClick={() => navigate("/addpartner")}
          >
            <CardContent style={{ ...textStyle, color: "black" }}>
              Manage Partners
            </CardContent>
          </Card>
    
     
          <Card
            style={cardStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            onClick={() => navigate("/legalinfo")}
          >
            <CardContent style={{ ...textStyle, color: "black" }}>
            Partnership Contracts
            </CardContent>
          </Card>
          <Card
            style={cardStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            onClick={() => navigate("/products")}
          >
            <CardContent style={{ ...textStyle, color: "black" }}>
              Manage Inventory
            </CardContent>
          </Card>
          <Card
            style={cardStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            onClick={() => navigate("/orders")}
          >
            <CardContent style={{ ...textStyle, color: "black" }}>
              Manage Customer Orders
            </CardContent>
          </Card>
          {/* <Card
            style={cardStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            onClick={() => navigate("/targets")}
          >
            <CardContent style={{ ...textStyle, color: "black" }}>
              Targets
            </CardContent>
          </Card> */}
          <Card
            style={cardStyle}
            onMouseEnter={handleHover}
            onMouseLeave={handleHoverOut}
            onClick={() => navigate("/announcements")}
          >
            <CardContent style={{ ...textStyle, color: "black" }}>
            Announcements & Alerts
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
