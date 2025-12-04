// import React, { useState, useEffect } from "react";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import ProductCard from "../customer/Components/Product/ProductCard/ProductCard";
// import headingImage from "./assets/headings-style.png";
// import { Container } from "@mui/material";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { API_BASE_URL } from "../config/api";

// export default function ProductCarousel() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [sliderLoaded, setSliderLoaded] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         // Fetch all products
//         const res = await fetch(`${API_BASE_URL}/api/products?pageNumber=1&pageSize=500`);
//         const data = await res.json();

//         if (Array.isArray(data.content)) {
//           // Shuffle the products randomly
//           const shuffled = data.content.sort(() => 0.5 - Math.random());

//           // Pick first 10-15 products for carousel
//           const selectedProducts = shuffled.slice(0, 15);

//           setProducts(selectedProducts);
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   const [sliderRef, instanceRef] = useKeenSlider({
//     loop: true,
//     slides: {
//       perView: 2,
//       spacing: 10,
//     },
//     breakpoints: {
//       "(min-width: 640px)": {
//         slides: { perView: 2, spacing: 15 },
//       },
//       "(min-width: 768px)": {
//         slides: { perView: 3, spacing: 15 },
//       },
//       "(min-width: 1024px)": {
//         slides: { perView: 4, spacing: 20 },
//       },
//     },
//     animation: {
//       duration: 600,
//       easing: (t) => t,
//     },
//     slideChanged(slider) {
//       setCurrentSlide(slider.track.details.rel);
//     },
//     created() {
//       setSliderLoaded(true);
//     },
//   });

//   const goPrev = () => instanceRef.current?.prev();
//   const goNext = () => instanceRef.current?.next();

//   if (loading) {
//     return (
//       <Container>
//         <div className="flex justify-center items-center h-64">
//           <p>Loading products...</p>
//         </div>
//       </Container>
//     );
//   }

//   return (
//     <Container>
//       <div className="relative w-full py-8">
//         {/* Heading */}
//         <div className="flex items-center justify-center mb-6">
//           <img
//             src={headingImage}
//             alt="headings"
//             className="heading_image"
//             style={{ marginRight: "10px" }}
//           />
//           <h2 className="heading_texts">Best Seller</h2>
//           <img src={headingImage} alt="headings" className="heading_image-right" />
//         </div>

//         {/* Slider */}
//         <div ref={sliderRef} className="keen-slider">
//           {products.map((item) => (
//             <div
//               key={item._id}
//               className="keen-slider__slide flex justify-center items-center"
//             >
//               <ProductCard product={item} />
//             </div>
//           ))}
//         </div>

//         {/* Navigation Buttons */}
//         {sliderLoaded && products.length > 0 && (
//           <>
//             <button
//               onClick={goPrev}
//               className="absolute z-10 p-3 rounded-full shadow hover:bg-gray-100 left-btn-scroll"
//               style={{
//                 backgroundColor: "#551F3D",
//                 top: "50%",
//                 left: "-65px",
//               }}
//             >
//               <ChevronLeft className="text-white w-4 h-4 sm:w-6 sm:h-6" />
//             </button>

//             <button
//               onClick={goNext}
//               className="absolute z-10 p-3 rounded-full shadow hover:bg-gray-100 right-btn-scroll"
//               style={{
//                 backgroundColor: "#551F3D",
//                 top: "50%",
//                 right: "-65px",
//               }}
//             >
//               <ChevronRight className="text-white" />
//             </button>
//           </>
//         )}
//       </div>
//     </Container>
//   );
// }


import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductCard from "../customer/Components/Product/ProductCard/ProductCard";
import headingImage from "./assets/headings-style.png";
import { Container } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function ProductCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Priority IDs
  const productIdsPriority = [
    "687410d3a9a47e81eb0e4692",
    "68617df58dc665d3da698137",
    "68a4791bebf4ddb1c00be03d",
    "686184388dc665d3da698143",
    "68a2fb25ebf4ddb1c00800e7",
    "6861a623c7d6a374abb909ce",
    "68603010d4bed7f4bdaaf297",
    "68a30f83ebf4ddb1c008c45f",
    "68614ad38dc665d3da6980a5",
    "68a30c02ebf4ddb1c008c038",
    "68a315e7ebf4ddb1c0092e15",
    "685fefe5d4bed7f4bdaaec02",
    "685ff475d4bed7f4bdaaed60",
    "68614c718dc665d3da6980bb",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const res = await fetch(
          `${API_BASE_URL}/api/products?pageNumber=1&pageSize=500`
        );
        const data = await res.json();

        if (Array.isArray(data.content)) {
          let productsData = data.content;

          // Sort products so priority IDs come first
          productsData.sort((a, b) => {
            const idxA = productIdsPriority.indexOf(a._id);
            const idxB = productIdsPriority.indexOf(b._id);

            if (idxA === -1 && idxB === -1) return 0; // neither in priority
            if (idxA === -1) return 1; // a not in priority → after b
            if (idxB === -1) return -1; // b not in priority → after a
            return idxA - idxB; // both in priority → sort by priority order
          });

          // Optional: Pick first 15 products for carousel
          setProducts(productsData.slice(0, 15));
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider({
    loop: true,
    slides: { perView: 2, spacing: 10 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2, spacing: 15 } },
      "(min-width: 768px)": { slides: { perView: 3, spacing: 15 } },
      "(min-width: 1024px)": { slides: { perView: 4, spacing: 20 } },
    },
    animation: { duration: 600, easing: (t) => t },
    slideChanged(slider) { setCurrentSlide(slider.track.details.rel); },
    created() { setSliderLoaded(true); },
  });

  const goPrev = () => instanceRef.current?.prev();
  const goNext = () => instanceRef.current?.next();

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <p>Loading products...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="relative w-full py-8">
        {/* Heading */}
        <div className="flex items-center justify-center mb-6">
          <img src={headingImage} alt="headings" className="heading_image" style={{ marginRight: "10px" }} />
          <h2 className="heading_texts">Best Seller</h2>
          <img src={headingImage} alt="headings" className="heading_image-right" />
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {products.map((item) => (
            <div key={item._id} className="keen-slider__slide flex justify-center items-center">
              <ProductCard product={item} />
            </div>
          ))}
        </div>

        {/* Navigation */}
        {sliderLoaded && products.length > 0 && (
          <>
            <button onClick={goPrev} className="absolute z-10 p-3 rounded-full shadow hover:bg-gray-100 left-btn-scroll"
              style={{ backgroundColor: "#551F3D", top: "50%", left: "-65px" }}>
              <ChevronLeft className="text-white w-4 h-4 sm:w-6 sm:h-6" />
            </button>

            <button onClick={goNext} className="absolute z-10 p-3 rounded-full shadow hover:bg-gray-100 right-btn-scroll"
              style={{ backgroundColor: "#551F3D", top: "50%", right: "-65px" }}>
              <ChevronRight className="text-white" />
            </button>
          </>
        )}
      </div>
    </Container>
  );
}
