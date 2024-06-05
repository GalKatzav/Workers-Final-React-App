import React, { createContext, useState, useEffect } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const fetchEmployees = async (searchTerm = "") => {
    try {
      let url = "https://randomuser.me/api/?results=10";
      if (searchTerm) {
        url += `&seed=${searchTerm}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setEmployees(data.results);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  };

  const addFavorite = (employee) => {
    const updatedFavorites = [...favorites, employee];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const removeFavorite = (email) => {
    const updatedFavorites = favorites.filter((emp) => emp.email !== email);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        fetchEmployees,
        favorites,
        addFavorite,
        removeFavorite,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
