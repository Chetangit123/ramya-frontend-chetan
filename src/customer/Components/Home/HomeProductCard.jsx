import React from "react";
import { useNavigate } from "react-router-dom";
import RatingComponent from "../Common/RatingComponent";


const HomeProductCard = ({ product }) => {
  const navigate = useNavigate();

  const frontImage = product?.image || product?.imageUrl;
  const backImage = product?.imageBack;

  return (
    <div
      onClick={() => navigate(`/men/clothing/mens_kurta`)}
      className="cursor-pointer product_card bg-white rounded-lg overflow-hidden"
      style={{ width: "260px" }}
    >
      <div className="image-hover-container">
        <img className="main-image" src={frontImage} alt={product?.title} />
        {backImage && (
          <img className="hover-image" src={backImage} alt={`${product?.title} back`} />
        )}
      </div>

      <div className="mt-3 px-2">
        <h3 className="text-lg font-medium text-gray-900">
          {product?.brand || product?.title}
        </h3>
        <span className="product_price">{product?.selling_price || "₹4,300"}</span>
        <RatingComponent />
      </div>
    </div>
  );
};

export default HomeProductCard;
