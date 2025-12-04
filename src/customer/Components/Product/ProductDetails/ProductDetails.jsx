// import { useState, useEffect } from "react";
// import { RadioGroup } from "@headlessui/react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Divider, CircularProgress } from "@mui/material";
// import { findProductById } from "../../../../Redux/Customers/Product/Action";
// import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
// import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
// import DetailsBox from "./DetailsBox";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AuthModal from "../../Auth/AuthModal";
// import { addItemToWishList } from "../../../../Redux/Customers/WishList/Action";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import { IconButton } from "@mui/material";
// import Drawer from "@mui/material/Drawer";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import MagnifierImage from "./MagnifierImage";

// const productDescription =
//   "This captivating bronze crystal gown is a showstopper, ideal for weddings, sangeet, and cocktail events...";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetails() {
//   const [selectedSize, setSelectedSize] = useState();
//   const [activeImage, setActiveImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [currentImages, setCurrentImages] = useState([]);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { customersProduct } = useSelector((store) => store);
//   const { productId } = useParams();
//   const jwt = localStorage.getItem("jwt");

//   const handleClose = () => setOpenAuthModal(false);

//   const addToLocalStorage = (key, product, selectedSize, quantity) => {
//     if (!product?._id) {
//       toast.error("Invalid Product");
//       return;
//     }

//     let existingItems = JSON.parse(localStorage.getItem(key)) || [];

//     const alreadyAddedIndex = existingItems.findIndex(
//       (item) => item._id === product._id && item.size === selectedSize
//     );

//     if (alreadyAddedIndex !== -1) {
//       // If product with same size exists, just update quantity
//       existingItems[alreadyAddedIndex].quantity += quantity;
//     } else {
//       // ✅ Get front image from colorVariants if available
//       const defaultVariant = product.colorVariants?.[0] || {};
//       const images = defaultVariant.images || [];
//       const frontImage =
//         images.find((img) => img.label === "front")?.url ||
//         product.imageUrl ||
//         "https://via.placeholder.com/150";

//       existingItems.push({
//         _id: product._id,
//         title: product.title,
//         discountedPrice: product.discountedPrice,
//         price: product.price,
//         brand: product.brand,
//         discountPersent: product.discountPersent,
//         colorVariants: product.colorVariants,
//         imageUrl: frontImage, // ✅ Store front image for guest cart
//         size: selectedSize || "ONE_SIZE",
//         quantity,
//       });
//     }

//     localStorage.setItem(key, JSON.stringify(existingItems));
//   };

//   const handleSetActiveImage = (image) => {
//     setActiveImage(image);
//   };
//   const rating = 0;
//   const reviewCount = 0;
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!productId || !customersProduct.product) {
//       toast.error("Product not found");
//       return;
//     }

//     if (!selectedSize && customersProduct.product?.sizes?.length > 0) {
//       toast.error("Please select a size");
//       return;
//     }

//     setIsAddingToCart(true);

//     const data = {
//       productId,
//       size: selectedSize || "ONE_SIZE",
//       quantity: quantity || 1,
//     };

//     if (jwt) {
//       // Logged in → API call
//       try {
//         await dispatch(addItemToCart({ data, jwt }));
//         toast.success("Item added to cart!");
//       } catch (error) {
//         toast.error("Failed to add to cart");
//         console.error("Add to cart error:", error);
//       } finally {
//         setIsAddingToCart(false);
//       }
//     } else {
//       // Guest user → Local Storage
//       try {
//         addToLocalStorage(
//           "guestCart",
//           customersProduct.product,
//           selectedSize,
//           quantity
//         );
//       } catch (error) {
//         toast.error("Failed to add to cart");
//         console.error("Guest cart add error:", error);
//       } finally {
//         setIsAddingToCart(false);
//       }
//     }
//   };

//   const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);

//   const toggleSizeChart = (open) => () => {
//     setIsSizeChartOpen(open);
//   };

//   const handleAddToWishlist = () => {
//     // if (!jwt) {
//     //   setOpenAuthModal(true);
//     //   return;
//     // }

//     // const wishlistData = {
//     //   productId,
//     //   size: selectedSize?.name || null,
//     // };

//     addToLocalStorage(
//       "wishlist",
//       customersProduct.product,
//       selectedSize,
//       quantity
//     );
//   };

//   useEffect(() => {
//     const defaultColorVariant =
//       customersProduct.product?.colorVariants?.[0] || null;
//     setSelectedColor(defaultColorVariant);
//   }, [customersProduct.product]);

//   useEffect(() => {
//     if (selectedColor) {
//       setCurrentImages(selectedColor.images || []);
//       setActiveImage(selectedColor.images?.[0] || null);
//     }
//   }, [selectedColor]);

//   useEffect(() => {
//     const data = { productId, jwt };
//     setLoading(true);
//     Promise.all([
//       dispatch(findProductById(data)),
//       dispatch(getAllReviews(productId)),
//     ]).finally(() => setLoading(false));
//   }, [productId]);

//   const [currentSlide, setCurrentSlide] = useState(0);

//   // Only initialize keen-slider when currentImages has content
//   const [sliderRef, instanceRef] = useKeenSlider(
//     currentImages.length > 0
//       ? {
//         loop: true,
//         mode: "snap",
//         slides: {
//           perView: 1,
//           spacing: 10,
//         },
//         breakpoints: {
//           "(min-width: 768px)": {
//             slides: { perView: 1, spacing: 15 }, // Tablet
//           },
//           "(min-width: 1024px)": {
//             slides: { perView: 1, spacing: 20 }, // Desktop
//           },
//         },
//         slideChanged(slider) {
//           setCurrentSlide(slider.track.details.rel);
//         },
//       }
//       : null
//   );

//   // Reset slider when images change
//   useEffect(() => {
//     if (instanceRef.current && currentImages.length > 0) {
//       instanceRef.current.update();
//       setCurrentSlide(0);
//     }
//   }, [currentImages]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <CircularProgress />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white lg:px-20">
//       <div className="pt-6">
//         <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
//           {/* Left image preview */}
//           <div className="product-main-image-column flex sm:gap-4">
//             {/* Thumbnails */}
//             <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-y-auto">
//               {currentImages.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img.url}
//                   alt={img.label}
//                   className={`w-16 h-16 object-cover rounded cursor-pointer border ${index === currentSlide ? "border-black" : "border-gray-300"
//                     }`}
//                   onClick={() => instanceRef.current?.moveToIdx(index)}
//                 />
//               ))}
//             </div>

//             {/* Main Image Slider */}
//             <div className="relative w-full lg:max-w-[500px]">
//               {currentImages.length > 0 && (
//                 <div ref={sliderRef} className="keen-slider">
//                   {currentImages.map((img, index) => (
//                     <div key={index} className="keen-slider__slide">
//                       <MagnifierImage
//                         src={img.url}
//                         width={500}    // container size (match slider width)
//                         height={600}
//                         zoomLevel={2.5} // adjust zoom power
//                       />

//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Show navigation buttons only when slider is ready */}
//               {currentImages.length > 1 && instanceRef.current && (
//                 <>
//                   <button
//                     type="button"
//                     onClick={() => instanceRef.current.prev()}
//                     className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
//                   >
//                     &#10094;
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => instanceRef.current.next()}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow"
//                   >
//                     &#10095;
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Right content */}
//           <div className="w-full max-w-full px-0 sm:px-4 pb-10 lg:col-span-1 mx-auto lg:max-w-7xl lg:px-8 lg:pb-24">
//             <div>
//               <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 font-semibold">
//                 {customersProduct.product?.title}
//               </h1>
//             </div>
//             <div>
//               <h5
//                 className="text-lg lg:text-xl tracking-tight "
//                 style={{ color: "grey" }}
//               >
//                 {customersProduct.product?.brand}
//               </h5>
//             </div>

