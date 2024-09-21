import React, { useState, useEffect } from "react";
import Home from "./Layout/Home";
import Sidebar from "./Layout/Sidebar";
import Navbar from "./Layout/Navbar"; // Import Navbar component
import { Outlet } from "react-router-dom";
import { connect } from "react-redux"; // Import connect
import { setUsername } from "/src/redux/actions";

function Partner_dashboard(props) {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);
  const [contentComponent, setContentComponent] = useState(<Home />);

  const openSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div>
      <div className="grid-container">
        <Navbar openSidebar={openSidebar} username={props.username} />{" "}
        {/* Pass username as a prop */}
        <Outlet />
        <Sidebar
          open={openSidebarToggle}
          setContentComponent={setContentComponent}
        />
        {contentComponent}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  username: state.username,
});

const mapDispatchToProps = {
  setUsername,
};

export default connect(mapStateToProps, mapDispatchToProps)(Partner_dashboard);
