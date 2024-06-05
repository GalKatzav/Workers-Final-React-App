import React, { useContext } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "../style/EmployeeDetails.css";

const EmployeeDetails = ({ employee }) => {
  const { addFavorite } = useContext(EmployeeContext);
  const { name, email, location, picture, phone } = employee;

  return (
    <div className="employee-details">
      <img src={picture.large} alt={name.first} />
      <h3>
        {name.first} {name.last}
      </h3>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>
      <p>
        Location: {location.street.name} {location.street.number},{" "}
        {location.city}, {location.country}
      </p>
      <MapContainer
        center={[location.coordinates.latitude, location.coordinates.longitude]}
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
      <button onClick={() => addFavorite(employee)}>Add to Favorites</button>
    </div>
  );
};

export default EmployeeDetails;
