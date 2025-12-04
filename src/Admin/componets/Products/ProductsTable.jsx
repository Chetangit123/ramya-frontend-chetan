// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   CardHeader,
//   FormControl,
//   Grid,
//   InputLabel,
//   MenuItem,
//   Modal,
//   Pagination,
//   Select,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TextField,
//   Typography,
// } from "@mui/material";

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteProduct, findProducts } from "../../../Redux/Customers/Product/Action";
// import axios from "axios";
// import { toast } from "react-toastify";
// import api, { API_BASE_URL } from "../../../config/api";
// import { useDropzone } from "react-dropzone";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ProductsTable = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { customersProduct } = useSelector((store) => store);

//   const [filterValue, setFilterValue] = useState({
//     availability: "",
//     category: "",
//     sort: "",
//   });

//   const searchParams = new URLSearchParams(location.search);
//   const availability = searchParams.get("availability");
//   const category = searchParams.get("category");
//   const sort = searchParams.get("sort");
//   const page = searchParams.get("page");
//    const [editImages, setEditImages] = useState([]);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [selectedProductId, setSelectedProductId] = useState(null);
//   const [editData, setEditData] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
// const [searchResults, setSearchResults] = useState([]);
// const handleSearch = async (term) => {
//   setSearchTerm(term);

//   if (term.trim() === "") {
//     setSearchResults([]);
//     return;
//   }

//   try {
//     const res = await axios.get(
//       `${API_BASE_URL}/api/products/search`,
//       { params: { query: term } } // <-- send as query param
//     );
//     setSearchResults(res.data);
//   } catch (err) {
//     console.error("Search failed:", err);
//   }
// };

//   const handlePaginationChange = (event, value) => {
//     searchParams.set("page", value - 1);
//     const query = searchParams.toString();
//     navigate({ search: `?${query}` });
//   };

//   useEffect(() => {
//     const data = {
//       category: category || "",
//       colors: [],
//       sizes: [],
//       minPrice: 0,
//       maxPrice: 100000,
//       minDiscount: 0,
//       sort: sort || "price_low",
//       pageNumber: page || 1,
//       pageSize: 10,
//       stock: availability,
//     };
//     dispatch(findProducts(data));
//   }, [availability, category, sort, page, customersProduct.deleteProduct]);

//   const handleFilterChange = (e, sectionId) => {
//     setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
//     searchParams.set(sectionId, e.target.value);
//     const query = searchParams.toString();
//     navigate({ search: `?${query}` });
//   };

// const handleDeleteProduct = async (productId) => {
//   try {
//     await dispatch(deleteProduct(productId));

//     // Optimistically update local UI
//     if (searchTerm) {
//       setSearchResults((prev) => prev.filter((p) => p._id !== productId));
//     } else {
//       customersProduct.products.content = customersProduct.products.content.filter(
//         (p) => p._id !== productId
//       );
//     }

//     toast.success("Product deleted successfully");
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to delete product");
//   }
// };


//   // const handleEditProduct = async (productId) => {
//   //   try {
//   //     // const res = await axios.get(`http://localhost:5454/api/products/id/${productId}`);
//   //     const res = await api.get(`/api/products/id/${productId}`);
//   //     setEditData(res.data);
//   //     setSelectedProductId(productId);
//   //     setEditModalOpen(true);
//   //   } catch (error) {
//   //     console.error("Failed to fetch product:", error);
//   //     toast.error("Failed to load product data");
//   //   }
//   // };
//   const handleEditProduct = async (productId) => {
//   try {
//     const res = await api.get(`/api/products/id/${productId}`);
//     setEditData(res.data);
//     setEditImages(res.data.colorVariants?.[0]?.images || []); // Assuming first variant for simplicity
//     setSelectedProductId(productId);
//     setEditModalOpen(true);
//   } catch (error) {
//     console.error("Failed to fetch product:", error);
//     toast.error("Failed to load product data");
//   }
// };


//   const handleSaveEdit = async () => {
//   try {
//     // Upload new files
//     const uploadedImages = await Promise.all(
//       editImages.map(async (img) => {
//         if (img.file) {
//           const url = await uploadImage(img.file); // Your existing uploadImage function
//           return { ...img, url };
//         }
//         return img; // existing image
//       })
//     );

