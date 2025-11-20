import React from "react";

const Header = () => {
  return (
    <header>
      <h1 className="logo">
        <img src="/assets/logo.jpeg" alt="Logo" />
        <span className="logo-text">
          <span>intern.</span>
          <span>nation</span>
        </span>
      </h1>

      <nav className="main-nav">
        <ul>
          <li><a href="/placements">Placements</a></li>
          <li><a href="/internships">Internships</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
