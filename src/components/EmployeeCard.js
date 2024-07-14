import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import { FaStar } from "react-icons/fa";
import "../style/EmployeeCard.css";

const EmployeeCard = ({ employee, delay, showDetails, index, company }) => {
  const { favorites, addFavorite, removeFavorite } =
    useContext(EmployeeContext);
  const { name, email, location, picture, dob } = employee;

  const isFavorite = favorites.some((fav) => fav.email === email);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite(email);
    } else {
      addFavorite(employee);
    }
  };

  return (
    <div className="employee-card" style={{ animationDelay: `${delay}ms` }}>
      {picture.thumbnail && (
        <img src={picture.thumbnail} alt={`${name.first} ${name.last}`} />
      )}
      <h3>
        {name.first} {name.last}
        <FaStar
          onClick={handleFavoriteClick}
          className={`star-icon ${isFavorite ? "favorite" : ""}`}
          aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
          role="button"
        />
      </h3>
      {showDetails && <p>Age: {dob.age}</p>}
      <p>
        {location.city}, {location.country}
      </p>
      <Link to={`/employee/?company=${company}&index=${index}`}>
        More Details
      </Link>
    </div>
  );
};

export default EmployeeCard;
