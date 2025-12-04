import React from "react";
import { useNavigate } from "react-router-dom";
import categoriesImg1 from "./assets/Ramya Vastram Categories/1.png";
import categoriesImg2 from "./assets/Ramya Vastram Categories/2.png";
import categoriesImg3 from "./assets/Ramya Vastram Categories/3.png";
import categoriesImg4 from "./assets/Ramya Vastram Categories/4.png";
import categoriesImg5 from "./assets/Ramya Vastram Categories/5.png";
import categoriesImg6 from "./assets/Ramya Vastram Categories/6.png";
import categoriesImg7 from "./assets/Ramya Vastram Categories/7.png";
import categoriesImg8 from "./assets/Ramya Vastram Categories/8.png";
import headingImage from "./assets/headings-style.png";

const Categories = () => {
  const navigate = useNavigate();

  const categories = [
    { image: categoriesImg1, path: "/all-products_page" },
    { image: categoriesImg2, path: "/women/gopi_dress/gopi" },
    { image: categoriesImg3, path: "/women/kurti/kurtis" },
    { image: categoriesImg4, path: "/women/blousess/blous_e" },
    { image: categoriesImg5, path: "/women/dcoat/dcoats" },
    { image: categoriesImg6, path: "/wOmen/co_ord/co_ords" },
    { image: categoriesImg7, path: "/men/men_kurte/kurta" },
    { image: categoriesImg8, path: "/Coming-soon" },
  ];

  const handleImageClick = (path) => {
    navigate(path);
  };

  return (
    <div className="categories-container">
      <div
        className="headingpngdiv"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={headingImage} alt="headings" className="heading_image" />
        <h2 className="heading_texts">Categories</h2>
        <img src={headingImage} alt="headings" className="heading_image-right" />
      </div>
      <div className="categories-grids">
        {categories.map((category, index) => (
          <img
            key={index}
            src={category.image}
            alt={`Category ${index + 1}`}
            className="category-img"
            onClick={() => handleImageClick(category.path)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;