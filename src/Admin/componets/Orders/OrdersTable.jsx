import {
  Avatar,
  AvatarGroup,
  Box,
  Button,
  Card,
  CardHeader,
  Chip,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Grid,
  Select,
  CircularProgress ,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrder,
  deleteOrder,
  deliveredOrder,
  getOrders,
  shipOrder,
} from "../../../Redux/Admin/Orders/Action";

const OrdersTable = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ status: "", sort: "" });
  const [anchorElArray, setAnchorElArray] = useState([]);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { adminsOrder } = useSelector((store) => store);
  const [loading, setLoading] = useState(true); // <-- Loading state added
   useEffect(() => {
    setLoading(true);
    dispatch(getOrders({ jwt }))
      .finally(() => {
        setLoading(false);
      });
  }, [jwt, adminsOrder.delivered, adminsOrder.shipped, adminsOrder.confirmed]);

  const handleUpdateStatusMenuClick = (event, index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = event.currentTarget;
    setAnchorElArray(newAnchorElArray);
  };

  const handleUpdateStatusMenuClose = (index) => {
    const newAnchorElArray = [...anchorElArray];
    newAnchorElArray[index] = null;
    setAnchorElArray(newAnchorElArray);
  };

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData({ ...formData, [name]: value });
  };

  const handlePaginationChange = (event, value) => {
    console.log("Current page:", value);
  };

  const handleConfirmedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(confirmOrder(orderId));
  };

  const handleShippedOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(shipOrder(orderId));
  };

  const handleDeliveredOrder = (orderId, index) => {
    handleUpdateStatusMenuClose(index);
    dispatch(deliveredOrder(orderId));
  };

  const handleDeleteOrder = (orderId) => {
    dispatch(deleteOrder(orderId));
  };
   const handleDownloadPdf = (byteArray) => {
  try {
    const uint8Array = new Uint8Array(byteArray);
    const blob = new Blob([uint8Array], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "BlueDart_AWB.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (err) {
    console.error("Failed to download AWB PDF", err);
  }
};

  return (
    <Box>
            {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
          <CircularProgress size={60} />
        </Box>
      ) : (
        <>

      <Card className="p-3">
        <CardHeader
          title="Sort"
          sx={{
            pt: 0,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="status-select-label">Status</InputLabel>
              <Select
                labelId="status-select-label"
                id="status-select"
                name="status"             // IMPORTANT: name added
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="">All</MenuItem> {/* Add option for no filter */}
                <MenuItem value={"PLACED"}>PLACED</MenuItem>
                <MenuItem value={"PENDING"}>PENDING</MenuItem>
                <MenuItem value={"CONFIRMED"}>CONFIRMED</MenuItem>
                <MenuItem value={"DELIVERED"}>DELIVERED</MenuItem>
                <MenuItem value={"CANCELLED"}>CANCELLED</MenuItem> {/* Fixed typo */}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                name="sort"               // IMPORTANT: name added
                value={formData.sort}
                label="Sort By"
                onChange={handleChange}
              >
                <MenuItem value="">None</MenuItem> {/* No sorting */}
                <MenuItem value={"Newest"}>Newest</MenuItem>
                <MenuItem value={"Older"}>Older</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <Card className="mt-2">
        <CardHeader
          title="All Orders"
          sx={{
            pt: 2,
            alignItems: "center",
            "& .MuiCardHeader-action": { mt: 0.6 },
          }}
        />
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label="table in dashboard">
            <TableHead>
              <TableRow>
                <TableCell>Products</TableCell>
                <TableCell>Customer Name</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Size</TableCell>
                <TableCell>Address</TableCell>
                {/* <TableCell>AWB NO</TableCell> */}
                {/* <TableCell>Download Lable</TableCell> */}
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Status</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Update</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {adminsOrder?.orders
                ?.filter(
                  (order) =>
                    !formData.status || order.orderStatus === formData.status
                )
                ?.sort((a, b) => {
                  if (formData.sort === "Newest")
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  if (formData.sort === "Older")
                    return new Date(a.createdAt) - new Date(b.createdAt);
                  return 0;
                })
                ?.map((item, index) => (
                  <TableRow
                    hover
                    key={item._id}
                    sx={{ "&:last-of-type td, &:last-of-type th": { border: 0 } }}
                  >
                    <TableCell sx={{ py: (theme) => `${theme.spacing(0.5)} !important` }}>
                      <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                          sx={{
                            fontWeight: 500,
                            fontSize: "0.875rem !important",
                          }}
                        >
                          {item?.orderItems.map((order) => (
                            <span key={order._id}>
                              {order.product?.title} = {order.quantity},{order.size}{" "}
                            </span>
                          ))}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {item?.shippingAddress?.firstName} {item?.shippingAddress?.lastName}
                    </TableCell>
                    <TableCell>
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      }).format(new Date(item?.createdAt))}
                    </TableCell>
                    
                    <TableCell>{item?.totalDiscountedPrice}</TableCell>
                    <TableCell>     {item?.orderItems.map((order) => (
                            <span key={order._id}>
                              {order.size}{" "}
                            </span>
                          ))}</TableCell>
                    <TableCell>
                      {item?.shippingAddress?.streetAddress} {item?.shippingAddress?.state}{" "}
                      {item?.shippingAddress?.zipCode}
                    </TableCell>
                    {/* <TableCell>{item?.awbNo}</TableCell> */}
                    {/* <TableCell>
  <Button
    onClick={() => handleDownloadPdf(item.awbPrint)}
    disabled={!item.awbPrint || item.awbPrint.length === 0}
    variant="outlined"
    size="small"
  >
    Download
  </Button>
</TableCell> */}
                    <TableCell> {item?.shippingAddress?.mobile || item?.user?.mobile || item?.paymentDetails?.mobile}</TableCell>
                    <TableCell>{item?.user?.email}</TableCell>
                    <TableCell className="text-white" sx={{ textAlign: "center" }}>
                      <Chip
                        sx={{
                          color: "white !important",
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                        label={item?.orderStatus}
                        size="small"
                        color={
                          item.orderStatus === "PENDING"
                            ? "info"
                            : item.orderStatus === "DELIVERED"
                              ? "success"
                              : "secondary"
                        }
                      />
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <div>
                        <Button
                          id={`basic-button-${item?._id}`}
                          aria-controls={`basic-menu-${item._id}`}
                          aria-haspopup="true"
                          aria-expanded={Boolean(anchorElArray[index])}
                          onClick={(event) => handleUpdateStatusMenuClick(event, index)}
                        >
                          Status
                        </Button>
                        <Menu
                          id={`basic-menu-${item?._id}`}
                          anchorEl={anchorElArray[index]}
                          open={Boolean(anchorElArray[index])}
                          onClose={() => handleUpdateStatusMenuClose(index)}
                          MenuListProps={{
                            "aria-labelledby": `basic-button-${item._id}`,
                          }}
                        >
                          <MenuItem
                            onClick={() => handleConfirmedOrder(item?._id, index)}
                            disabled={
                              item.orderStatus === "DELIVERED" ||
                              item.orderStatus === "SHIPPED" ||
                              item.orderStatus === "CONFIRMED"
                            }
                          >
                            CONFIRMED ORDER
                          </MenuItem>
                          <MenuItem
                            onClick={() => handleShippedOrder(item._id, index)}
                            disabled={
                              item.orderStatus === "DELIVERED" ||
                              item.orderStatus === "SHIPPED"
                            }
                          >
                            SHIPPED ORDER
                          </MenuItem>
                          <MenuItem onClick={() => handleDeliveredOrder(item._id, index)}>
                            DELIVERED ORDER
                          </MenuItem>
                        </Menu>
                      </div>
                    </TableCell>
                    <TableCell sx={{ textAlign: "center" }}>
                      <Button onClick={() => handleDeleteOrder(item._id)} variant="text">
                        delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card className="mt-2 flex justify-center items-center">
        <Pagination
          className="py-5 w-auto"
          size="large"
          count={10}
          color="primary"
          onChange={handlePaginationChange}
        />
      </Card>
          </>
      )}
    </Box>
  );
};

export default OrdersTable;