//             <div className="mt-4 border-b">
//               <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-6">
//                 <p className="font-semibold">
//                   ₹{customersProduct.product?.discountedPrice}
//                 </p>
//                 <p className="opacity-50 line-through">
//                   ₹{customersProduct.product?.price}
//                 </p>
//                 <p className="text-green-600 font-semibold">
//                   {customersProduct.product?.discountPersent}% Off
//                 </p>
//               </div>
//               <div className="flex flex-wrap items-center  gap-1 sm:gap-2">
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <svg
//                       key={i}
//                       className={`w-4 h-4 ${i < Math.floor(rating)
//                         ? "text-yellow-400"
//                         : "text-gray-300"
//                         }`}
//                       fill="currentColor"
//                       viewBox="0 0 20 20"
//                     >
//                       <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                     </svg>
//                   ))}
//                 </div>
//                 <span className="ml-2 text-gray-600 text-xs sm:text-sm reviewtext">
//                   {reviewCount} reviews
//                 </span>
//               </div>
//               <div className="flex items-center justify-between mt-5">
//                 <h3 className="text-sm font-medium text-gray-900">
//                   Inclusive of all taxes
//                 </h3>
//               </div>

//               <Divider style={{ marginTop: "20px" }} />
//               <div className="flex items-center justify-between mt-5">
//                 <h2 className="text-sm font-bold text-gray-900">
//                   Offers • <span>1 Available</span>
//                 </h2>
//               </div>

//               <div className="offers-container mt-5">
//                 <div className="offer-card flex gap-2">
//                   <img
//                     src="https://cdn.shopify.com/s/files/1/0682/3755/8034/files/Vector_13.png?v=1737353975"
//                     alt="offer"
//                     className="w-6 h-6"
//                   />
//                   <div>
//                     <div className="font-medium">End of Season Sale</div>
//                     <div className="font-semibold">Prepay & Save!</div>
//                     <div className="text-sm">5% OFF on all prepaid orders.</div>
//                   </div>
//                 </div>
//               </div>
//               <Divider style={{ marginTop: "20px" }} />
//             </div>

//             {/* Size Selection */}
//             <div className="mt-10">
//               <h3 className="text-sm font-bold text-gray-900">Size</h3>
//               <button
//                 onClick={toggleSizeChart(true)}
//                 className="border border-gray-300 text-gray-900 font-medium py-2 px-6 mt-3 rounded-md hover:bg-gray-100"
//               >
//                 Size Chart
//               </button>
//               <div className="space-y-2">
//                 <h2 className="font-bold">Size</h2>
//                 <div className="grid grid-cols-4 gap-3">
//                   {customersProduct.product?.sizes.map((size) => {
//                     const isSelected = selectedSize === size;
//                     return (
//                       <button
//                         key={size}
//                         onClick={() => setSelectedSize(size)}
//                         className={`border rounded-md py-2 text-sm font-medium
//                 ${isSelected ? "bg-black text-white" : "bg-white text-gray-900"
//                           }
//                 hover:border-black`}
//                         style={{ minWidth: "3rem" }}
//                       >
//                         {size}
//                       </button>
//                     );
//                   })}
//                 </div>

