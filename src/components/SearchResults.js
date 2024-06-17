import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "../components/EmployeeCard";
import "../style/SearchResults.css";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const { searchedEmployees, fetchEmployees, error } =
    useContext(EmployeeContext);
  const [newSearchTerm, setNewSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(searchTerm);
  }, [searchTerm, fetchEmployees]);

  const handleSearch = () => {
    navigate(`/search/${newSearchTerm}`);
  };

  return (
    <div className="search-results">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by company"
          value={newSearchTerm}
          onChange={(e) => setNewSearchTerm(e.target.value)}
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
            delay={index * 100}
            showDetails={true}
            index={index}
            company={searchTerm}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
