import "../styles/NavBar-feed.css";
import logo from "../images/logo.png";
import React, { Component } from "react";
import Dropdown from "react-bootstrap/Dropdown";

import signOut from "../images/sign-out-icon.png";
import accountIcon from "../images/account-icon.png";
import { Link } from "react-router-dom";

class NavBarFeed extends React.Component {
  render() {
    return (
      <header className="header">
        <img src={logo} alt="Logo" className="h-logo" />
        <div className="nav-right">
          <a href="/">
            <img src={signOut} alt="SignOut" className="nav-icon" />
          </a>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              <img
                src={accountIcon}
                alt="AccountDetails"
                className="nav-icon"
                variant="flat"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Account</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Settings</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </header>
    );
  }
}

export default NavBarFeed;
