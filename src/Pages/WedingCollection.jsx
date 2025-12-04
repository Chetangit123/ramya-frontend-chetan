
import React from "react";
import categoriesImg1 from "./assets/weddingcollection/1.png";
import categoriesImg2 from "./assets/weddingcollection/2.png";
import categoriesImg3 from "./assets/weddingcollection/3.png";
import categoriesImg4 from "./assets/weddingcollection/4.png";
import categoriesImg5 from "./assets/weddingcollection/5.png";
import headingImage from "./assets/headings-style.png";
import { useNavigate } from "react-router-dom";




const Categories = () => {
  const categories = [
    categoriesImg1,
    categoriesImg2,
    categoriesImg3,
    categoriesImg4,
    categoriesImg5,
  ];

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
             <h2 className="heading_texts">Wedding Collection</h2>
             <img src={headingImage} alt="headings" className="heading_image-right" />
           </div>
      <div className="categories-grid">
        {categories.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Category ${index + 1}`}
            className={`category-img ${index === categories.length - 1 ? "hide-mobile" : ""}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Categories;
