import React from "react";
import { TbTargetArrow } from "react-icons/tb";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { LiaLuggageCartSolid } from "react-icons/lia";
import { IoDocuments } from "react-icons/io5";
import { MdDocumentScanner } from "react-icons/md";
import { TbDrone } from "react-icons/tb";
import { FaBagShopping } from "react-icons/fa6";
import { TbLayoutDashboard } from "react-icons/tb";
import { IoPersonSharp } from "react-icons/io5";
import { TfiAnnouncement } from "react-icons/tfi";
import logo from "../../images/logo.png";
import Target from "../Sidebar/Target";
import Store from "../Sidebar/Store";
import Order from "../Sidebar/Order";
import Profile from "../Sidebar/Profile";
import Info from "../Sidebar/Info";
import Home from "../Layout/Home";
import Docs from "../Sidebar/Docs";
import Announce from "../Sidebar/Announce";
import { Link } from "react-router-dom";
import Support from "../Sidebar/Support";
import Test from "./Test";

const Sidebar = ({ open, openSidebar, setContentComponent }) => {
  const handleLinkClick = (event) => {
    setContentComponent(event);
  };

  return (
    <aside
      id="sidebar"
      className={open ? "sidebar-responsive" : ""}
      style={{ color: "#ffffff" }}
    >
      <div
        className="sidebar-title"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div className="sidebar-brand">
          <a href="https://www.indowings.com/" target="_blank">
            <img
              src={logo}
              alt="Logo"
              className="icon_header"
              style={{ alignItems: "center" }}
            />
          </a>
        </div>
      </div>

      <ul className="sidebar-list"  style={{  justifyContent: "center" }}>
        <br />
        <li style={{ fontSize: "25px", textAlign: "center" }}>
          Partner Portal
        </li>
        <br/>
        <li
          className="sidebar-list-item"
          onClick={() => {
            handleLinkClick(<Home />);
          }}
        >
          <TbLayoutDashboard className="icon" /> Dashboard
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => {
            handleLinkClick(<Target />);
          }}
        >
          <TbTargetArrow className="icon" /> Targets
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => {
            handleLinkClick(<Store />);
          }}
        >
          <FaFileInvoiceDollar className="icon" /> Partner Store
        </li>

        <li
          className="sidebar-list-item"
          onClick={() => {
            handleLinkClick(<Order />);
          }}
        >
          <LiaLuggageCartSolid className="icon" /> Orders
        </li>

        <li
          className="sidebar-list-item"
          onClick={() => {
            handleLinkClick(<Profile />);
          }}
        >
          <TbDrone className="icon" /> Company Profile
        </li>

        <li
          className="sidebar-list-item"
          onClick={() => {
            handleLinkClick(<Info />);
          }}
        >
          <MdDocumentScanner className="icon" /> Legal Information
        </li>

        <li className="sidebar-list-item">
          <a
            href="https://drive.google.com/drive/folders/1GQgcj2BKy7VlgpGt9GbdkmG1PWEj02PI?usp=sharing"
            target="_blank"
          >
            <FaBagShopping className="icon" /> Marketing
          </a>
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => {
            handleLinkClick(<Docs />);
          }}
        >
          <IoDocuments className="icon" /> Documents
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => {
            handleLinkClick(<Announce />);
          }}
        >
          <TfiAnnouncement className="icon" /> Announcements
        </li>
        <li
          className="sidebar-list-item"
          onClick={() => {
            handleLinkClick(<Support />);
          }}
        >
          <IoPersonSharp className="icon" /> Support
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
