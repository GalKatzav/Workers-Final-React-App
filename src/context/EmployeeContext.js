import React, { createContext, useState, useCallback, useEffect } from "react";

export const EmployeeContext = createContext();

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [allEmployees, setAllEmployees] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async (searchTerm = "") => {
    try {
      setError(null);
      let url = `https://randomuser.me/api/?results=100&seed=${searchTerm}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllEmployees(data.results);
      setEmployees(getRandomEmployees(data.results, 20));
    } catch (error) {
      console.error("Failed to fetch employees:", error);
      setError("Failed to fetch employees. Please try again.");
    }
  }, []);

  const getRandomEmployees = (employees, count) => {
    const shuffled = employees.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const addFavorite = useCallback((employee) => {
    const updatedFavorites = [...favorites, employee];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }, [favorites]);

  const removeFavorite = useCallback((email) => {
    const updatedFavorites = favorites.filter((emp) => emp.email !== email);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <EmployeeContext.Provider
      value={{
        employees,
        fetchEmployees,
        favorites,
        addFavorite,
        removeFavorite,
        allEmployees,
        error,
      }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
