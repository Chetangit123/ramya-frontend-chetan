import React, { useState, useEffect } from "react";
import headingImage from "./assets/headings-style.png";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ViewCollection from "../customer/Components/Product/ProductCard/ViewCollection";
import { API_BASE_URL } from "../config/api";

export default function Jewellery() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    "khadi_cotton",
    "love_khadi_saree",
    "sunflower_khadi_saree",
    "raga_tissue_saree",
    "flower_khadi_saree",
    "charcoal_khadi_saree",
    "indigo_saree",
    "love_embroidery_mul_cotton",
    "multi_color_mul_cotton",
    "love_lace_border_khadi_saree",
    "lata_embroidery_khadi_saree",
    "plain_khesh_saree",
    "nayantara_lace_border_khadi",
    "love_cotton_saree",
    "resham_kota_saree",
    "flower_mul_cotton_saree",
    "khadi_shiuli",
    "half_and_soft_Khadi",
    "tissue_saree_with_border",
    "striped_cotton",
    "sico_khadi_saree",
    "linen",
    "khesh_shiuli",
    "slab_cotton_saree",
    "muslin_jamdani_saree",
    "padma_khadi_saree",
    "temple_saree",
    "jute_khadi",
    "umbrelladhoop",
    "mul_cotton",
    "mul_cotton_sequin",
    "mul_cotton_polka_dot",
    "patch_work",
    "kalamkari",
    "mul_cotton_butterfly",
    "lace_border_tissue_saree",
    "block_print",
    "thread_mul_cotton"
  ];

  const productIdsPriority = [
    "6873aa5e0a1d19cc12b942b0",
    "68618a7a8dc665d3da698161",
    "68650e1e0eff37e893b7a1ce",
    "686184388dc665d3da698143",
    "6861a8b3c7d6a374abb90a0b",
    "68619632c7d6a374abb90563",
    "6861a0f9c7d6a374abb9095e",
    "686191fbc7d6a374abb904f3",
    "68a5b399ebf4ddb1c00fe19c",
    "68616ed38dc665d3da698101",
    "68603010d4bed7f4bdaaf297",
    "68614ad38dc665d3da6980a5",
    "68614beb8dc665d3da6980b5",
    "685ffe80d4bed7f4bdaaee1d",
    "685ff475d4bed7f4bdaaed60",
    "685ff21ed4bed7f4bdaaed39",
    "685fefe5d4bed7f4bdaaec02",
    "68614c718dc665d3da6980bb",
    "68a30027ebf4ddb1c0081b03",
    "68a3025febf4ddb1c0084878",
    "68a2fb25ebf4ddb1c00800e7",
    "68a2feaaebf4ddb1c008100b",
    "68740393a9a47e81eb0e1f0b",
    "686510180eff37e893b7a38f",
    "686187f08dc665d3da698155",
    "6873f886a9a47e81eb0e0ecb",
    "6860350dd4bed7f4bdaaf30e",
    "68619977c7d6a374abb9077e",
    "68739198a69969eb792c9a24",
    "6873fae3a9a47e81eb0e0fb9",
    "68a304c3ebf4ddb1c0084d2a",
    "68a5b91eebf4ddb1c01007f4",
    "686186da8dc665d3da698149",
    "68a30134ebf4ddb1c0082b4d",
    "6861a623c7d6a374abb909ce",
    "68a4791bebf4ddb1c00be03d",
    "687410d3a9a47e81eb0e4692",
    "6861a73ac7d6a374abb909e7",
    "686155318dc665d3da6980e4",
    "68a304f7ebf4ddb1c0084d36",
    "68a3048bebf4ddb1c0084d1e",
    "68a3052febf4ddb1c0084d42",
    "68b03824b666098062472657"
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${API_BASE_URL}/api/products/multi-category?category=${categories.join(',')}&pageNumber=1&pageSize=500`
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data = await response.json();
        let productsData = data.content || [];

        // Filter only products present in productIdsPriority
        productsData = productsData.filter(product => productIdsPriority.includes(product._id));

        // Sort by the order in productIdsPriority
        productsData.sort((a, b) => {
          const idxA = productIdsPriority.indexOf(a._id);
          const idxB = productIdsPriority.indexOf(b._id);
          return idxA - idxB;
        });

        setProducts(productsData);
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      <div className="w-full py-8">
        {/* Heading */}
        <div className="flex items-center justify-center mb-8">
          <img src={headingImage} alt="headings" className="heading_image" />
          <h2 className="heading_texts">Sarees</h2>
          <img src={headingImage} alt="headings" className="heading_image-right" />
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <Grid container spacing={3} justifyContent="center">
            {products.map((product, idx) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={product._id || idx}>
                <Link
                  to={`/women/saree/${product.category?.name || "saree"}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <ViewCollection product={product} />
                </Link>
              </Grid>
            ))}
          </Grid>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p>No products found.</p>
          </div>
        )}
      </div>
    </Container>
  );
}


