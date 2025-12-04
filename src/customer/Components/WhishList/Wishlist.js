import React, { useEffect, useState } from "react";
import WishlistItem from "./WishlistItem";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { addItemToCart } from "../../../Redux/Customers/Cart/Action";

// Optional: helper for guest users
const addToGuestCart = (product, size = "ONE_SIZE", quantity = 1) => {
  const existingCart = JSON.parse(localStorage.getItem("guestCart")) || [];

  const newItem = {
    ...product,
    size,
    quantity,
    cartId: `${product._id}_${size}`,
  };

  localStorage.setItem("guestCart", JSON.stringify([...existingCart, newItem]));
};

const Wishlist = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState([]);
  const jwt = localStorage.getItem("jwt");
  const themeColor = "rgb(85 31 61 / 1)";

  useEffect(() => {
    const rawData = localStorage.getItem("wishlist");
    try {
      const parsed = JSON.parse(rawData) || [];
      const validItems = parsed.filter((item) => item && item._id);
      setWishlistItems(validItems);
    } catch (err) {
      console.error("Failed to parse wishlist:", err);
      setWishlistItems([]);
    }
  }, []);

  // const handleRemoveItem = (id) => {
  //   const updatedWishlist = wishlistItems.filter((item) => item._id !== id);
  //   setWishlistItems(updatedWishlist);
  //   localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  // };

  const handleRemoveItem = (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item._id !== id);
    setWishlistItems(updatedWishlist);
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));

    // DISPATCH WISHLIST COUNT UPDATE EVENT
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: updatedWishlist.length,
      })
    );
  };


  const handleSubmit = async (productId) => {
    const product = wishlistItems.find((item) => item._id === productId);
    if (!productId || !product) {
      toast.error("Product not found");
      return;
    }

    const selectedSize = product?.sizes?.[0] || "ONE_SIZE";
    const quantity = 1;

    if (jwt) {
      // Logged-in user
      const data = {
        productId,
        size: selectedSize,
        quantity,
      };

      try {
        await dispatch(addItemToCart({ data, jwt }));
        toast.success("Item added to cart!");
      } catch (error) {
        toast.error("Failed to add to cart");
        console.error("Add to cart error:", error);
      }
    } else {
      // Guest user
      try {
        addToGuestCart(product, selectedSize, quantity);
        toast.success("Item added to cart!");
      } catch (error) {
        toast.error("Failed to add to guest cart");
        console.error("Guest cart error:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 lg:px-16">
      {wishlistItems.length > 0 ? (
        <div className="lg:grid grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 bg-white p-5 rounded-lg shadow-md">
            <h2
              className="text-2xl font-bold mb-4"
              style={{ color: themeColor }}
            >
              My Wishlist
            </h2>
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <WishlistItem
                  key={item._id}
                  item={item}
                  showButton={true}
                  onRemove={handleRemoveItem}
                  handlesubmit={() => handleSubmit(item._id)}
                  themeColor={themeColor}
                />
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2
              className="text-xl font-bold mb-4"
              style={{ color: themeColor }}
            >
              Wishlist Summary
            </h2>
            <div className="space-y-2 text-gray-700">
              <p>Total Items: {wishlistItems.length}</p>
              <p>
                Total Price: ₹
                {wishlistItems.reduce(
                  (sum, item) => sum + Number(item.discountedPrice || 0),
                  0
                )}
              </p>
            </div>
            <Button
              variant="contained"
              className="mt-6 w-full"
              style={{
                backgroundColor: themeColor,
                color: "#fff",
                marginTop: "20px",
              }}
              onClick={() => navigate("/")}
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: themeColor }}
          >
            Your wishlist is empty
          </h2>
          <Button
            variant="contained"
            style={{
              backgroundColor: themeColor,
              color: "#fff",
            }}
            onClick={() => navigate("/")}
          >
            Start Shopping
          </Button>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default Wishlist;
