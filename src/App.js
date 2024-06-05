import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import EmployeeDetailsPage from "./pages/EmployeeDetailsPage";
import SearchResults from "./components/SearchResults";
import Page404 from "./pages/Page404";
import { EmployeeProvider } from "./context/EmployeeContext";

function App() {
  return (
    <EmployeeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="favorites" element={<FavoritesPage />} />
            <Route path="employee/:uuid" element={<EmployeeDetailsPage />} />
            <Route path="search/:searchTerm" element={<SearchResults />} />
            <Route path="*" element={<Page404 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </EmployeeProvider>
  );
}

export default App;
