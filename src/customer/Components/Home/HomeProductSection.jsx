import { useEffect, useState } from "react";
import ProductCard from "../Product/ProductCard/ProductCard";
import { Container } from "@mui/material";
import headingImage from "./assets/headings-style.png";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { API_BASE_URL } from "../../../config/api";

const HomeProductSection = ({ section }) => {
  const [gopiProducts, setGopiProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const sliderOptions = {
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
  };

  const [sliderRef] = useKeenSlider(sliderOptions);

  useEffect(() => {
    const fetchGopiProducts = async () => {
      try {
        setLoading(true);

        const url = `${API_BASE_URL}/api/products?category=gopi&pageNumber=1&pageSize=50`;
        const response = await fetch(url);
        const data = await response.json();

        setGopiProducts(data.content || []);
      } catch (error) {
        console.error("Error fetching Gopi Dress:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGopiProducts();
  }, []);

  if (loading) {
    return (
      <Container>
        <div className="flex justify-center items-center h-64">
          <p>Loading Gopi Dress...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="relative product_main_container py-8">

        {/* Heading */}
        <div className="headingpngdiv flex items-center justify-center mb-8">
          <img src={headingImage} alt="headings" className="heading_image" />
          <h2 className="heading_texts">{section}</h2>
          <img src={headingImage} alt="headings" className="heading_image-right" />
        </div>

        {/* Gopi Dress Slider */}
        <div ref={sliderRef} className="keen-slider mb-8">
          {gopiProducts.map((item, idx) => (
            <div key={idx} className="keen-slider__slide">
              <ProductCard product={item} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default HomeProductSection;
