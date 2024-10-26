import "../styles/NavBar.css";
import logo from "../images/logo.png";
import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <header className="header">
        <img src={logo} alt="Logo" className="header-logo" />
      </header>
    );
  }
}

export default NavBar;
