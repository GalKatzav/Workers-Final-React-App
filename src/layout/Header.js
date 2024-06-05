import React from "react";
import { Link } from "react-router-dom";
import { FaWater } from "react-icons/fa"; // ייבוא האייקון
import "../style/Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <div className="nav-left">
          <Link to="/">
            <FaWater size={24} />
          </Link>
        </div>
        <div className="nav-center">
          <Link to="/">Home</Link>
          <span>|</span>
          <Link to="/favorites">Favorites</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
