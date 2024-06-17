import React, { useContext, useEffect, useState, useCallback } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "../components/EmployeeCard";
import { useParams, useNavigate } from "react-router-dom";
import "../style/SearchResults.css"; // צור קובץ CSS לעיצוב העמוד במידת הצורך

const SearchResults = () => {
  const { searchTerm } = useParams();
  const { allEmployees, fetchEmployees } = useContext(EmployeeContext);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [newSearchTerm, setNewSearchTerm] = useState(searchTerm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleFetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await fetchEmployees(searchTerm);
    } catch (err) {
      setError('Failed to fetch employees. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, fetchEmployees]);

  useEffect(() => {
    handleFetchEmployees();
  }, [searchTerm, handleFetchEmployees]);

  useEffect(() => {
    if (allEmployees && allEmployees.length > 0) {
      setFilteredEmployees(allEmployees);
    }
  }, [allEmployees]);

  const handleSearch = () => {
    navigate(`/search/${newSearchTerm}`);
  };

  // Debouncing the search input to avoid excessive API calls
  const handleInputChange = (e) => {
    setNewSearchTerm(e.target.value);
  };

  return (
    <div className="search-results">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by company"
          value={newSearchTerm}
          onChange={handleInputChange}
          aria-label="Search by company"
        />
        <button onClick={handleSearch} aria-label="Search">Search</button>
      </div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      <div className="employee-list">
        {filteredEmployees.map((emp, index) => (
          <EmployeeCard
            key={emp.email}
            employee={emp}
            delay={index * 100}
            showDetails={true}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
