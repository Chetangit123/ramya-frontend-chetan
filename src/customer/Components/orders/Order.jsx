import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import OrderCard from "./OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";

const orderStatus = [
  { label: "On The Way", value: "onTheWay" },
  { label: "Delivered", value: "delevered" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderHistory({ jwt }));
  }, [jwt]);

  const hasOrders = order.orders && order.orders.length > 0;

  return (
    <Box className="px-10">
      <Grid container spacing={0} sx={{ justifyContent: "space-between" }}>
        {/* Filters Section */}
        <Grid item xs={2.5}>
          <div className="h-auto shadow-lg bg-white border p-5 sticky top-5">
            <h1 className="font-bold text-lg">Filters</h1>
            <div className="space-y-4 mt-10">
              <h1 className="font-semibold">ORDER STATUS</h1>
              {orderStatus.map((option) => (
                <div key={option.value} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <label className="ml-3 text-sm text-gray-600">
                    {option.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </Grid>

        {/* Orders Section */}
        <Grid item xs={9}>
          <Box className="space-y-5">
            {hasOrders ? (
              order.orders.map((order) =>
                order?.orderItems?.map((item, index) => (
                  <OrderCard key={index} item={item} order={order} />
                ))
              )
            ) : (
              <Typography
                variant="h6"
                align="center"
                sx={{ mt: 10, color: "gray" }}
              >
                No Orders Yet.
              </Typography>
            )}
          </Box>
        </Grid>
      </Grid>

      <BackdropComponent open={order.loading} />
    </Box>
  );
};

export default Order;
