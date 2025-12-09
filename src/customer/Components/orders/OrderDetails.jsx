// import { Box, Button, Grid, Typography } from "@mui/material";
// import React from "react";
// import OrderTraker from "./OrderTraker";
// import StarIcon from "@mui/icons-material/Star";
// import { useNavigate, useParams } from "react-router-dom";
// import AddressCard from "../adreess/AdreessCard";
// import { deepPurple } from "@mui/material/colors";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { getOrderById } from "../../../Redux/Customers/Order/Action";
// import BackdropComponent from "../BackDrop/Backdrop";

// const OrderDetails = () => {
//   const dispatch = useDispatch();
//   const jwt = localStorage.getItem("jwt");
//   const { orderId } = useParams();
//   const { order } = useSelector((store) => store);


//   useEffect(() => {
//     dispatch(getOrderById(orderId));
//   }, []);

//   const navigate = useNavigate();
//   return (
//     <>
//       {!order.loading && <div className=" px-2 lg:px-36 space-y-7 ">
//         <Grid container className="p-3 shadow-lg">
//           <Grid xs={12}>
//             <p className="font-bold text-lg py-2">Delivery Address</p>
//           </Grid>
//           <Grid item xs={6}>
//             <AddressCard address={order.order?.shippingAddress} />
//           </Grid>
//         </Grid>
//         <Box className="p-5 shadow-lg border rounded-md">
//           <Grid
//             container
//             sx={{ justifyContent: "space-between", alignItems: "center" }}
//           >
//             <Grid item xs={9}>
//               <OrderTraker
//                 activeStep={
//                   order.order?.orderStatus === "PLACED"
//                     ? 1
//                     : order.order?.orderStatus === "CONFIRMED"
//                       ? 2
//                       : order.order?.orderStatus === "SHIPPED"
//                         ? 3
//                         : 5
//                 }
//               />
//             </Grid>
//             <Grid item>
//               {order.order?.orderStatus === "DELIVERED" && <Button sx={{ color: "" }} color="error" variant="text" >
//                 RETURN
//               </Button>}

//               {/* {order.order?.orderStatus !== "DELIVERED" && <Button sx={{ color: deepPurple[500] }} variant="text">
//                 cancel order
//               </Button>} */}
//             </Grid>
//           </Grid>
//         </Box>



//         <Grid container className="space-y-5">
//           {order.order?.orderItems.map((item) => (
//             <Grid
//               container
//               item
//               className="shadow-xl rounded-md p-5 border"
//               sx={{ alignItems: "center", justifyContent: "space-between" }}
//             >
//               <Grid item xs={6}>
//                 {" "}
//                 <div className="flex  items-center ">
//                   <img
//                     className="w-[5rem] h-[5rem] object-cover object-top"
//                     src={item?.product?.colorVariants[0].images[0]?.url || item?.product?.imageUrl}
//                     alt=""
//                   />
//                   <div className="ml-5 space-y-2">
//                     <p className="">{item?.product?.title}</p>
//                     <p className="opacity-50 text-xs font-semibold space-x-5">
//                       <span>Color: pink</span> <span>Size: {item?.size}</span>
//                     </p>
//                     <p>Seller: {item?.product?.brand}</p>
//                     <p>₹{item.price} </p>
//                   </div>
//                 </div>
//               </Grid>
//               <Grid item>
//                 {
//                   <Box
//                     sx={{ color: deepPurple[500] }}
//                     onClick={() => navigate(`/account/rate/${item?.product?._id}`)}
//                     className="flex items-center cursor-pointer"
//                   >
//                     <StarIcon
//                       sx={{ fontSize: "2rem" }}
//                       className="px-2 text-5xl"
//                     />
//                     <span>Rate & Review Product</span>
//                   </Box>
//                 }
//               </Grid>
//             </Grid>
//           ))}
//         </Grid>


//       </div>}
//       <BackdropComponent open={order.loading} />
//     </>

//   );
// };
// // sx={{width:"10px",height:"10px"}}
// export default OrderDetails;


import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import OrderTraker from "./OrderTraker";
import StarIcon from "@mui/icons-material/Star";
import { useNavigate, useParams } from "react-router-dom";
import AddressCard from "../adreess/AdreessCard";
import { deepPurple } from "@mui/material/colors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrderById } from "../../../Redux/Customers/Order/Action";
import BackdropComponent from "../BackDrop/Backdrop";

