import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { useNavigate } from "react-router-dom";

const handleDragStart = (e) => e.preventDefault();

const HomeCarousel = () => {
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("http://localhost:5454/api/banners");
        const data = await res.json();

        // show only active banners
        const activeBanners = data.filter(
          (banner) => banner.isActive === true
        );

        setBanners(activeBanners);
      } catch (error) {
        console.error("Failed to load banners");
      }
    };

    fetchBanners();
  }, []);

  const items = banners.map((banner) => (
    <img
      key={banner._id}
      className="cursor-pointer w-full h-auto"
      src={banner.image}
      alt={banner.title}
      onClick={() => banner.link && navigate(banner.link)}
      onDragStart={handleDragStart}
      role="presentation"
    />
  ));

  if (!items.length) return null;

  return (
    <AliceCarousel
      mouseTracking
      items={items}
      autoPlay
      infinite
      autoPlayInterval={3000}
      disableButtonsControls
      renderDotsItem={({ isActive }) => (
        <span className={`custom-dot ${isActive ? "active" : ""}`} />
      )}
    />
  );
};

export default HomeCarousel;
