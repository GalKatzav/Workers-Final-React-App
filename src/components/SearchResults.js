import React, { useContext, useEffect, useState } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "../components/EmployeeCard";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const { allEmployees, fetchEmployees } = useContext(EmployeeContext);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees(searchTerm);
  }, [searchTerm, fetchEmployees]);

  useEffect(() => {
    if (allEmployees && allEmployees.length > 0) {
      setFilteredEmployees(allEmployees);
    }
  }, [allEmployees]);

  return (
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
  );
};

export default SearchResults;
