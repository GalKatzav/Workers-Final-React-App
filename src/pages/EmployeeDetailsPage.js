import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { FaStar } from "react-icons/fa";
import "../style/EmployeeDetails.css";

const EmployeeDetailsPage = () => {
  const [searchParams] = useSearchParams();
  const company = searchParams.get("company");
  const index = parseInt(searchParams.get("index"), 10);
  const navigate = useNavigate();
  const {
    allEmployees,
    favorites,
    searchedEmployees,
    addFavorite,
    removeFavorite,
  } = useContext(EmployeeContext);
  const [employee, setEmployee] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    let empArray;
    switch (company) {
      case "favorites":
        empArray = favorites;
        break;
      case "searched":
        empArray = searchedEmployees;
        break;
      default:
        empArray = allEmployees;
    }

    if (empArray && empArray[index]) {
      const emp = empArray[index];
      setEmployee(emp);
      setIsFavorite(favorites.some((fav) => fav.email === emp.email));
    } else {
      setEmployee(null);
    }
  }, [company, index, allEmployees, favorites, searchedEmployees]);

  const handleFavoriteClick = () => {
    if (!employee) return;

    if (isFavorite) {
      removeFavorite(employee.email);
    } else {
      addFavorite(employee);
    }
    setIsFavorite(!isFavorite);
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!employee) {
    return <p>Employee not found.</p>;
  }

  const { name, location, picture, phone, email: employeeEmail } = employee;

  return (
    <div className="employee-details">
      {picture?.large && (
        <img
          src={picture.large}
          alt={`${name.first} ${name.last}`}
          className="employee-image"
        />
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
      <p>Email: {employeeEmail}</p>
      <p>Phone: {phone}</p>
      <p>
        Address:{" "}
        {`${location.street.number} ${location.street.name}, ${location.city}, ${location.state}, ${location.country}, ${location.postcode}`}
      </p>
      {location.coordinates && (
        <div className="map-container">
          <MapContainer
            center={[
              location.coordinates.latitude,
              location.coordinates.longitude,
            ]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker
              position={[
                location.coordinates.latitude,
                location.coordinates.longitude,
              ]}
            />
          </MapContainer>
        </div>
      )}
      <button
        onClick={handleBackClick}
        className="back-button"
        aria-label="Go back"
      >
        Back
      </button>
    </div>
  );
};

export default EmployeeDetailsPage;
