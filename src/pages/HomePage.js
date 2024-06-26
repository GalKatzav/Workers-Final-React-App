import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import { useNavigate } from "react-router-dom";
import EmployeeCard from "../components/EmployeeCard";
import "../style/HomePage.css";

const HomePage = () => {
  const { searchedEmployees, fetchEmployees, error } =
    useContext(EmployeeContext);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees("default");
  }, [fetchEmployees]);

  const handleSearch = () => {
    if (searchTerm.trim()) {
      fetchEmployees(searchTerm);
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <div className="home-page">
      <img
        src="https://images.globes.co.il/images/NewGlobes/big_image_800/2019/c00_shutter-M800x392.2019123T162612.jpg"
        alt="strip"
        className="strip-image"
      />
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by company"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search by company"
        />
        <button onClick={handleSearch} aria-label="Search">
          Search
        </button>
      </div>
      {error && (
        <p className="error-message">
          Failed to fetch employees. Please try again.
        </p>
      )}
      <div className="employee-list">
        {searchedEmployees.map((emp, index) => (
          <EmployeeCard
            key={emp.email}
            employee={emp}
            delay={index * 200}
            showDetails={true}
            company="home"
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