//                 {selectedSize && (
//                   <p className="text-green-600 text-sm mt-2">
//                     Selected size: {selectedSize}
//                   </p>
//                 )}
//               </div>
//               {customersProduct.product?.size?.length > 0 ? (
//                 <RadioGroup
//                   value={selectedSize}
//                   onChange={setSelectedSize}
//                   className="mt-4"
//                 >
//                   <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-10">
//                     {customersProduct.product.size.map((size, i) => (
//                       <RadioGroup.Option
//                         key={i}
//                         value={size}
//                         disabled={!size.inStock}
//                         style={{ height: "2rem", width: "3rem" }}
//                         className={({ active }) =>
//                           classNames(
//                             size.inStock
//                               ? "cursor-pointer text-gray-900 shadow-sm"
//                               : "cursor-not-allowed bg-gray-50 text-gray-200",
//                             active ? "bg-brand text-white" : "bg-white",
//                             "group relative flex items-center justify-center rounded-md py-1 px-1 text-sm font-medium uppercase focus:outline-none"
//                           )
//                         }
//                       >
//                         {({ checked }) => (
//                           <RadioGroup.Label as="span">
//                             {size.name}
//                           </RadioGroup.Label>
//                         )}
//                       </RadioGroup.Option>
//                     ))}
//                   </div>
//                 </RadioGroup>
//               ) : (
//                 <p className="text-sm text-gray-500 mt-2">One Size</p>
//               )}
//             </div>
//             <form className="mt-10" onSubmit={handleSubmit}>
//               {customersProduct.product?.colorVariants?.length > 1 && (
//                 <div className="mt-10">
//                   <h3 className="text-sm font-bold text-gray-900 mb-2">
//                     Color
//                   </h3>
//                   <div className="flex gap-2">
//                     {customersProduct.product.colorVariants.map(
//                       (variant, i) => (
//                         <button
//                           key={i}
//                           type="button"
//                           onClick={() => setSelectedColor(variant)}
//                           className={`px-4 py-2 rounded-md border ${selectedColor?.color === variant.color
//                             ? "border-black font-bold"
//                             : "border-gray-300"
//                             }`}
//                         >
//                           {variant.color}
//                         </button>
//                       )
//                     )}
//                   </div>
//                 </div>
//               )}

//               <div className="quantity mt-7 flex items-center space-x-3">
//                 <IconButton
//                   onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
//                   disabled={quantity <= 1}
//                   style={{ color: "#551F3D" }}
//                   aria-label="decrease quantity"
//                 >
//                   <RemoveCircleOutlineIcon />
//                 </IconButton>

//                 <span className="py-1 px-7 border rounded-sm">{quantity}</span>

//                 <IconButton
//                   onClick={() => setQuantity((prev) => prev + 1)}
//                   disabled={quantity >= 10}
//                   style={{ color: "#551F3D" }}
//                   aria-label="increase quantity"
//                 >
//                   <AddCircleOutlineIcon />
//                 </IconButton>
//               </div>

//               {customersProduct.product?.quantity > 0 ? (
//                 <button
//                   type="submit"
//                   disabled={isAddingToCart}
//                   className={`bg-brand text-white font-medium py-2 px-6 mt-6 rounded-md hover:bg-black ${isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                 >
//                   {isAddingToCart ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     "Add To Cart"
//                   )}
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   disabled
//                   className="bg-gray-400 text-white font-medium py-2 px-6 mt-6 rounded-md cursor-not-allowed"
//                 >
//                   Out of Stock
//                 </button>
//               )}

//               <button
//                 type="button"
//                 onClick={handleAddToWishlist}
//                 style={{ marginLeft: "10px" }}
//                 className="border border-gray-300 text-gray-900 font-medium py-2 px-6 mt-3 rounded-md hover:bg-gray-100"
//               >
//                 Add to Wishlist
//               </button>
//             </form>

//             <div className="py-10 border-t">
//               {customersProduct.product?.faq?.length > 0 ? (
//                 customersProduct.product.faq.map((item, index) => (
//                   <DetailsBox
//                     key={index}
//                     title={item.question}
//                     content={item.answer}
//                   />
//                 ))
//               ) : (
//                 <p className="text-gray-500">
//                   No FAQs available for this product.
//                 </p>
//               )}

//               <DetailsBox
//                 title="ABOUT THIS PRODUCT"
//                 content={customersProduct.product?.description || "No description available."}
//               />
//               <DetailsBox
//                 title="MATERIAL"
//                 content="100% Soft Cotton"
//               />

//             </div>
//           </div>
//         </section>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//       <AuthModal handleClose={handleClose} open={openAuthModal} />
//       <Drawer
//         anchor="right"
//         open={isSizeChartOpen}
//         onClose={toggleSizeChart(false)}
//       >
//         <div style={{ width: 320, padding: "1rem" }}>
//           <h2 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>
//             Size Chart
//           </h2>
//           <p style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>
//             *Garment Measurements in Inches
//           </p>