//     // Update editData with new images
//     const updatedData = {
//       ...editData,
//       colorVariants: [
//         {
//           color: editData.colorVariants?.[0]?.color || "default",
//           images: uploadedImages,
//         },
//       ],
//     };

//     await api.put(`/api/admin/products/${selectedProductId}`, updatedData);
//     toast.success("Product updated");
//     setEditModalOpen(false);

//     // Refetch products
//     const data = {
//       category: category || "",
//       colors: [],
//       sizes: [],
//       minPrice: 0,
//       maxPrice: 100000,
//       minDiscount: 0,
//       sort: sort || "price_low",
//       pageNumber: page || 1,
//       pageSize: 10,
//       stock: availability || "",
//     };
//     dispatch(findProducts(data));
//   } catch (err) {
//     console.error(err);
//     toast.error("Failed to update product");
//   }
// };
//   const uploadImage = async (file) => {
//     const formData = new FormData();
//     formData.append("image", file);

//     try {
//       const response = await fetch(
//        `${API_BASE_URL}/api/admin/products/upload-product-image`,
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       return data.imageUrl || ""; // Assume backend responds with uploaded URL
//     } catch (err) {
//       console.error("Image upload failed:", err);
//       return "";
//     }
//   };
// // Dropzone setup
// const { getRootProps, getInputProps, isDragActive } = useDropzone({
//   accept: { "image/*": [] },
//   multiple: true,
//   onDrop: (acceptedFiles) => {
//     const newImages = acceptedFiles.map((file) => ({
//       file,
//       url: URL.createObjectURL(file),
//       label: "front",
//     }));
//     setEditImages((prev) => [...prev, ...newImages]);
//   },
// });


//   return (
//     <Box width={"100%"}>
//       <Card className="p-3">
//         <CardHeader title="Sort" />
//         <Grid container spacing={2}>
//           <Grid item xs={4}>
//             <FormControl fullWidth>
//               <InputLabel>Category</InputLabel>
//               {/* <Select
//                 value={filterValue.category}
//                 label="Category"
//                 onChange={(e) => handleFilterChange(e, "category")}
//               >
//                 <MenuItem value={"pant"}>Men's Pants</MenuItem>
//                 <MenuItem value={"mens_kurta"}>Men's Kurta</MenuItem>
//                 <MenuItem value={"saree"}>Saree</MenuItem>
//                 <MenuItem value={"lengha_choli"}>Lengha Choli</MenuItem>
//               </Select> */}
//             </FormControl>
//           </Grid>
//           <Grid item xs={4}>
//             <FormControl fullWidth>
//               <InputLabel>Availability</InputLabel>
//               <Select
//                 value={filterValue.availability}
//                 label="Availability"
//                 onChange={(e) => handleFilterChange(e, "availability")}
//               >
//                 <MenuItem value={"All"}>All</MenuItem>
//                 <MenuItem value={"in_stock"}>Instock</MenuItem>
//                 <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//           <Grid item xs={4}>
//             <FormControl fullWidth>
//               <InputLabel>Sort By Price</InputLabel>
//               <Select
//                 value={filterValue.sort}
//                 label="Sort By Price"
//                 onChange={(e) => handleFilterChange(e, "sort")}
//               >
//                 <MenuItem value={"price_high"}>High - Low</MenuItem>
//                 <MenuItem value={"price_low"}>Low - High</MenuItem>
//               </Select>
//             </FormControl>
//           </Grid>
//         </Grid>
//       </Card>
//     <Card className="p-3 mt-2">
//   <TextField
//     fullWidth
//     label="Search Products"
//     value={searchTerm}
//     onChange={(e) => handleSearch(e.target.value)}
//   />
// </Card>

