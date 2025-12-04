// import React, { useState, useEffect } from "react";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import ProductCard from "../customer/Components/Product/ProductCard/ProductCard";
// import headingImage from "./assets/headings-style.png";
// import { Container } from "@mui/material";
// import { API_BASE_URL } from "../config/api";

// export default function SareeSection() {
//   // Slider 1 states
//   const [products1, setProducts1] = useState([]);
//   const [loading1, setLoading1] = useState(true);

//   // Slider 2 states
//   const [products2, setProducts2] = useState([]);
//   const [loading2, setLoading2] = useState(true);

//   // Product IDs for slider 1
// const productIds1 = [
//   "68a4791bebf4ddb1c00be03d",
//   "685ffe80d4bed7f4bdaaee1d",
//   "68618a7a8dc665d3da698161",
//   "68a2feaaebf4ddb1c008100b",
// ];

// // Product IDs for slider 2
// const productIds2 = [
//   "68614c718dc665d3da6980bb",
//   "68a2fb25ebf4ddb1c00800e7",
//   "68a3025febf4ddb1c0084878",
//   "68a30027ebf4ddb1c0081b03",
// ];

//   // Fetch products for slider 1
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading1(true);
//         const urls = productIds1.map(
//           (id) => `${API_BASE_URL}/api/products/id/${id}`
//         );
//         const responses = await Promise.all(urls.map((url) => fetch(url)));
//         const data = await Promise.all(responses.map((res) => res.json()));
//         setProducts1(data.filter(Boolean));
//       } catch (err) {
//         console.error("Error fetching products1:", err);
//       } finally {
//         setLoading1(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Fetch products for slider 2
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading2(true);
//         const urls = productIds2.map(
//           (id) => `${API_BASE_URL}/api/products/id/${id}`
//         );
//         const responses = await Promise.all(urls.map((url) => fetch(url)));
//         const data = await Promise.all(responses.map((res) => res.json()));
//         setProducts2(data.filter(Boolean));
//       } catch (err) {
//         console.error("Error fetching products2:", err);
//       } finally {
//         setLoading2(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Keen slider 1
//   const [sliderRef1] = useKeenSlider({
//     loop: true,
//     slides: { perView: 1, spacing: 10 }, // default
//     breakpoints: {
//       "(min-width: 200px)": { slides: { perView: 2, spacing: 10 } }, // 200-550px → 2 slides
//       "(min-width: 551px)": { slides: { perView: 3, spacing: 15 } },
//       "(min-width: 1024px)": { slides: { perView: 4, spacing: 20 } },
//     },
//   });

//   // Keen slider 2
//   const [sliderRef2] = useKeenSlider({
//     loop: true,
//     slides: { perView: 1, spacing: 10 }, // default
//     breakpoints: {
//       "(min-width: 200px)": { slides: { perView: 2, spacing: 10 } }, // 200-550px → 2 slides
//       "(min-width: 551px)": { slides: { perView: 3, spacing: 15 } },
//       "(min-width: 1024px)": { slides: { perView: 4, spacing: 20 } },
//     },
//   });

//   return (
//     <Container>
//       {/* Heading */}
//       <div className="flex items-center justify-center py-8">
//         <img
//           src={headingImage}
//           alt="headings"
//           className="heading_image"
//           style={{ marginRight: "10px" }}
//         />
//         <h2 className="heading_texts">Saree Collection</h2>
//         <img src={headingImage} alt="headings" className="heading_image-right" />
//       </div>

//       {/* Slider 1 */}
//       <div className="relative w-full mb-12">
//         {loading1 ? (
//           <div className="flex justify-center items-center h-64">
//             <p>Loading products...</p>
//           </div>
//         ) : (
//           <div ref={sliderRef1} className="keen-slider">
//             {products1.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="keen-slider__slide flex justify-center items-center"
//               >
//                 <ProductCard product={item} />
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Slider 2 */}
//       <div className="relative w-full">
//         {loading2 ? (
//           <div className="flex justify-center items-center h-64">
//             <p>Loading products...</p>
//           </div>
//         ) : (
//           <div ref={sliderRef2} className="keen-slider">
//             {products2.map((item, idx) => (
//               <div
//                 key={idx}
//                 className="keen-slider__slide flex justify-center items-center"
//               >
//                 <ProductCard product={item} />
//               </div>
//             ))}
//           </div>
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
import { API_BASE_URL } from "../config/api";