//           <table
//             style={{
//               width: "100%",
//               fontSize: "0.9rem",
//               borderCollapse: "collapse",
//             }}
//           >
//             <thead>
//               <tr>
//                 <th>Size</th>
//                 <th>Bust</th>
//                 <th>Waist</th>
//                 <th>Outseam</th>
//                 <th>Inseam</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 {
//                   size: "XS",
//                   bust: "32.0",
//                   waist: "24.0",
//                   outseam: "37.5",
//                   inseam: "26.5",
//                 },
//                 {
//                   size: "S",
//                   bust: "34.0",
//                   waist: "26.0",
//                   outseam: "38.0",
//                   inseam: "27.0",
//                 },
//                 {
//                   size: "M",
//                   bust: "36.0",
//                   waist: "28.0",
//                   outseam: "38.0",
//                   inseam: "27.0",
//                 },
//                 {
//                   size: "L",
//                   bust: "38.0",
//                   waist: "30.0",
//                   outseam: "38.5",
//                   inseam: "27.5",
//                 },
//                 {
//                   size: "XL",
//                   bust: "40.0",
//                   waist: "32.0",
//                   outseam: "38.5",
//                   inseam: "27.5",
//                 },
//                 {
//                   size: "XXL",
//                   bust: "42.0",
//                   waist: "34.0",
//                   outseam: "39.0",
//                   inseam: "28.0",
//                 },
//                 {
//                   size: "3XL",
//                   bust: "44.0",
//                   waist: "36.0",
//                   outseam: "39.0",
//                   inseam: "28.0",
//                 },
//               ].map((row, i) => (
//                 <tr key={i}>
//                   <td>{row.size}</td>
//                   <td>{row.bust}</td>
//                   <td>{row.waist}</td>
//                   <td>{row.outseam}</td>
//                   <td>{row.inseam}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           <div style={{ marginTop: "1.5rem" }}>
//             <img
//               src="https://assets.myntassets.com/assets/images/sizechart/2016/10/28/11477640000694-Body_Measurements_size-chart_Image.png"
//               alt="How to Measure"
//               style={{ maxWidth: "100%" }}
//             />
//             <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
//               Refer the chart to match your body measurements.
//             </p>
//           </div>
//         </div>
//       </Drawer>
//     </div>
//   );
// }

// import { useState, useEffect } from "react";
// import { RadioGroup } from "@headlessui/react";
// import { useNavigate, useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Divider, CircularProgress, IconButton } from "@mui/material";
// import { findProductById } from "../../../../Redux/Customers/Product/Action";
// import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
// import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
// import DetailsBox from "./DetailsBox";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AuthModal from "../../Auth/AuthModal";
// import { addItemToWishList } from "../../../../Redux/Customers/WishList/Action";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
// import Drawer from "@mui/material/Drawer";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import MagnifierImage from "./MagnifierImage";

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// export default function ProductDetails() {
//   const [selectedSize, setSelectedSize] = useState();
//   const [activeImage, setActiveImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [currentImages, setCurrentImages] = useState([]);
//   const [isAddingToCart, setIsAddingToCart] = useState(false);
//   const [quantity, setQuantity] = useState(1);
//   const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
//   const [currentSlide, setCurrentSlide] = useState(0);

//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { customersProduct } = useSelector((store) => store);
//   const { productId } = useParams();
//   const jwt = localStorage.getItem("jwt");

//   const handleClose = () => setOpenAuthModal(false);

//   const addToLocalStorage = (key, product, selectedSize, quantity) => {
//     if (!product?._id) {
//       toast.error("Invalid Product");
//       return;
//     }

//     let existingItems = JSON.parse(localStorage.getItem(key)) || [];

//     const alreadyAddedIndex = existingItems.findIndex(
//       (item) => item._id === product._id && item.size === selectedSize
//     );

//     if (alreadyAddedIndex !== -1) {
//       existingItems[alreadyAddedIndex].quantity += quantity;
//     } else {
//       const defaultVariant = product.colorVariants?.[0] || {};
//       const images = defaultVariant.images || [];
//       const frontImage =
//         images.find((img) => img.label === "front")?.url ||
//         product.imageUrl ||
//         "https://via.placeholder.com/150";

//       existingItems.push({
//         _id: product._id,
//         title: product.title,
//         discountedPrice: product.discountedPrice,
//         price: product.price,
//         brand: product.brand,
//         discountPersent: product.discountPersent,
//         colorVariants: product.colorVariants,
//         imageUrl: frontImage,
//         size: selectedSize || "ONE_SIZE",
//         quantity,
//       });
//     }

//     localStorage.setItem(key, JSON.stringify(existingItems));
//   };

//   const handleSetActiveImage = (image) => {
//     setActiveImage(image);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!productId || !customersProduct.product) {
//       toast.error("Product not found");
//       return;
//     }

//     if (!selectedSize && customersProduct.product?.sizes?.length > 0) {
//       toast.error("Please select a size");
//       return;
//     }

//     setIsAddingToCart(true);

//     const data = {
//       productId,
//       size: selectedSize || "ONE_SIZE",
//       quantity: quantity || 1,
//     };
//     console.log(jwt, "jwt")
//     if (jwt) {
//       try {
//         await dispatch(addItemToCart({ data, jwt }));
//         toast.success("Item added to cart!");
//       } catch (error) {
//         toast.error("Failed to add to cart");
//         console.error("Add to cart error:", error);
//       } finally {
//         setIsAddingToCart(false);
//       }
//     } else {
//       // try {
//       //   addToLocalStorage(
//       //     "guestCart",
//       //     customersProduct.product,
//       //     selectedSize,
//       //     quantity
//       //   );
//       //   toast.success("Item added to cart!");
//       // } catch (error) {
//       //   toast.error("Failed to add to cart");
//       //   console.error("Guest cart add error:", error);
//       // } finally {
//       //   setIsAddingToCart(false);
//       // }
//       console.log("Navigation to login")
//     }
//   };

//   const toggleSizeChart = (open) => () => setIsSizeChartOpen(open);

//   const handleAddToWishlist = () => {
//     addToLocalStorage(
//       "wishlist",
//       customersProduct.product,
//       selectedSize,
//       quantity
//     );
//     toast.success("Added to Wishlist!");
//   };

//   // Set default color on product load
//   useEffect(() => {
//     const defaultColorVariant =
//       customersProduct.product?.colorVariants?.[0] || null;
//     setSelectedColor(defaultColorVariant);
//   }, [customersProduct.product]);