//       <Card className="mt-2">
//         <CardHeader title="All Products" />
//         <TableContainer>
//           <Table sx={{ minWidth: 800 }}>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Image</TableCell>
//                 <TableCell>Title</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
//                 <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
//               </TableRow>
//             </TableHead>
//          <TableBody>
//   {(searchTerm ? searchResults : customersProduct?.products?.content)?.map((item) => (
//     <TableRow hover key={item._id}>
//       <TableCell>
//         <Avatar alt={item.title} src={item.imageUrl} />
//       </TableCell>
//       <TableCell>
//         <Box sx={{ display: "flex", flexDirection: "column" }}>
//           <Typography sx={{ fontWeight: 500 }}>
//             {item.title}
//           </Typography>
//           <Typography variant="caption">{item.brand}</Typography>
//         </Box>
//       </TableCell>
//       <TableCell sx={{ textAlign: "center" }}>
//         {item.category?.name}
//       </TableCell>
//       <TableCell sx={{ textAlign: "center" }}>
//         {item.discountedPrice}
//       </TableCell>
//       <TableCell sx={{ textAlign: "center" }}>
//         {item.quantity}
//       </TableCell>
//       <TableCell sx={{ textAlign: "center" }}>
//         <Button variant="text" onClick={() => handleDeleteProduct(item._id)}>
//           Delete
//         </Button>
//         <br />
//         <Button
//           variant="outlined"
//           size="small"
//           onClick={() => handleEditProduct(item._id)}
//         >
//           Edit
//         </Button>
//       </TableCell>
//     </TableRow>
//   ))}
// </TableBody>

//           </Table>
//         </TableContainer>
//       </Card>

//       <Card className="mt-2 border">
//         <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
//           <Pagination
//             count={customersProduct.products?.totalPages}
//             color="primary"
//             onChange={handlePaginationChange}
//           />
//         </div>
//       </Card>
//     <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
//   <Box
//     sx={{
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: "90%",
//       maxWidth: 600,
//       maxHeight: "90vh",
//       bgcolor: "background.paper",
//       borderRadius: 2,
//       boxShadow: 24,
//       p: 3,
//       overflowY: "auto",
//     }}
//   >
//     <Typography variant="h6" mb={2}>
//       Edit Product
//     </Typography>

//     {editData && (
//       <Box component="form" noValidate autoComplete="off">
//         {/* Images Section */}
//         <Box mt={2} mb={2}>
//           <Typography variant="subtitle1">Images</Typography>
//           <Box display="flex" gap={2} flexWrap="wrap">
//             {editImages.map((img, index) => (
//               <Box key={index} position="relative">
//                 <img
//                   src={img.url}
//                   alt={img.label || `img-${index}`}
//                   width={80}
//                   height={80}
//                   style={{ objectFit: "cover", borderRadius: 8 }}
//                 />
//                 <Button
//                   size="small"
//                   color="error"
//                   onClick={() => {
//                     const newImages = editImages.filter((_, i) => i !== index);
//                     setEditImages(newImages);
//                   }}
//                   style={{
//                     position: "absolute",
//                     top: 0,
//                     right: 0,
//                     minWidth: "auto",
//                   }}
//                 >
//                   X
//                 </Button>
//               </Box>
//             ))}
//           </Box>

//       <Box
//   {...getRootProps()}
//   sx={{
//     border: "2px dashed #ccc",
//     borderRadius: 2,
//     p: 3,
//     textAlign: "center",
//     cursor: "pointer",
//     bgcolor: isDragActive ? "#f0f8ff" : "transparent",
//     mt: 2,
//   }}
// >
//   <input {...getInputProps()} />
//   {isDragActive ? (
//     <Typography variant="body2" color="primary">
//       Drop the files here...
//     </Typography>
//   ) : (
//     <Typography variant="body2" color="textSecondary">
//       Drag & drop images here, or click to select
//     </Typography>
//   )}
// </Box>

//         </Box>

//         {/* Title */}
//         <TextField
//           fullWidth
//           label="Title"
//           margin="normal"
//           value={editData.title}
//           onChange={(e) =>
//             setEditData({ ...editData, title: e.target.value })
//           }
//         />

//         {/* Price */}
//         <TextField
//           fullWidth
//           label="Price"
//           margin="normal"
//           type="number"
//           value={editData.price}
//           onChange={(e) => {
//             const newPrice = Number(e.target.value);
//             const newDiscountedPrice =
//               newPrice - (newPrice * (editData.discountPersent || 0)) / 100;
//             setEditData({
//               ...editData,
//               price: newPrice,
//               discountedPrice: Math.round(newDiscountedPrice),
//             });
//           }}
//         />

