import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { FaStar } from "react-icons/fa";
import "../style/EmployeeDetails.css";

const EmployeeDetailsPage = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const { employees, favorites, addFavorite, removeFavorite, allEmployees } =
    useContext(EmployeeContext);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    const findEmployee = () => {
      const allAvailableEmployees = [...employees, ...favorites, ...allEmployees];
      return (
        allAvailableEmployees.find((emp) => emp.login.uuid === uuid) ||
        JSON.parse(localStorage.getItem("favorites") || "[]").find(
          (emp) => emp.login.uuid === uuid
        )
      );
    };

    setEmployee(findEmployee());
  }, [uuid, employees, favorites, allEmployees]);

  const handleFavoriteClick = () => {
    if (!employee) return;

    if (favorites.some((fav) => fav.email === employee.email)) {
      removeFavorite(employee.email);
    } else {
      addFavorite(employee);
    }
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to the previous page in history
  };

  if (!employee) {
    return <p>Employee not found.</p>;
  }

  const { name, location, picture, phone, email: employeeEmail } = employee;
  const isFavorite = favorites.some((fav) => fav.email === employeeEmail);

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
      <button onClick={handleBackClick} className="back-button" aria-label="Go back">
        Back
      </button>
    </div>
  );
};

export default EmployeeDetailsPage;