//   useEffect(() => {
//     if (selectedColor) {
//       setCurrentImages(selectedColor.images || []);
//       setActiveImage(selectedColor.images?.[0] || null);
//     }
//   }, [selectedColor]);

//   useEffect(() => {
//     const data = { productId, jwt };
//     setLoading(true);
//     Promise.all([
//       dispatch(findProductById(data)),
//       dispatch(getAllReviews(productId)),
//     ]).finally(() => setLoading(false));
//   }, [productId]);

//   // Keen-slider setup
//   const [sliderRef, instanceRef] = useKeenSlider(
//     currentImages.length > 0
//       ? {
//         loop: true,
//         mode: "snap",
//         slides: { perView: 1, spacing: 10 },
//         breakpoints: {
//           "(min-width: 768px)": { slides: { perView: 1, spacing: 15 } },
//           "(min-width: 1024px)": { slides: { perView: 1, spacing: 20 } },
//         },
//         slideChanged(slider) {
//           setCurrentSlide(slider.track.details.rel);
//         },
//       }
//       : null
//   );

//   useEffect(() => {
//     if (instanceRef.current && currentImages.length > 0) {
//       instanceRef.current.update();
//       setCurrentSlide(0);
//     }
//   }, [currentImages]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <CircularProgress />
//       </div>
//     );
//   }

//   return (
//     <div className="bg-white lg:px-20">
//       <div className="pt-6">
//         <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
//           {/* Left Image Column */}
//           <div className="product-main-image-column flex sm:gap-4">
//             {/* Thumbnails */}
//             <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-y-auto">
//               {currentImages.map((img, index) => (
//                 <img
//                   key={index}
//                   src={img.url}
//                   alt={img.label}
//                   className={`w-16 h-16 object-contain rounded cursor-pointer border ${index === currentSlide ? "border-black" : "border-gray-300"
//                     }`}
//                   onClick={() => instanceRef.current?.moveToIdx(index)}
//                 />
//               ))}
//             </div>

//             {/* Main Image Slider */}
//             <div className="relative w-full lg:max-w-[500px]">
//               {currentImages.length > 0 && (
//                 <div ref={sliderRef} className="keen-slider">
//                   {currentImages.map((img, index) => (
//                     <div
//                       key={index}
//                       className="keen-slider__slide flex justify-center"
//                     >
//                       <MagnifierImage
//                         src={img.url}
//                         width="100%"
//                         height="auto"
//                         zoomLevel={2.5}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {currentImages.length > 1 && instanceRef.current && (
//                 <>
//                   <button
//                     type="button"
//                     onClick={() => instanceRef.current.prev()}
//                     className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
//                   >
//                     &#10094;
//                   </button>
//                   <button
//                     type="button"
//                     onClick={() => instanceRef.current.next()}
//                     className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
//                   >
//                     &#10095;
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Right Content */}
//           <div className="w-full max-w-full px-0 sm:px-4 pb-10 lg:col-span-1 mx-auto lg:max-w-7xl lg:px-8 lg:pb-24">
//             <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 font-semibold">
//               {customersProduct.product?.title}
//             </h1>
//             <h5 className="text-lg lg:text-xl tracking-tight text-gray-500">
//               {customersProduct.product?.brand}
//             </h5>

//             {/* Price */}
//             <div className="mt-4 border-b pb-4">
//               <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-2">
//                 <p className="font-semibold">
//                   ₹{customersProduct.product?.discountedPrice}
//                 </p>
//                 <p className="opacity-50 line-through">
//                   ₹{customersProduct.product?.price}
//                 </p>
//                 <p className="text-green-600 font-semibold">
//                   {customersProduct.product?.discountPersent}% Off
//                 </p>
//               </div>
//             </div>

//             {/* Size Selection */}
//             <div className="mt-10">
//               <h3 className="text-sm font-bold text-gray-900">Size</h3>
//               <button
//                 onClick={toggleSizeChart(true)}
//                 className="border border-gray-300 text-gray-900 font-medium py-2 px-6 mt-3 rounded-md hover:bg-gray-100"
//               >
//                 Size Chart
//               </button>
//               <div className="space-y-2 mt-3">
//                 {customersProduct.product?.sizes?.length > 0 ? (
//                   <div className="grid grid-cols-4 gap-3">
//                     {customersProduct.product.sizes.map((size) => {
//                       const isSelected = selectedSize === size;
//                       return (
//                         <button
//                           key={size}
//                           onClick={() => setSelectedSize(size)}
//                           className={`border rounded-md py-2 text-sm font-medium 
//                 ${isSelected ? "bg-black text-white" : "bg-white text-gray-900"} 
//                 hover:border-black`}
//                           style={{ minWidth: "3rem" }}
//                         >
//                           {size}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 ) : (
//                   <p className="text-sm text-gray-500 mt-2">One Size</p>
//                 )}
//               </div>
//             </div>

//             {/* Color Selection */}
//             {customersProduct.product?.colorVariants?.length > 1 && (
//               <div className="mt-6">
//                 <h3 className="text-sm font-bold text-gray-900 mb-2">Color</h3>
//                 <div className="flex gap-2">
//                   {customersProduct.product.colorVariants.map((variant, i) => (
//                     <button
//                       key={i}
//                       type="button"
//                       onClick={() => setSelectedColor(variant)}
//                       className={`px-4 py-2 rounded-md border ${selectedColor?.color === variant.color
//                         ? "border-black font-bold"
//                         : "border-gray-300"
//                         }`}
//                     >
//                       {variant.color}
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Quantity & Cart */}
//             <form className="mt-6" onSubmit={handleSubmit}>
//               <div className="quantity mt-7 flex items-center space-x-3">
//                 <IconButton
//                   onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
//                   disabled={quantity <= 1}
//                   style={{ color: "#551F3D" }}
//                 >
//                   <RemoveCircleOutlineIcon />
//                 </IconButton>