// import React, { useState, useEffect } from "react";
// import headingImage from "./assets/headings-style.png";
// import { Container, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
// import ViewCollection from "../customer/Components/Product/ProductCard/ViewCollection";
// import { API_BASE_URL } from "../config/api";

// export default function Jewellery() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Replace with your actual product IDs
//   const productIds = [
//     "6873aa5e0a1d19cc12b942b0",
//     "68618a7a8dc665d3da698161",
//     "68650e1e0eff37e893b7a1ce",
//     "686184388dc665d3da698143",
//     "6861a8b3c7d6a374abb90a0b",
//     "68619632c7d6a374abb90563",
//     "6861a0f9c7d6a374abb9095e",
//     "686191fbc7d6a374abb904f3",
//     "68a5b399ebf4ddb1c00fe19c",
//     "68616ed38dc665d3da698101",
//     "68603010d4bed7f4bdaaf297",
//     "68614ad38dc665d3da6980a5",
//     "68614beb8dc665d3da6980b5",
//     "685ffe80d4bed7f4bdaaee1d",
//     "685ff475d4bed7f4bdaaed60",
//     "685ff21ed4bed7f4bdaaed39",
//     "685fefe5d4bed7f4bdaaec02",
//     "68614c718dc665d3da6980bb",
//     "68a30027ebf4ddb1c0081b03",
//     "68a3025febf4ddb1c0084878",
//     '68a2fb25ebf4ddb1c00800e7',
//     "68a2feaaebf4ddb1c008100b",
//     "68740393a9a47e81eb0e1f0b",
//     "686510180eff37e893b7a38f",
//     "686187f08dc665d3da698155",
//     "6873f886a9a47e81eb0e0ecb",
//     "6860350dd4bed7f4bdaaf30e",
//     "68619977c7d6a374abb9077e",
//     "68739198a69969eb792c9a24",
//     "6873fae3a9a47e81eb0e0fb9",
//     "68a304c3ebf4ddb1c0084d2a",
//     "68a5b91eebf4ddb1c01007f4",
//     "686186da8dc665d3da698149",
//     "68a30134ebf4ddb1c0082b4d",
//     "6861a623c7d6a374abb909ce",
//     "68a4791bebf4ddb1c00be03d",
//     "687410d3a9a47e81eb0e4692",
//     "6861a73ac7d6a374abb909e7",
//     "686155318dc665d3da6980e4",

//     // Add more product IDs as needed
//   ];

//   console.log("Product IDs:", productIds.length);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);

//         // Fetch products by their IDs
//         const productPromises = productIds.map(async (id) => {
//           try {
//             const response = await fetch(`${API_BASE_URL}/api/products/id/${id}`);
//             if (!response.ok) {
//               throw new Error(`Failed to fetch product ${id}`);
//             }
//             return await response.json();
//           } catch (error) {
//             console.error(`Error fetching product ${id}:`, error);
//             return null;
//           }
//         });

//         const fetchedProducts = await Promise.all(productPromises);
//         const validProducts = fetchedProducts.filter(product => product !== null);

//         setProducts(validProducts);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

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
//       <div className="w-full py-8">
//         {/* Heading */}
//         <div className="flex items-center justify-center mb-8">
//           <img src={headingImage} alt="headings" className="heading_image" />
//           <h2 className="heading_texts">Saree</h2>
//           <img
//             src={headingImage}
//             alt="headings"
//             className="heading_image-right"
//           />
//         </div>

//         {/* Products Grid */}
//         {products.length > 0 ? (
//           <Grid container spacing={3} justifyContent="center">
//             {products.map((product, idx) => (
//               <Grid item xs={6} sm={6} md={4} lg={3} key={product._id || idx}>
//                 <Link
//                   to={`/women/saree/${product.category?.name || "saree"}`} // Navigate to collection page
//                   style={{ textDecoration: "none", color: "inherit" }}
//                 >
//                   <ViewCollection product={product} />
//                 </Link>
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <div className="flex justify-center items-center h-64">
//             <p>No products found.</p>
//           </div>
//         )}
//       </div>
//     </Container>
//   );
// }