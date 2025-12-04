// import React, { useEffect, useState } from "react";
// import "./ProductCard.css";
// import { useNavigate } from "react-router-dom";
// import { Heart } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";

// const ProductCard = ({ product }) => {
//   const navigate = useNavigate();
//   const [isInWishlist, setIsInWishlist] = useState(false);

//   const { title, brand, discountedPrice, rating = 5, reviewCount = 0, price, colorVariants = [], discountPersent } = product;

//   const defaultVariant = colorVariants[0] || {};
//   const color = defaultVariant.color || "N/A";
//   const images = defaultVariant.images || [];

//   // Get front image (first image with label "front" or first image)
//   const frontImage = images.find((img) => img.label === "front")?.url || images[0]?.url;

//   // Get back image (second image in the array or image with label "back")
//   const backImage = images[1]?.url || images.find((img) => img.label === "back")?.url;

//   const fallbackImage = "https://via.placeholder.com/300x400?text=No+Image";

//   const originalPrice = price || 4300;

//   useEffect(() => {
//     const existingItems = JSON.parse(localStorage.getItem("wishlist")) || [];
//     const alreadyAdded = existingItems.some((item) => item._id === product._id);
//     setIsInWishlist(alreadyAdded);
//   }, [product._id]);

//   const handleNavigate = () => {
//     navigate(`/product/${product?._id}`);
//   };

//   const addToLocalStorage = (key, product) => {
//     if (!product?._id) {
//       toast.error("Invalid Product");
//       return;
//     }

//     let existingItems = JSON.parse(localStorage.getItem(key)) || [];
//     const alreadyAdded = existingItems.some((item) => item._id === product._id);

//     if (!alreadyAdded) {
//       existingItems.push({
//         _id: product._id,
//         title: product.title,
//         discountedPrice: product.discountedPrice,
//         colorVariants: product.colorVariants,
//         price: product.price,
//         brand: product.brand,
//         discountPersent: product.discountPersent,
//       });
//       localStorage.setItem(key, JSON.stringify(existingItems));
//       setIsInWishlist(true);
//     } else {
//       existingItems = existingItems.filter((item) => item._id !== product._id);
//       localStorage.setItem(key, JSON.stringify(existingItems));
//       setIsInWishlist(false);
//     }
//   };

//   return (
//     <div
//       onClick={handleNavigate}
//       className="productCard transition-all cursor-pointer"
//       style={{ borderRadius: "20px" }}
//     >
//       <div className="image-hover-container">
//         <img
//           className="main-image"
//           src={frontImage || fallbackImage}
//           alt={title}
//         />
//         {backImage && (
//           <img className="hover-image" src={backImage} alt={`${title} back view`} />
//         )}
//         <div className="custom_labels_new">Ready to Ship</div>
//       </div>

//       <div className="textPart bg-white p-3">
//         <p className="opacity-60">{brand}</p>
//         <p className="font-semibold block md:hidden">
//           {title.split(" ").slice(0, 3).join(" ")}
//           {title.split(" ").length > 3 ? "..." : ""}
//         </p>
//         <p className="font-semibold hidden md:block">{title}</p>
//         <p className="font-semibold opacity-50">{color}</p>

//         <div className="flex space-x-2 items-center">
//           <p className="font-semibold">₹{discountedPrice}</p>
//           <p className="opacity-50 line-through">₹{originalPrice}</p>
//           <span
//             style={{
//               background: "#551F3D",
//               color: "#fff",
//               padding: "0px 8px",
//               borderRadius: "4px",
//             }}
//             className="percentage_show"
//           >
//             {discountPersent}% OFF
//           </span>
//         </div>

//         <div className="flex justify-between mt-2">
//           <Heart
//             fill={isInWishlist ? "red" : "none"}
//             color={isInWishlist ? "red" : "black"}
//             strokeWidth={1.5}
//             onClick={(e) => {
//               e.stopPropagation();
//               addToLocalStorage("wishlist", product);
//             }}
//           />
//           <div className="flex flex-wrap items-center gap-1 sm:gap-2">
//             <div className="flex">
//               {[...Array(5)].map((_, i) => (
//                 <svg
//                   key={i}
//                   className={`w-4 h-4 ${i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                 >
//                   <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//                 </svg>
//               ))}
//             </div>
//             <span className="ml-2 text-gray-600 text-xs sm:text-sm reviewtext">
//               {reviewCount} reviews
//             </span>
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default ProductCard;