const OrderDetails = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { orderId } = useParams();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getOrderById(orderId));
  }, [dispatch, orderId]);

  const navigate = useNavigate();

  // Safely derive price-related values with fallbacks
  const amountWithShipping =
    order.order?.amountWithShipping ?? order.order?.totalPrice ?? 0;

  const discountedAmountWithShipping =
    order.order?.discountedAmountWithShipping ??
    order.order?.totalDiscountedPrice ??
    0;

  const shippingCharges = order.order?.shippingCharges ?? 0;

  return (
    <>
      {!order.loading && (
        <div className=" px-2 lg:px-36 space-y-7 ">
          <Grid container className="p-3 shadow-lg">
            <Grid xs={12}>
              <p className="font-bold text-lg py-2">Delivery Address</p>
            </Grid>
            <Grid item xs={6}>
              <AddressCard address={order.order?.shippingAddress} />
            </Grid>
          </Grid>

          <Box className="p-5 shadow-lg border rounded-md">
            <Grid
              container
              sx={{ justifyContent: "space-between", alignItems: "center" }}
            >
              <Grid item xs={9}>
                <OrderTraker
                  activeStep={
                    order.order?.orderStatus === "PLACED"
                      ? 1
                      : order.order?.orderStatus === "CONFIRMED"
                        ? 2
                        : order.order?.orderStatus === "SHIPPED"
                          ? 3
                          : 5
                  }
                />
              </Grid>
              <Grid item>
                {order.order?.orderStatus === "DELIVERED" && (
                  <Button sx={{ color: "" }} color="error" variant="text">
                    RETURN
                  </Button>
                )}

                {/* {order.order?.orderStatus !== "DELIVERED" && <Button sx={{ color: deepPurple[500] }} variant="text">
                cancel order
              </Button>} */}
              </Grid>
            </Grid>
          </Box>

          <Grid container className="space-y-5">
            {order.order?.orderItems.map((item) => (
              <Grid
                key={item._id}
                container
                item
                className="shadow-xl rounded-md p-5 border"
                sx={{ alignItems: "center", justifyContent: "space-between" }}
              >
                <Grid item xs={6}>
                  {" "}
                  <div className="flex  items-center ">
                    <img
                      className="w-[5rem] h-[5rem] object-cover object-top"
                      src={
                        item?.product?.colorVariants[0].images[0]?.url ||
                        item?.product?.imageUrl
                      }
                      alt=""
                    />
                    <div className="ml-5 space-y-2">
                      <p className="">{item?.product?.title}</p>
                      <p className="opacity-50 text-xs font-semibold space-x-5">
                        {/* <span>Color: pink</span>{" "}
                        <span>Size: {item?.size}</span> */}
                      </p>
                      <p>Seller: {item?.product?.brand}</p>
                      {/* item.price ko cut krna he  */}
                      <p>
                        Price: <span style={{ textDecoration: "line-through" }}>₹{item.price}</span>
                      </p>                      <p>Discounted Price: ₹{item.discountedPrice}</p>
                    </div>
                  </div>
                </Grid>
                <Grid item>
                  {
                    <Box
                      sx={{ color: deepPurple[500] }}
                      onClick={() =>
                        navigate(`/account/rate/${item?.product?._id}`)
                      }
                      className="flex items-center cursor-pointer"
                    >
                      <StarIcon
                        sx={{ fontSize: "2rem" }}
                        className="px-2 text-5xl"
                      />
                      <span>Rate & Review Product</span>
                    </Box>
                  }
                </Grid>
              </Grid>
            ))}
          </Grid>

          {/* Price Details / Summary */}
          <Box className="p-5 shadow-lg border rounded-md space-y-4">
            <Typography variant="h6" className="font-semibold">
              Price Details
            </Typography>
            <Grid container>
              <Grid item xs={6}>
                <Typography>Shipping Charges</Typography>
              </Grid>
              <Grid item xs={6} textAlign="right">
                <Typography>₹{shippingCharges}</Typography>
              </Grid>

              <Grid item xs={6} mt={1}>
                <Typography>Total Amount (With Shipping)</Typography>
              </Grid>
              <Grid item xs={6} mt={1} textAlign="right">
                <Typography>₹{amountWithShipping}</Typography>
              </Grid>

              <Grid item xs={6} mt={1}>
                <Typography>Discounted Amount (With Shipping)</Typography>
              </Grid>
              <Grid item xs={6} mt={1} textAlign="right">
                <Typography>₹{discountedAmountWithShipping}</Typography>
              </Grid>
            </Grid>
          </Box>
        </div>
      )}
      <BackdropComponent open={order.loading} />
    </>
  );
};
// sx={{width:"10px",height:"10px"}}
export default OrderDetails;