//                 <span className="py-1 px-7 border rounded-sm">{quantity}</span>

//                 <IconButton
//                   onClick={() => setQuantity((prev) => prev + 1)}
//                   disabled={quantity >= 10}
//                   style={{ color: "#551F3D" }}
//                 >
//                   <AddCircleOutlineIcon />
//                 </IconButton>
//               </div>

//               {customersProduct.product?.quantity > 0 ? (
//                 <button
//                   type="submit"
//                   disabled={isAddingToCart}
//                   className={`bg-brand text-white font-medium py-2 px-6 mt-6 rounded-md hover:bg-black ${isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
//                     }`}
//                 >
//                   {isAddingToCart ? (
//                     <CircularProgress size={20} color="inherit" />
//                   ) : (
//                     "Add To Cart"
//                   )}
//                 </button>
//               ) : (
//                 <button
//                   type="button"
//                   disabled
//                   className="bg-gray-400 text-white font-medium py-2 px-6 mt-6 rounded-md cursor-not-allowed"
//                 >
//                   Out of Stock
//                 </button>
//               )}

//               <button
//                 type="button"
//                 onClick={handleAddToWishlist}
//                 style={{ marginLeft: "10px" }}
//                 className="border border-gray-300 text-gray-900 font-medium py-2 px-6 mt-3 rounded-md hover:bg-gray-100"
//               >
//                 Add to Wishlist
//               </button>
//             </form>

//             {/* FAQs & Description */}
//             <div className="py-10 border-t">
//               {customersProduct.product?.faq?.length > 0
//                 ? customersProduct.product.faq.map((item, index) => (
//                   <DetailsBox
//                     key={index}
//                     title={item.question}
//                     content={item.answer}
//                   />
//                 ))
//                 : <p className="text-gray-500">No FAQs available.</p>}
//               <DetailsBox
//                 title="ABOUT THIS PRODUCT"
//                 content={customersProduct.product?.description || "No description available."}
//               />
//               <DetailsBox title="MATERIAL" content="100% Soft Cotton" />
//             </div>
//           </div>
//         </section>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//       <AuthModal handleClose={handleClose} open={openAuthModal} />

