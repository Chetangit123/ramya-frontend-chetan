import React, { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import CartItem from "../Cart/CartItem";
import AddressCard from "../adreess/AdreessCard";
import { createPayment } from "../../../Redux/Customers/Payment/Action";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../../config/api";

const OrderSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loader, setLoader] = useState(false);
  const [order, setOrder] = useState(null);
  const [loadingOrder, setLoadingOrder] = useState(true);
  const orderId = searchParams.get("order_id");
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  // Direct API call to fetch order
  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoadingOrder(true);
        const { data } = await axios.get(`${API_BASE_URL}/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setOrder(data);
      } catch (error) {
        console.error("Error fetching order:", error);
      } finally {
        setLoadingOrder(false);
      }
    };

    if (orderId && jwt) {
      fetchOrder();
    }
  }, [orderId, jwt]);

  const handleCreatePayment = () => {
    setLoader(true);
    const data = { orderId: order?._id, jwt };
    dispatch(createPayment(data))
      .finally(() => {
        setLoader(false);
      });
  };

  if (loadingOrder) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="p-5 shadow-lg rounded-md border ">
        <AddressCard address={order?.shippingAddress} />
      </div>
      <div className="lg:grid grid-cols-3 relative justify-between">
        <div className="lg:col-span-2 ">
          <div className="space-y-3">
            {order?.orderItems.map((item, index) => (
              <CartItem key={index} item={item} showButton={false} />
            ))}
          </div>
        </div>
        <div className="sticky top-0 h-[100vh] mt-5 lg:mt-0 ml-5">
          <div className="border p-5 bg-white shadow-lg rounded-md">
            <p className="font-bold opacity-60 pb-4">PRICE DETAILS</p>
            <hr />

            <div className="space-y-3 font-semibold">
              <div className="flex justify-between pt-3 text-black ">
                <span>Price ({order?.totalItem} item)</span>
                <span>₹{order?.totalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount</span>
                <span className="text-green-700">-₹{order?.discounte}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges</span>
                <span className="text-green-700">Free</span>
              </div>
              <hr />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Amount</span>
                <span className="text-green-700">₹{order?.totalDiscountedPrice}</span>
              </div>
            </div>

            <button
              onClick={handleCreatePayment}
              disabled={loader}
              className="checkout_btn w-full mt-6 py-3 rounded-md text-white bg-[#551f3d] hover:bg-black"
            >
              {loader ? (
                <>
                  <CircularProgress
                    size={24}
                    sx={{
                      color: "white",
                      position: "absolute",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
                  />
                  <span style={{ opacity: 0 }}>Payment</span>
                </>
              ) : (
                "Payment"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
