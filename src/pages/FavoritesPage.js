// import React, { useContext, useEffect, useState } from "react";
// import { EmployeeContext } from "../context/EmployeeContext";
// import EmployeeCard from "../components/EmployeeCard";
// import { FaStar } from "react-icons/fa";
// import "../style/FavoritesPage.css";

// const FavoritesPage = () => {
//   const { favorites } = useContext(EmployeeContext);
//   const [favoriteEmployees, setFavoriteEmployees] = useState(favorites);

//   useEffect(() => {
//     const savedFavorites = localStorage.getItem("favorites");
//     if (savedFavorites) {
//       setFavoriteEmployees(JSON.parse(savedFavorites));
//     }
//   }, []);

//   useEffect(() => {
//     setFavoriteEmployees(favorites);
//   }, [favorites]);

//   if (favoriteEmployees.length === 0) {
//     return (
//       <h1 style={{ textAlign: "center", color: "red" }}>
//         No favorite employees found.
//       </h1>
//     );
//   }

//   return (
//     <div className="favorites-page">
//       <h2 className="favorites-title">
//         Favorites{" "}
//         <FaStar className="favorites-star-icon" aria-label="Favorites" />
//       </h2>
//       <div className="employee-list">
//         {favoriteEmployees.map((emp, index) => (
//           <EmployeeCard
//             key={emp.email}
//             employee={emp}
//             delay={index * 100}
//             index={index}
//             company="favorites"
//             showDetails={true}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FavoritesPage;

import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { EmployeeContext } from "../context/EmployeeContext";
import EmployeeCard from "../components/EmployeeCard";
import { FaStar } from "react-icons/fa";
import "../style/FavoritesPage.css";

const FavoritesPage = () => {
  const { favorites } = useContext(EmployeeContext);
  const [favoriteEmployees, setFavoriteEmployees] = useState(favorites);
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavoriteEmployees(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    setFavoriteEmployees(favorites);
    if (favorites.length === 0) {
      navigate("/no-favorites");
    }
  }, [favorites, navigate]);

  if (favoriteEmployees.length === 0) {
    return null; // מונע הצגת הודעה נוספת אם יש ניווט
  }

  return (
    <div className="favorites-page">
      <h2 className="favorites-title">
        Favorites{" "}
        <FaStar className="favorites-star-icon" aria-label="Favorites" />
      </h2>
      <div className="employee-list">
        {favoriteEmployees.map((emp, index) => (
          <EmployeeCard
            key={emp.email}
            employee={emp}
            delay={index * 100}
            index={index}
            company="favorites"
            showDetails={true}
          />
        ))}
      </div>
    </div>
  );
};

export default FavoritesPage;
