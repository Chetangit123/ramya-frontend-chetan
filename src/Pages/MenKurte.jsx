import React, { useState, useEffect } from "react";
import headingImage from "./assets/headings-style.png";
import { Container, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import ViewCollection from "../customer/Components/Product/ProductCard/ViewCollection";
import { API_BASE_URL } from "../config/api";

export default function MenKurte() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ["kurta"];
  const baseUrl = `${API_BASE_URL}/api/products`;
  const queryBase =
    "color=&size=&minPrice=0&maxPrice=100000&minDiscount=0&stock=null&sort=price_low&pageNumber=0&pageSize=1000";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const urls = categories.map(
          (cat) => `${baseUrl}?${queryBase}&category=${cat}`
        );

        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((res) => res.json()));

        const fetchedProducts = data
          .map((res) => res.content?.[0])
          .filter(Boolean);

        setProducts(fetchedProducts);
      } catch (err) {
        console.error("Error fetching jewelry products:", err);
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
          <h2 className="heading_texts">Men's kurte</h2>
          <img
            src={headingImage}
            alt="headings"
            className="heading_image-right"
          />
        </div>

        {/* Products Grid */}
        <Grid container spacing={3} justifyContent="center">
          {products.map((item, idx) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={idx}>
              <Link
                to={`/men/men_kurte/${item.category?.name || "item"}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ViewCollection product={item} />
              </Link>
            </Grid>
          ))}
        </Grid>
      </div>
    </Container>
  );
}
