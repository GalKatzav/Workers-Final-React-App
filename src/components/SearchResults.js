import React, { useContext, useEffect } from "react";
import { EmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "../components/EmployeeCard";
import { useParams } from "react-router-dom";

const SearchResults = () => {
  const { searchTerm } = useParams();
  const { employees, fetchEmployees } = useContext(EmployeeContext);

  useEffect(() => {
    fetchEmployees(searchTerm);
  }, [searchTerm, fetchEmployees]);

  return (
    <div className="employee-list">
      {employees.map((emp, index) => (
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
