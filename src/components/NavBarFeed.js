import "../styles/NavBar-feed.css";
import logo from "../images/logo.png";
import React from "react";

import signOut from "../images/sign-out-icon.png";
import accountIcon from "../images/account-icon.png";

class NavBarFeed extends React.Component {
  render() {
    return (
      <header className="header">
        <img src={logo} alt="Logo" className="h-logo" />
        <div className="nav-right">
          <a href="/">
            <img src={signOut} alt="SignOut" className="nav-icon-1" />
          </a>
          <img src={accountIcon} alt="AccountDetails" className="nav-icon" />
        </div>
      </header>
    );
  }
}

export default NavBarFeed;
