import React, { createContext, useState, useCallback } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const fetchEmployees = useCallback(async (searchTerm = "") => {
    try {
      let url = "https://randomuser.me/api/?results=100";
      if (searchTerm) {
        url += `&seed=${searchTerm}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setAllEmployees(data.results);
      setEmployees(getRandomEmployees(data.results, 20));
    } catch (error) {
      console.error("Failed to fetch employees:", error);
    }
  }, []);

  const getRandomEmployees = (employees, count) => {
    const shuffled = employees.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
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
        allEmployees,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
