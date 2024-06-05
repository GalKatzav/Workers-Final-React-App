import React from "react";
import { useNavigate } from "react-router-dom";
import "../style/Page404.css";

const Page404 = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="page404-container">
      <h1>Oops! Page not found</h1>
      <p>We can't seem to find the page you're looking for.</p>
      <div className="graphic-container">
        <div className="graphic-404">
          <span>4</span>
          <span>0</span>
          <span>4</span>
        </div>
      </div>
      <button onClick={handleGoHome} className="home-button">
        Go to Home
      </button>
    </div>
  );
};

export default Page404;