//         {/* Discount % */}
//         <TextField
//           fullWidth
//           label="Discount %"
//           margin="normal"
//           type="number"
//           value={editData.discountPersent}
//           onChange={(e) => {
//             const discount = Math.max(
//               0,
//               Math.min(100, parseInt(e.target.value || "0"))
//             );
//             const newDiscountedPrice =
//               editData.price - (editData.price * discount) / 100;
//             setEditData({
//               ...editData,
//               discountPersent: discount,
//               discountedPrice: Math.round(newDiscountedPrice),
//             });
//           }}
//         />

//         {/* Discounted Price */}
//         <TextField
//           fullWidth
//           label="Discounted Price"
//           margin="normal"
//           type="number"
//           value={editData.discountedPrice}
//           onChange={(e) =>
//             setEditData({
//               ...editData,
//               discountedPrice: Number(e.target.value),
//             })
//           }
//         />

//         {/* Quantity */}
//         <TextField
//           fullWidth
//           label="Quantity"
//           margin="normal"
//           type="number"
//           value={editData.quantity}
//           onChange={(e) =>
//             setEditData({ ...editData, quantity: Number(e.target.value) })
//           }
//         />

//         {/* Description */}
//         <TextField
//           fullWidth
//           multiline
//           rows={4}
//           label="Description"
//           margin="normal"
//           value={editData.description}
//           onChange={(e) =>
//             setEditData({ ...editData, description: e.target.value })
//           }
//         />

//         {/* Buttons */}
//         <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
//           <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
//         <Button
//   variant="contained"
//   onClick={async () => {
//     try {
//       // 1. Upload new images
//       const uploadedImages = await Promise.all(
//         editImages.map(async (img) => {
//           if (img.file) {
//             const url = await uploadImage(img.file); // Your uploadImage function
//             return { label: img.label || "front", url };
//           }
//           return { label: img.label || "front", url: img.url };
//         })
//       );

//       // 2. Prepare updated data
//       const updatedData = {
//         ...editData,
//         colorVariants: [
//           {
//             color: editData.colorVariants?.[0]?.color || "default",
//             images: uploadedImages,
//           },
//         ],
//       };

//       // 3. Update product in backend
//       const { data: updatedProduct } = await api.put(
//         `/api/admin/products/${selectedProductId}`,
//         updatedData
//       );

//       // 4. Optimistically update UI (instant update)
//       setSearchResults((prev) =>
//         prev.map((p) =>
//           p._id === selectedProductId ? { ...p, ...updatedProduct } : p
//         )
//       );

//       // 5. Close modal & notify
//       setEditModalOpen(false);
//       toast.success("Product updated ✅");

//       // 6. Background refresh (keeps everything synced)
//       const filterData = {
//         category: category || "",
//         colors: [],
//         sizes: [],
//         minPrice: 0,
//         maxPrice: 100000,
//         minDiscount: 0,
//         sort: sort || "price_low",
//         pageNumber: page || 1,
//         pageSize: 10,
//         stock: availability || "",
//       };
//       dispatch(findProducts(filterData));
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to update product ❌");
//     }
//   }}
// >
//   Save
// </Button>

//         </Box>
//       </Box>
//     )}
//   </Box>
// </Modal>
//   <ToastContainer
//         position="top-right"
//         autoClose={2000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />

//     </Box>
//   );
// };

// export default ProductsTable;


import {
  Avatar,
  Box,
  Button,
  Card,
  CardHeader,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Pagination,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findProducts } from "../../../Redux/Customers/Product/Action";
