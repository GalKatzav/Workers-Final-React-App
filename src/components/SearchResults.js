import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "../components/EmployeeCard";
import { useParams, useNavigate } from "react-router-dom";
import "../style/SearchResults.css"; // צור קובץ CSS לעיצוב העמוד במידת הצורך

const SearchResults = () => {
  const { searchTerm } = useParams();
  const { allEmployees, fetchEmployees } = useContext(EmployeeContext);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [newSearchTerm, setNewSearchTerm] = useState(searchTerm);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees(searchTerm);
  }, [searchTerm, fetchEmployees]);

  useEffect(() => {
    if (allEmployees && allEmployees.length > 0) {
      setFilteredEmployees(allEmployees);
    }
  }, [allEmployees]);

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
        />
        <button onClick={handleSearch}>Search</button>
      </div>
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
