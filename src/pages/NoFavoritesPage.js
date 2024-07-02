import React from "react";
import { FaRegSadCry } from "react-icons/fa";
import "../style/NoFavoritesPage.css";

const NoFavoritesPage = () => {
  return (
    <div className="no-favorites-container">
      <FaRegSadCry className="sad-icon" />
      <h1>No favorite employees found</h1>
      <p>Add some employees to your favorites to see them here!</p>
    </div>
  );
};

export default NoFavoritesPage;