import axios from "axios";
import { toast } from "react-toastify";
import api, { API_BASE_URL } from "../../../config/api";
import { useDropzone } from "react-dropzone";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductsTable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);

  const [filterValue, setFilterValue] = useState({
    availability: "",
    category: "",
    sort: "",
  });

  const searchParams = new URLSearchParams(location.search);
  const availability = searchParams.get("availability");
  const category = searchParams.get("category");
  const sort = searchParams.get("sort");
  const page = searchParams.get("page");

  const [editImages, setEditImages] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [editData, setEditData] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // New states for delete confirmation modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleSearch = async (term) => {
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(`${API_BASE_URL}/api/products/search`, {
        params: { query: term },
      });
      setSearchResults(res.data);
    } catch (err) {
      console.error("Search failed:", err);
    }
  };

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value - 1);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  useEffect(() => {
    const data = {
      category: category || "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 100000,
      minDiscount: 0,
      sort: sort || "price_low",
      pageNumber: page || 1,
      pageSize: 10,
      stock: availability,
    };
    dispatch(findProducts(data));
  }, [availability, category, sort, page, customersProduct.deleteProduct]);

  const handleFilterChange = (e, sectionId) => {
    setFilterValue((values) => ({ ...values, [sectionId]: e.target.value }));
    searchParams.set(sectionId, e.target.value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // Updated delete handler to open modal
  const openDeleteModal = (productId) => {
    setProductToDelete(productId);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await dispatch(deleteProduct(productToDelete));

      if (searchTerm) {
        setSearchResults((prev) => prev.filter((p) => p._id !== productToDelete));
      } else {
        customersProduct.products.content = customersProduct.products.content.filter(
          (p) => p._id !== productToDelete
        );
      }

      toast.success("Product deleted successfully");
      setDeleteModalOpen(false);
      setProductToDelete(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete product");
    }
  };

  const handleEditProduct = async (productId) => {
    try {
      const res = await api.get(`/api/products/id/${productId}`);
      setEditData(res.data);
      setEditImages(res.data.colorVariants?.[0]?.images || []);
      setSelectedProductId(productId);
      setEditModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch product:", error);
      toast.error("Failed to load product data");
    }
  };

  const handleSaveEdit = async () => {
    try {
      const uploadedImages = await Promise.all(
        editImages.map(async (img) => {
          if (img.file) {
            const url = await uploadImage(img.file);
            return { ...img, url };
          }
          return img;
        })
      );

      const updatedData = {
        ...editData,
        colorVariants: [
          {
            color: editData.colorVariants?.[0]?.color || "default",
            images: uploadedImages,
          },
        ],
      };

      await api.put(`/api/admin/products/${selectedProductId}`, updatedData);
      toast.success("Product updated");
      setEditModalOpen(false);

      const data = {
        category: category || "",
        colors: [],
        sizes: [],
        minPrice: 0,
        maxPrice: 100000,
        minDiscount: 0,
        sort: sort || "price_low",
        pageNumber: page || 1,
        pageSize: 10,
        stock: availability || "",
      };
      dispatch(findProducts(data));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update product");
    }
  };

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/admin/products/upload-product-image`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      return data.imageUrl || "";
    } catch (err) {
      console.error("Image upload failed:", err);
      return "";
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: true,
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        file,
        url: URL.createObjectURL(file),
        label: "front",
      }));
      setEditImages((prev) => [...prev, ...newImages]);
    },
  });

  return (
    <Box width={"100%"}>
      <Card className="p-3">
        <CardHeader title="Sort" />
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Availability</InputLabel>
              <Select
                value={filterValue.availability}
                label="Availability"
                onChange={(e) => handleFilterChange(e, "availability")}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"in_stock"}>Instock</MenuItem>
                <MenuItem value={"out_of_stock"}>Out Of Stock</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth>
              <InputLabel>Sort By Price</InputLabel>
              <Select
                value={filterValue.sort}
                label="Sort By Price"
                onChange={(e) => handleFilterChange(e, "sort")}
              >
                <MenuItem value={"price_high"}>High - Low</MenuItem>
                <MenuItem value={"price_low"}>Low - High</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Card>

      <Card className="p-3 mt-2">
        <TextField
          fullWidth
          label="Search Products"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Card>

      <Card className="mt-2">
        <CardHeader title="All Products" />
        <TableContainer>
          <Table sx={{ minWidth: 800 }}>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Title</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Category</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Price</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Quantity</TableCell>
                <TableCell sx={{ textAlign: "center" }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(searchTerm ? searchResults : customersProduct?.products?.content)?.map((item) => (
                <TableRow hover key={item._id}>
                  <TableCell>
                    <Avatar alt={item.title} src={item.imageUrl} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <Typography sx={{ fontWeight: 500 }}>{item.title}</Typography>
                      <Typography variant="caption">{item.brand}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.category?.name}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.discountedPrice}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>{item.quantity}</TableCell>
                  <TableCell sx={{ textAlign: "center" }}>
                    <Button variant="text" color="error" onClick={() => openDeleteModal(item._id)}>
                      Delete
                    </Button>
                    <br />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleEditProduct(item._id)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>

      <Card className="mt-2 border">
        <div className="mx-auto px-4 py-5 flex justify-center shadow-lg rounded-md">
          <Pagination
            count={customersProduct.products?.totalPages}
            color="primary"
            onChange={handlePaginationChange}
          />
        </div>
      </Card>

      {/* Edit Modal */}
      <Modal open={editModalOpen} onClose={() => setEditModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 600,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 3,
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" mb={2}>
            Edit Product
          </Typography>
          {editData && (
            <Box component="form" noValidate autoComplete="off">
              <Box mt={2} mb={2}>
                <Typography variant="subtitle1">Images</Typography>
                <Box display="flex" gap={2} flexWrap="wrap">
                  {editImages.map((img, index) => (
                    <Box key={index} position="relative">
                      <img
                        src={img.url}
                        alt={img.label || `img-${index}`}
                        width={80}
                        height={80}
                        style={{ objectFit: "cover", borderRadius: 8 }}
                      />
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          const newImages = editImages.filter((_, i) => i !== index);
                          setEditImages(newImages);
                        }}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                          minWidth: "auto",
                        }}
                      >
                        X
                      </Button>
                    </Box>
                  ))}
                </Box>

                <Box
                  {...getRootProps()}
                  sx={{
                    border: "2px dashed #ccc",
                    borderRadius: 2,
                    p: 3,
                    textAlign: "center",
                    cursor: "pointer",
                    bgcolor: isDragActive ? "#f0f8ff" : "transparent",
                    mt: 2,
                  }}
                >
                  <input {...getInputProps()} />
                  {isDragActive ? (
                    <Typography variant="body2" color="primary">
                      Drop the files here...
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="textSecondary">
                      Drag & drop images here, or click to select
                    </Typography>
                  )}
                </Box>
              </Box>

              <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={editData.title}
                onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              />
              <TextField
                fullWidth
                label="Price"
                margin="normal"
                type="number"
                value={editData.price}
                onChange={(e) => {
                  const newPrice = Number(e.target.value);
                  const newDiscountedPrice =
                    newPrice - (newPrice * (editData.discountPersent || 0)) / 100;
                  setEditData({
                    ...editData,
                    price: newPrice,
                    discountedPrice: Math.round(newDiscountedPrice),
                  });
                }}
              />
              <TextField
                fullWidth
                label="Discount %"
                margin="normal"
                type="number"
                value={editData.discountPersent}
                onChange={(e) => {
                  const discount = Math.max(
                    0,
                    Math.min(100, parseInt(e.target.value || "0"))
                  );
                  const newDiscountedPrice =
                    editData.price - (editData.price * discount) / 100;
                  setEditData({
                    ...editData,
                    discountPersent: discount,
                    discountedPrice: Math.round(newDiscountedPrice),
                  });
                }}
              />
              <TextField
                fullWidth
                label="Discounted Price"
                margin="normal"
                type="number"
                value={editData.discountedPrice}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    discountedPrice: Number(e.target.value),
                  })
                }
              />
              <TextField
                fullWidth
                label="Quantity"
                margin="normal"
                type="number"
                value={editData.quantity}
                onChange={(e) =>
                  setEditData({ ...editData, quantity: Number(e.target.value) })
                }
              />
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Description"
                margin="normal"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />

              <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
                <Button variant="contained" onClick={handleSaveEdit}>
                  Save
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%",
            maxWidth: 400,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h6" mb={2}>
            Confirm Deletion
          </Typography>
          <Typography mb={3}>Are you sure you want to delete this product?</Typography>
          <Box display="flex" justifyContent="center" gap={2}>
            <Button variant="outlined" onClick={() => setDeleteModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="error" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Modal>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </Box>
  );
};

export default ProductsTable;