import React, { useEffect, useState } from "react";
import "./ProductCard.css";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { Dialog, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LoginUserForm from "../../Auth/Login"; // adjust path as needed

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [pendingWishlist, setPendingWishlist] = useState(false);

  const {
    title,
    brand,
    discountedPrice,
    rating = 5,
    reviewCount = 0,
    price,
    colorVariants = [],
    discountPersent,
  } = product;

  // colorVariants is an array, so pick first one
  const defaultVariant = colorVariants[0] || {};

  // Always use array for images
  const color = defaultVariant.color || "N/A";
  const images = defaultVariant.images || [];
  const fallbackImage = "https://via.placeholder.com/300x400?text=No+Image";

  // Get frontImage (first image with label "front" or first image)
  const frontImage =
    images.find((img) => img.label === "front")?.url ||
    images[0]?.url ||
    fallbackImage;

  // Try to get "back" image second, or just use next image, but prefer label
  const backImage =
    images.find((img) => img.label === "back")?.url ||
    (images.length > 1 ? images[1].url : null);

  const originalPrice = price || 4300;

  useEffect(() => {
    const existingItems = JSON.parse(localStorage.getItem("wishlist")) || [];
    const alreadyAdded = existingItems.some(
      (item) => item._id === product._id
    );
    setIsInWishlist(alreadyAdded);
  }, [product._id]);

  useEffect(() => {
    if (auth?.user && pendingWishlist) {
      addToLocalStorage("wishlist", product);
      setPendingWishlist(false);
      setShowLoginModal(false);
    }
  }, [auth?.user, pendingWishlist]); // eslint-disable-line

  const handleNavigate = () => {
    navigate(`/product/${product?._id}`);
  };

  /**
  const addToLocalStorage = (key, product) => {
    if (!product?._id) {
      toast.error("Invalid Product");
      return;
    }
    let existingItems = JSON.parse(localStorage.getItem(key)) || [];
    const alreadyAdded = existingItems.some(
      (item) => item._id === product._id
    );
    if (!alreadyAdded) {
      existingItems.push({
        _id: product._id,
        title: product.title,
        discountedPrice: product.discountedPrice,
        colorVariants: product.colorVariants,
        price: product.price,
        brand: product.brand,
        discountPersent: product.discountPersent,
      });
      localStorage.setItem(key, JSON.stringify(existingItems));
      setIsInWishlist(true);
      toast.success("Added to wishlist");
    } else {
      existingItems = existingItems.filter(
        (item) => item._id !== product._id
      );
      localStorage.setItem(key, JSON.stringify(existingItems));
      setIsInWishlist(false);
      toast.info("Removed from wishlist");
    }
  };
  */

  const addToLocalStorage = (key, product) => {
    if (!product?._id) {
      toast.error("Invalid Product");
      return;
    }
    let existingItems = JSON.parse(localStorage.getItem(key)) || [];
    const alreadyAdded = existingItems.some((item) => item._id === product._id);

    if (!alreadyAdded) {
      existingItems.push({
        _id: product._id,
        title: product.title,
        discountedPrice: product.discountedPrice,
        colorVariants: product.colorVariants,
        price: product.price,
        brand: product.brand,
        discountPersent: product.discountPersent,
      });
      localStorage.setItem(key, JSON.stringify(existingItems));
      setIsInWishlist(true);
      // toast.success("Added to wishlist");
    } else {
      existingItems = existingItems.filter((item) => item._id !== product._id);
      localStorage.setItem(key, JSON.stringify(existingItems));
      setIsInWishlist(false);
      // toast.info("Removed from wishlist");
    }

    // DISPATCH WISHLIST UPDATE EVENT
    window.dispatchEvent(
      new CustomEvent("wishlistUpdated", {
        detail: existingItems.length,
      })
    );
  };


  return (
    <>
      <div
        onClick={handleNavigate}
        className="productCard transition-all cursor-pointer"
        style={{ borderRadius: "20px" }}
      >
        <div className="image-hover-container">
          <img
            className="main-image"
            src={frontImage || fallbackImage}
            alt={`${title} front`}
          />
          {backImage && (
            <img
              className="hover-image"
              src={backImage}
              alt={`${title} back`}
            />
          )}
          {/* Optionally: show all extra images in a mini gallery */}
          {/* {images.length > 2 && (
            <div className="mini-gallery">
              {images.slice(2).map((img) => (
                <img
                  key={img._id}
                  src={img.url}
                  alt={`${title} ${img.label}`}
                  className="extra-image"
                />
              ))}
            </div>
          )} */}
          <div className="custom_labels_new">Ready to Ship</div>
        </div>
        <div className="textPart bg-white p-3">
          <p className="opacity-60">{brand}</p>
          <p className="font-semibold block md:hidden">
            {title.split(" ").slice(0, 3).join(" ")}
            {title.split(" ").length > 3 ? "..." : ""}
          </p>
          <p className="font-semibold hidden md:block truncate max-w-[200px]">{title}</p>
          {color && color !== "any" && (
            <p className="font-semibold opacity-50">{color}</p>
          )}
          <div className="flex space-x-2 items-center">
            <p className="font-semibold">₹{discountedPrice}</p>
            <p className="opacity-50 line-through">₹{originalPrice}</p>
            <span
              style={{
                background: "#551F3D",
                color: "#fff",
                padding: "0px 8px",
                borderRadius: "4px",
              }}
              className="percentage_show"
            >
              {discountPersent}% OFF
            </span>
          </div>
          <div className="flex justify-between mt-2">
            <Heart
              fill={isInWishlist ? "red" : "none"}
              color={isInWishlist ? "red" : "black"}
              strokeWidth={1.5}
              onClick={(e) => {
                e.stopPropagation();
                if (!auth?.user) {
                  setShowLoginModal(true);
                  setPendingWishlist(true);
                  return;
                }
                addToLocalStorage("wishlist", product);
              }}
            />
            <div className="flex flex-wrap items-center gap-1 sm:gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                      }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-2 text-gray-600 text-xs sm:text-sm reviewtext">
                {reviewCount} reviews
              </span>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
      {/* Login Modal */}
      <Dialog
        open={showLoginModal}
        onClose={() => {
          setShowLoginModal(false);
          setPendingWishlist(false);
        }}
        fullWidth
        maxWidth="sm"
      >
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <IconButton
            onClick={() => {
              setShowLoginModal(false);
              setPendingWishlist(false);
            }}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent>
          <LoginUserForm
            disableAutoReload
            onSuccess={() => {
              addToLocalStorage("wishlist", product);
              setShowLoginModal(false);
              setPendingWishlist(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductCard;
