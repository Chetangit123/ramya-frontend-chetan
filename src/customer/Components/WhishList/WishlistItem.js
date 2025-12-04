import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const WishlistItem = ({ item, showButton, onRemove, themeColor, handlesubmit }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (item?._id) {
      navigate(`/product/${item._id}`);
    }
  };

  return (
    <div className="flex items-center bg-gray-100 p-4 rounded-md shadow-sm hover:shadow-md transition-all duration-200">
      {/* Product Image (Clickable) */}
      <div
        className="w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[7rem] rounded overflow-hidden cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          className="w-full h-full object-cover object-center"
          src={
            item?.colorVariants?.[0]?.images?.find((img) => img.label === "front")?.url ||
            "https://via.placeholder.com/300x400?text=No+Image"
          }
          alt={item?.title}
        />
      </div>

      {/* Product Details (Title Clickable) */}
      <div className="ml-5 flex-1 space-y-1 cursor-pointer" onClick={handleNavigate}>
        <p className="text-lg font-semibold text-gray-800 hover:underline">{item?.title}</p>
        <p className="text-sm text-gray-500">Color: {item?.colorVariants?.[0]?.color || "N/A"}</p>
        <p className="text-sm text-gray-500">Brand: {item?.brand || "Unknown"}</p>

        <div className="flex space-x-2 items-center pt-1">
          <p className="line-through text-gray-400 text-sm">₹{item?.price}</p>
          <p className="font-semibold text-base text-gray-800">₹{item?.discountedPrice}</p>
          <p className="text-green-600 font-semibold text-sm">
            {Math.round(((item?.price - item?.discountedPrice) / item?.price) * 100) || 0}% off
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {showButton && (
        <div className="ml-4 space-y-1 flex flex-col">
          <Button
            size="small"
            variant="outlined"
            onClick={() => onRemove(item._id)}
            style={{
              color: themeColor,
              borderColor: themeColor,
            }}
          >
            Remove
          </Button>
          <Button
            size="small"
            variant="outlined"
            onClick={() => handlesubmit(item._id)}
            style={{
              color: themeColor,
              borderColor: themeColor,
            }}
          >
            Add to Cart
          </Button>
        </div>
      )}
    </div>
  );
};

export default WishlistItem;
