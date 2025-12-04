import React, { useState } from "react";
import { Button, IconButton, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  removeCartItem,
  updateCartItem,
} from "../../../Redux/Customers/Cart/Action";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";

const CartItem = ({ item, showButton, setIsUpdating, isGuest }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [loading, setLoading] = useState({
    update: false,
    remove: false,
    id: null,
  });

  const product = item?.product || {};
  const {
    title,
    brand,
    discountedPrice,
    price,
    colorVariants = [],
  } = product;

  const defaultVariant = colorVariants[0] || {};
  const color = defaultVariant.color || "N/A";
  const images = defaultVariant.images || [];

  const frontImage =
    images.find((img) => img.label === "front")?.url ||
    product.imageUrl || // fallback
    "";

  // Update quantity
  const handleUpdateCartItem = async (num) => {
    const newQuantity = item.quantity + num;
    if (newQuantity < 1) return;

    setLoading({ update: true, remove: false, id: item?._id || item.productId });
    setIsUpdating(true);

    try {
      if (isGuest || !jwt) {
        // Guest user: update localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const index = guestCart.findIndex(ci => 
          ci.productId === (item.productId || item.product?._id) && ci.size === item.size
        );
        if (index !== -1) {
          guestCart[index].quantity = newQuantity;
          localStorage.setItem("guestCart", JSON.stringify(guestCart));
        }
      } else {
        // Logged-in user: update via backend
        const data = {
          data: { quantity: newQuantity },
          cartItemId: item._id,
          jwt,
        };
        await dispatch(updateCartItem(data));
      }
    } catch (error) {
      console.error("Failed to update quantity:", error);
    } finally {
      setLoading({ update: false, remove: false, id: null });
      setIsUpdating(false);
    }
  };

  // Remove item
  const handleRemoveItemFromCart = async () => {
    setLoading({ update: false, remove: true, id: item?._id || item.productId });
    setIsUpdating(true);

    try {
      if (isGuest || !jwt) {
        // Guest user: remove from localStorage
        const guestCart = JSON.parse(localStorage.getItem("guestCart")) || [];
        const updatedCart = guestCart.filter(ci => 
          !(ci.productId === (item.productId || item.product?._id) && ci.size === item.size)
        );
        localStorage.setItem("guestCart", JSON.stringify(updatedCart));
      } else {
        // Logged-in user: remove via backend
        const data = { cartItemId: item._id, jwt };
        await dispatch(removeCartItem(data));
      }
    } catch (error) {
      console.error("Failed to remove item:", error);
    } finally {
      setLoading({ update: false, remove: false, id: null });
      setIsUpdating(false);
    }
  };

  const isLoading = (type) => loading.id === (item._id || item.productId) && loading[type];

  // For guest items, props may be shaped differently:
  const displayTitle = product.title || item.title || "Product Title";
  const displayBrand = product.brand || item.brand || "Brand";
  const displayPrice = price || item.price || 0;
  const displayDiscountedPrice = discountedPrice || item.discountedPrice || displayPrice;
  const displayColor = item.size ? item.color || color : "N/A";

  return (
    <div className="p-5 shadow-lg border rounded-md relative">
      {(isLoading("update") || isLoading("remove")) && (
        <div className="absolute inset-0 bg-white/60 flex justify-center items-center z-10 rounded-md">
          <CircularProgress size={24} style={{ color: "#551F3D" }} />
        </div>
      )}

      <div className="flex items-center">
        <div className="w-[5rem] h-[5rem] lg:w-[9rem] lg:h-[9rem]">
          <img
            className="w-full h-full object-cover object-top"
            src={frontImage ||  item?.colorVariants?.[0]?.images?.find((img) => img.label === "front")?.url || ""}
            alt={displayTitle}
          />
        </div>
        <div className="ml-5 space-y-1">
          <p className="font-semibold">{displayTitle}</p>
          <p className="opacity-70">
            Size: {item.size || "N/A"}, Color: {displayColor}
          </p>
          <p className="opacity-70 mt-2">Seller: {displayBrand}</p>
          <div className="flex space-x-2 items-center pt-3">
            <p className="opacity-50 line-through">₹{displayPrice}</p>
            <p className="font-semibold text-lg">₹{displayDiscountedPrice}</p>
            <p className="text-green-600 font-semibold">
              {displayPrice > 0
                ? Math.round(
                    ((displayPrice - displayDiscountedPrice) / displayPrice) * 100
                  )
                : 0}
              % off
            </p>
          </div>
        </div>
      </div>

      {showButton && (
        <div className="lg:flex items-center lg:space-x-10 pt-4">
          <div className="flex items-center space-x-2">
            <IconButton
              onClick={() => handleUpdateCartItem(-1)}
              disabled={item.quantity <= 1 || isLoading("update")}
              style={{ color: "#551F3D" }}
            >
              <RemoveCircleOutlineIcon />
            </IconButton>

            <span className="py-1 px-7 border rounded-sm">
              {item.quantity}
            </span>

            <IconButton
              onClick={() => handleUpdateCartItem(1)}
              disabled={item.quantity >= 10 || isLoading("update")}
              style={{ color: "#551F3D" }}
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
          <div className="flex text-sm lg:text-base mt-5 lg:mt-0">
            <Button
              onClick={handleRemoveItemFromCart}
              disabled={isLoading("remove")}
              variant="text"
              style={{ color: isLoading("remove") ? "#551F3D" : "#ff3e6c" }}
            >
              {isLoading("remove") ? (
                <CircularProgress size={16} style={{ color: "#551F3D" }} />
              ) : (
                "Remove"
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItem;
