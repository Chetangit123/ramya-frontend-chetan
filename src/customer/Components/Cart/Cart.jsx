import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCart } from "../../../Redux/Customers/Cart/Action";
import { toast } from "react-toastify";
import LoginUserForm from "../Auth/Login";
import AuthModal from "../Auth/AuthModal";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { cart } = useSelector((store) => store);
  const [isUpdating, setIsUpdating] = useState(false);
  const [guestCartItems, setGuestCartItems] = useState([]);
  const [showAuth, setShowAuth] = useState(false);
  // Load cart items for guests
  console.log("jwt", jwt);
  useEffect(() => {
    if (!jwt) {
      const items = JSON.parse(localStorage.getItem("guestCart")) || [];
      setGuestCartItems(items);
    } else {
      setShowAuth(false);
      // If logged in, fetch cart from backend
      dispatch(getCart(jwt));
    }
  }, [jwt, dispatch]);

  // Unified cart items based on login state
  const cartItems = jwt ? cart.cartItems || [] : guestCartItems;

  // For guest cart calculation, assume product has price/discountedPrice in structure
  const calculateTotals = () => {
    if (!cartItems || cartItems.length === 0) {
      return {
        totalPrice: 0,
        discounte: 0,
        totalDiscountedPrice: 0,
        totalItem: 0,
      };
    }

    let totalPrice = 0,
      totalDiscountedPrice = 0,
      totalItem = 0;

    cartItems?.forEach((item) => {
      // For logged-in users (cart item from backend), use item.product
      // For guests, item itself should have price fields
      const product = item?.product || item;
      if (!product) return;
      totalPrice += (product.price || 0) * item.quantity;
      totalDiscountedPrice += (product.discountedPrice || 0) * item.quantity;
      totalItem += item.quantity;
    });

    const discounte = totalPrice - totalDiscountedPrice;

    return {
      totalPrice,
      discounte,
      totalDiscountedPrice,
      totalItem,
    };
  };

  const totals = calculateTotals();

  const handleShowAuth = () => {
    setShowAuth(true);
    toast.info("Please login to checkout");
  };

  const handleCloseAuth = () => setShowAuth(false)

  return (
    <div className="">
      {showAuth && <AuthModal handleClose={handleCloseAuth} open={showAuth} />}
      {cartItems?.length > 0 ? (
        <div className="lg:grid grid-cols-3 lg:px-16 relative">
          <div className="lg:col-span-2 lg:px-5 bg-white">
            <div className="space-y-3">
              {cartItems
                ?.filter((item) => item?.product || item) // Check guest item validity
                ?.map((item, idx) => (
                  <CartItem
                    key={item._id || `${item?.productId}_${item.size}_${idx}`}
                    item={item}
                    showButton={true}
                    setIsUpdating={setIsUpdating}
                    isGuest={!jwt}
                  />
                ))}
            </div>
          </div>
          <div className="px-5 sticky top-0 h-[100vh] mt-5 lg:mt-0">
            <div className="border p-5 bg-white shadow-lg rounded-md relative">
              {isUpdating && (
                <div className="absolute inset-0 bg-white/60 flex justify-center items-center z-10 rounded-md">
                  <CircularProgress size={24} style={{ color: "#551F3D" }} />
                </div>
              )}
              <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
              <hr />

              <div className="space-y-3 font-semibold">
                <div className="flex justify-between pt-3 text-black">
                  <span>
                    Price ({totals?.totalItem} item
                    {totals?.totalItem !== 1 ? "s" : ""})
                  </span>
                  <span>₹{totals?.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="text-green-700">-₹{totals?.discounte}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charges</span>
                  <span className="text-green-700">Free</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-green-700">
                    ₹{totals?.totalDiscountedPrice}
                  </span>
                </div>
              </div>

              <button
                onClick={() =>
                  jwt ? navigate("/checkout?step=2") : handleShowAuth()
                }
                disabled={isUpdating}
                className="bg-brand checkout_btn text-white font-bold rounded-md hover:bg-brand hover:shadow-lg transition-all duration-300"
                style={{
                  padding: ".8rem 2rem",
                  marginTop: "2rem",
                  width: "100%",
                  opacity: isUpdating ? 0.7 : 1,
                }}
              >
                {isUpdating ? (
                  <CircularProgress size={24} style={{ color: "white" }} />
                ) : jwt ? (
                  "Check Out"
                ) : (
                  "Login to Check Out"
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[60vh]">
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-brand text-white px-6 py-2 rounded-md hover:bg-brand-dark transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
