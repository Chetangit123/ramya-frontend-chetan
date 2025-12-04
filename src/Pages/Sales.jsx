import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import ProductCard from "../customer/Components/Product/ProductCard/ProductCard";
import headingImage from "./assets/headings-style.png";
import { Container } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_BASE_URL } from "../config/api";

export default function ProductCarousel({ section }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch same products as in Sarees
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const urls = [
          `${API_BASE_URL}/api/products?category=indigo_saree&pageNumber=1&pageSize=1`,
          `${API_BASE_URL}/api/products?category=love_embroidery_mul_cotton&pageNumber=1&pageSize=1`,
          `${API_BASE_URL}/api/products?category=raga_tissue_saree&pageNumber=1&pageSize=1`,
          `${API_BASE_URL}/api/products?category=sunflower_khadi_saree&pageNumber=1&pageSize=1`,
          `${API_BASE_URL}/api/products?category=love_khadi_saree&pageNumber=1&pageSize=1`,
          `${API_BASE_URL}/api/products?category=khadi_cotton&pageNumber=1&pageSize=1`,
        ];

        const responses = await Promise.all(urls.map((url) => fetch(url)));
        const data = await Promise.all(responses.map((res) => res.json()));
        const fetchedProducts = data.map((d) => d.content?.[0]).filter(Boolean);

        setProducts(fetchedProducts);
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
    slides: {
      perView: 2,  // Show 2 cards by default (for phones)
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 15 },  // You can keep 2 for tablets too if you want
      },
      "(min-width: 768px)": {
        slides: { perView: 3, spacing: 15 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4, spacing: 20 },
      },
    },
    animation: {
      duration: 600,
      easing: (t) => t,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setSliderLoaded(true);
    },
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
        <div className="flex items-center justify-center">
          <img src={headingImage} alt="headings" className="heading_image" />
          <h2 className="heading_texts">{section}</h2>
          <img src={headingImage} alt="headings" className="heading_image-right" />
        </div>

        {/* Slider */}
        <div ref={sliderRef} className="keen-slider">
          {products.map((item, idx) => (
            <div
              key={idx}
              className="keen-slider__slide flex justify-center items-center"
            >
              <ProductCard product={item} />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        {sliderLoaded && products.length > 0 && (
          <>
            <button
              onClick={goPrev}
              className="absolute z-10 p-3 rounded-full shadow hover:bg-gray-100 left-btn-scroll"
              style={{
                backgroundColor: "#551F3D",
                top: "50%",
                left: "-65px",
              }}
            >
              <ChevronLeft className="text-white" />
            </button>

            <button
              onClick={goNext}
              className="absolute z-10 p-3 rounded-full shadow hover:bg-gray-100 right-btn-scroll"
              style={{
                backgroundColor: "#551F3D",
                top: "50%",
                right: "-65px",
              }}
            >
              <ChevronRight className="text-white" />
            </button>
          </>
        )}
      </div>
    </Container>
  );
}