export default function SareeSection() {
  const [products1, setProducts1] = useState([]);
  const [loading1, setLoading1] = useState(true);

  const [products2, setProducts2] = useState([]);
  const [loading2, setLoading2] = useState(true);

  // Priority IDs for each slider
  const productIds1 = [
    "68a4791bebf4ddb1c00be03d",
    "685ffe80d4bed7f4bdaaee1d",
    "68618a7a8dc665d3da698161",
    "68a2feaaebf4ddb1c008100b",
  ];

  const productIds2 = [
    "68614c718dc665d3da6980bb",
    "68a2fb25ebf4ddb1c00800e7",
    "68a3025febf4ddb1c0084878",
    "68a30027ebf4ddb1c0081b03",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Fetch all products of this category
        const res = await fetch(`${API_BASE_URL}/api/products?pageSize=470`);
        // const res = await fetch(`${API_BASE_URL}/api/products?category=lace_border_tissue_saree`);
        const data = await res.json();

        if (Array.isArray(data.content)) {
          // Filter only saree products
          const sareeProducts = data.content.filter(
            (item) => item.category?.name?.toLowerCase().includes("saree")
          );

          // Split products for slider 1
          let slider1Products = sareeProducts.filter(item => productIds1.includes(item._id));
          let slider1Rest = sareeProducts.filter(item => !productIds1.includes(item._id));
          slider1Rest.sort(() => 0.5 - Math.random());
          slider1Products = [...slider1Products, ...slider1Rest].slice(0, 4);

          // Split products for slider 2
          let slider2Products = sareeProducts.filter(item => productIds2.includes(item._id));
          let slider2Rest = sareeProducts.filter(item => !productIds2.includes(item._id));
          slider2Rest.sort(() => 0.5 - Math.random());
          slider2Products = [...slider2Products, ...slider2Rest].slice(0, 4);

          setProducts1(slider1Products);
          setProducts2(slider2Products);
        }
      } catch (err) {
        console.error("Error fetching saree products:", err);
      } finally {
        setLoading1(false);
        setLoading2(false);
      }
    };

    fetchProducts();
  }, []);

  const [sliderRef1] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 10 },
    breakpoints: {
      "(min-width: 200px)": { slides: { perView: 2, spacing: 10 } },
      "(min-width: 551px)": { slides: { perView: 3, spacing: 15 } },
      "(min-width: 1024px)": { slides: { perView: 4, spacing: 20 } },
    },
  });

  const [sliderRef2] = useKeenSlider({
    loop: true,
    slides: { perView: 1, spacing: 10 },
    breakpoints: {
      "(min-width: 200px)": { slides: { perView: 2, spacing: 10 } },
      "(min-width: 551px)": { slides: { perView: 3, spacing: 15 } },
      "(min-width: 1024px)": { slides: { perView: 4, spacing: 20 } },
    },
  });

  return (
    <Container>
      {/* Heading */}
      <div className="flex items-center justify-center py-8">
        <img src={headingImage} alt="headings" className="heading_image" style={{ marginRight: "10px" }} />
        <h2 className="heading_texts">Saree Collection</h2>
        <img src={headingImage} alt="headings" className="heading_image-right" />
      </div>

      {/* Slider 1 */}
      <div className="relative w-full mb-12">
        {loading1 ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading products...</p>
          </div>
        ) : (
          <div ref={sliderRef1} className="keen-slider">
            {products1.map((item) => (
              <div key={item._id} className="keen-slider__slide flex justify-center items-center">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Slider 2 */}
      <div className="relative w-full">
        {loading2 ? (
          <div className="flex justify-center items-center h-64">
            <p>Loading products...</p>
          </div>
        ) : (
          <div ref={sliderRef2} className="keen-slider">
            {products2.map((item) => (
              <div key={item._id} className="keen-slider__slide flex justify-center items-center">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
