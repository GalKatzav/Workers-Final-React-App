import React, { createContext, useState, useCallback } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [allEmployees, setAllEmployees] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchedEmployees, setSearchedEmployees] = useState([]);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async (company = "default") => {
    try {
      setError(null);
      let url = `https://randomuser.me/api/?results=100&seed=${company}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllEmployees(data.results);
      setSearchedEmployees(data.results);
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setError("Failed to fetch employees. Please try again.");
    }
  }, []);

  const addFavorite = useCallback(
    (employee) => {
      const updatedFavorites = [...favorites, employee];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    },
    [favorites]
  );

  const removeFavorite = useCallback(
    (email) => {
      const updatedFavorites = favorites.filter((emp) => emp.email !== email);
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    },
    [favorites]
  );

  return (
    <EmployeeContext.Provider
      value={{
        allEmployees,
        favorites,
        searchedEmployees,
        fetchEmployees,
        addFavorite,
        removeFavorite,
        setSearchedEmployees,
        error,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