//       {/* Size Chart Drawer */}
//       <Drawer
//         anchor="right"
//         open={isSizeChartOpen}
//         onClose={toggleSizeChart(false)}
//       >
//         <div style={{ width: 320, padding: "1rem" }}>
//           <h2 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Size Chart</h2>
//           <p style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>
//             *Garment Measurements in Inches
//           </p>
//           {/* Table */}
//           <table
//             style={{
//               width: "100%",
//               fontSize: "0.9rem",
//               borderCollapse: "collapse",
//             }}
//           >
//             <thead>
//               <tr>
//                 <th>Size</th>
//                 <th>Bust</th>
//                 <th>Waist</th>
//                 <th>Outseam</th>
//                 <th>Inseam</th>
//               </tr>
//             </thead>
//             <tbody>
//               {[
//                 { size: "XS", bust: "32.0", waist: "24.0", outseam: "37.5", inseam: "26.5" },
//                 { size: "S", bust: "34.0", waist: "26.0", outseam: "38.0", inseam: "27.0" },
//                 { size: "M", bust: "36.0", waist: "28.0", outseam: "38.0", inseam: "27.0" },
//                 { size: "L", bust: "38.0", waist: "30.0", outseam: "38.5", inseam: "27.5" },
//                 { size: "XL", bust: "40.0", waist: "32.0", outseam: "38.5", inseam: "27.5" },
//                 { size: "XXL", bust: "42.0", waist: "34.0", outseam: "39.0", inseam: "28.0" },
//                 { size: "3XL", bust: "44.0", waist: "36.0", outseam: "39.0", inseam: "28.0" },
//               ].map((row, i) => (
//                 <tr key={i}>
//                   <td>{row.size}</td>
//                   <td>{row.bust}</td>
//                   <td>{row.waist}</td>
//                   <td>{row.outseam}</td>
//                   <td>{row.inseam}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//           <div style={{ marginTop: "1.5rem" }}>
//             <img
//               src="https://assets.myntassets.com/assets/images/sizechart/2016/10/28/11477640000694-Body_Measurements_size-chart_Image.png"
//               alt="How to Measure"
//               style={{ maxWidth: "100%" }}
//             />
//             <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
//               Refer the chart to match your body measurements.
//             </p>
//           </div>
//         </div>
//       </Drawer>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { RadioGroup } from "@headlessui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Divider, CircularProgress, IconButton } from "@mui/material";
import { findProductById } from "../../../../Redux/Customers/Product/Action";
import { addItemToCart } from "../../../../Redux/Customers/Cart/Action";
import { getAllReviews } from "../../../../Redux/Customers/Review/Action";
import DetailsBox from "./DetailsBox";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthModal from "../../Auth/AuthModal";
import { addItemToWishList } from "../../../../Redux/Customers/WishList/Action";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Drawer from "@mui/material/Drawer";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import MagnifierImage from "./MagnifierImage";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState();
  const [activeImage, setActiveImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [currentImages, setCurrentImages] = useState([]);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isSizeChartOpen, setIsSizeChartOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");

  const handleClose = () => setOpenAuthModal(false);

  const addToLocalStorage = (key, product, selectedSize, quantity) => {
    if (!product?._id) {
      toast.error("Invalid Product");
      return;
    }

    let existingItems = JSON.parse(localStorage.getItem(key)) || [];

    const alreadyAddedIndex = existingItems.findIndex(
      (item) => item._id === product._id && item.size === selectedSize
    );

    if (alreadyAddedIndex !== -1) {
      existingItems[alreadyAddedIndex].quantity += quantity;
    } else {
      const defaultVariant = product.colorVariants?.[0] || {};
      const images = defaultVariant.images || [];
      const frontImage =
        images.find((img) => img.label === "front")?.url ||
        product.imageUrl ||
        "https://via.placeholder.com/150";

      existingItems.push({
        _id: product._id,
        title: product.title,
        discountedPrice: product.discountedPrice,
        price: product.price,
        brand: product.brand,
        discountPersent: product.discountPersent,
        colorVariants: product.colorVariants,
        imageUrl: frontImage,
        size: selectedSize || "ONE_SIZE",
        quantity,
      });
    }

    localStorage.setItem(key, JSON.stringify(existingItems));
  };

  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !customersProduct.product) {
      toast.error("Product not found");
      return;
    }

    if (!selectedSize && customersProduct.product?.sizes?.length > 0) {
      toast.error("Please select a size");
      return;
    }

    setIsAddingToCart(true);

    const data = {
      productId,
      size: selectedSize || "ONE_SIZE",
      quantity: quantity || 1,
    };

    console.log(jwt, "jwt");

    if (jwt) {
      try {
        await dispatch(addItemToCart({ data, jwt }));
        toast.success("Item added to cart!");
      } catch (error) {
        toast.error("Failed to add to cart");
        console.error("Add to cart error:", error);
      } finally {
        setIsAddingToCart(false);
      }
    } else {
      setIsAddingToCart(false);
      setOpenAuthModal(true); // ✅ Login modal open for guest users
    }
  };

  const toggleSizeChart = (open) => () => setIsSizeChartOpen(open);

  const handleAddToWishlist = () => {
    addToLocalStorage(
      "wishlist",
      customersProduct.product,
      selectedSize,
      quantity
    );
    toast.success("Added to Wishlist!");
  };

  useEffect(() => {
    const defaultColorVariant =
      customersProduct.product?.colorVariants?.[0] || null;
    setSelectedColor(defaultColorVariant);
  }, [customersProduct.product]);

  useEffect(() => {
    if (selectedColor) {
      setCurrentImages(selectedColor.images || []);
      setActiveImage(selectedColor.images?.[0] || null);
    }
  }, [selectedColor]);

  useEffect(() => {
    const data = { productId, jwt };
    setLoading(true);
    Promise.all([
      dispatch(findProductById(data)),
      dispatch(getAllReviews(productId)),
    ]).finally(() => setLoading(false));
  }, [productId]);

  const [sliderRef, instanceRef] = useKeenSlider(
    currentImages.length > 0
      ? {
        loop: true,
        mode: "snap",
        slides: { perView: 1, spacing: 10 },
        breakpoints: {
          "(min-width: 768px)": { slides: { perView: 1, spacing: 15 } },
          "(min-width: 1024px)": { slides: { perView: 1, spacing: 20 } },
        },
        slideChanged(slider) {
          setCurrentSlide(slider.track.details.rel);
        },
      }
      : null
  );

  useEffect(() => {
    if (instanceRef.current && currentImages.length > 0) {
      instanceRef.current.update();
      setCurrentSlide(0);
    }
  }, [currentImages]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="bg-white lg:px-20">
      <div className="pt-6">
        <section className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2 px-4 pt-10">
          {/* Left Image Column */}
          <div className="product-main-image-column flex sm:gap-4">
            <div className="flex gap-2 overflow-x-auto lg:flex-col lg:overflow-y-auto">
              {currentImages.map((img, index) => (
                <img
                  key={index}
                  src={img.url}
                  alt={img.label}
                  className={`w-16 h-16 object-contain rounded cursor-pointer border ${index === currentSlide ? "border-black" : "border-gray-300"
                    }`}
                  onClick={() => instanceRef.current?.moveToIdx(index)}
                />
              ))}
            </div>

            <div className="relative w-full lg:max-w-[500px]">
              {currentImages.length > 0 && (
                <div ref={sliderRef} className="keen-slider">
                  {currentImages.map((img, index) => (
                    <div
                      key={index}
                      className="keen-slider__slide flex justify-center"
                    >
                      <MagnifierImage
                        src={img.url}
                        width="100%"
                        height="auto"
                        zoomLevel={2.5}
                      />
                    </div>
                  ))}
                </div>
              )}

              {currentImages.length > 1 && instanceRef.current && (
                <>
                  <button
                    type="button"
                    onClick={() => instanceRef.current.prev()}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
                  >
                    &#10094;
                  </button>
                  <button
                    type="button"
                    onClick={() => instanceRef.current.next()}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
                  >
                    &#10095;
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full max-w-full px-0 sm:px-4 pb-10 lg:col-span-1 mx-auto lg:max-w-7xl lg:px-8 lg:pb-24">
            <h1 className="text-lg lg:text-xl tracking-tight text-gray-900 font-semibold">
              {customersProduct.product?.title}
            </h1>
            <h5 className="text-lg lg:text-xl tracking-tight text-gray-500">
              {customersProduct.product?.brand}
            </h5>

            <div className="mt-4 border-b pb-4">
              <div className="flex space-x-5 items-center text-lg lg:text-xl tracking-tight text-gray-900 mt-2">
                <p className="font-semibold">
                  ₹{customersProduct.product?.discountedPrice}
                </p>
                <p className="opacity-50 line-through">
                  ₹{customersProduct.product?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {customersProduct.product?.discountPersent}% Off
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-bold text-gray-900">Size</h3>
              <button
                onClick={toggleSizeChart(true)}
                className="border border-gray-300 text-gray-900 font-medium py-2 px-6 mt-3 rounded-md hover:bg-gray-100"
              >
                Size Chart
              </button>
              <div className="space-y-2 mt-3">
                {customersProduct.product?.sizes?.length > 0 ? (
                  <div className="grid grid-cols-4 gap-3">
                    {customersProduct.product.sizes.map((size) => {
                      const isSelected = selectedSize === size;
                      return (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`border rounded-md py-2 text-sm font-medium 
                ${isSelected ? "bg-black text-white" : "bg-white text-gray-900"} 
                hover:border-black`}
                          style={{ minWidth: "3rem" }}
                        >
                          {size}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 mt-2">One Size</p>
                )}
              </div>
            </div>

            {customersProduct.product?.colorVariants?.length > 1 && (
              <div className="mt-6">
                <h3 className="text-sm font-bold text-gray-900 mb-2">Color</h3>
                <div className="flex gap-2">
                  {customersProduct.product.colorVariants.map((variant, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setSelectedColor(variant)}
                      className={`px-4 py-2 rounded-md border ${selectedColor?.color === variant.color
                        ? "border-black font-bold"
                        : "border-gray-300"
                        }`}
                    >
                      {variant.color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <form className="mt-6" onSubmit={handleSubmit}>
              <div className="quantity mt-7 flex items-center space-x-3">
                <IconButton
                  onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  disabled={quantity <= 1}
                  style={{ color: "#551F3D" }}
                >
                  <RemoveCircleOutlineIcon />
                </IconButton>

                <span className="py-1 px-7 border rounded-sm">{quantity}</span>

                <IconButton
                  onClick={() => setQuantity((prev) => prev + 1)}
                  disabled={quantity >= 10}
                  style={{ color: "#551F3D" }}
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>

              {customersProduct.product?.quantity > 0 ? (
                <button
                  type="submit"
                  disabled={isAddingToCart}
                  className={`bg-brand text-white font-medium py-2 px-6 mt-6 rounded-md hover:bg-black ${isAddingToCart ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {isAddingToCart ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    "Add To Cart"
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  className="bg-gray-400 text-white font-medium py-2 px-6 mt-6 rounded-md cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}

              <button
                type="button"
                onClick={handleAddToWishlist}
                style={{ marginLeft: "10px" }}
                className="border border-gray-300 text-gray-900 font-medium py-2 px-6 mt-3 rounded-md hover:bg-gray-100"
              >
                Add to Wishlist
              </button>
            </form>

            <div className="py-10 border-t">
              {customersProduct.product?.faq?.length > 0
                ? customersProduct.product.faq.map((item, index) => (
                  <DetailsBox
                    key={index}
                    title={item.question}
                    content={item.answer}
                  />
                ))
                : <p className="text-gray-500">No FAQs available.</p>}
              <DetailsBox
                title="ABOUT THIS PRODUCT"
                content={customersProduct.product?.description || "No description available."}
              />
              <DetailsBox title="MATERIAL" content="100% Soft Cotton" />
            </div>
          </div>
        </section>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
      <AuthModal handleClose={handleClose} open={openAuthModal} />

      <Drawer
        anchor="right"
        open={isSizeChartOpen}
        onClose={toggleSizeChart(false)}
      >
        <div style={{ width: 320, padding: "1rem" }}>
          <h2 style={{ fontWeight: "bold", fontSize: "1.25rem" }}>Size Chart</h2>
          <p style={{ fontSize: "0.875rem", marginBottom: "1rem" }}>
            *Garment Measurements in Inches
          </p>
          <table
            style={{
              width: "100%",
              fontSize: "0.9rem",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr>
                <th>Size</th>
                <th>Bust</th>
                <th>Waist</th>
                <th>Outseam</th>
                <th>Inseam</th>
              </tr>
            </thead>
            <tbody>
              {[
                { size: "XS", bust: "32.0", waist: "24.0", outseam: "37.5", inseam: "26.5" },
                { size: "S", bust: "34.0", waist: "26.0", outseam: "38.0", inseam: "27.0" },
                { size: "M", bust: "36.0", waist: "28.0", outseam: "38.0", inseam: "27.0" },
                { size: "L", bust: "38.0", waist: "30.0", outseam: "38.5", inseam: "27.5" },
                { size: "XL", bust: "40.0", waist: "32.0", outseam: "38.5", inseam: "27.5" },
                { size: "XXL", bust: "42.0", waist: "34.0", outseam: "39.0", inseam: "28.0" },
                { size: "3XL", bust: "44.0", waist: "36.0", outseam: "39.0", inseam: "28.0" },
              ].map((row, i) => (
                <tr key={i}>
                  <td>{row.size}</td>
                  <td>{row.bust}</td>
                  <td>{row.waist}</td>
                  <td>{row.outseam}</td>
                  <td>{row.inseam}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: "1.5rem" }}>
            <img
              src="https://assets.myntassets.com/assets/images/sizechart/2016/10/28/11477640000694-Body_Measurements_size-chart_Image.png"
              alt="How to Measure"
              style={{ maxWidth: "100%" }}
            />
            <p style={{ fontSize: "0.8rem", marginTop: "0.5rem" }}>
              Refer the chart to match your body measurements.
            </p>
          </div>
        </div>
      </Drawer>
    </div>
  );
}
