import React from "react";
import { useKeenSlider } from "keen-slider/react";
import CustomerReviews from "../CustomerReviews";
import "keen-slider/keen-slider.min.css";
import headingImage from "../assets/headings-style.png";

export default function FeedbackSlider() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "snap",
    slides: {
      origin: "center",
      perView: 1.2, // Show center + partial sides
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.2, spacing: 15 }, // Show 2 full, part 3rd
      },
      "(min-width: 768px)": {
        slides: { perView: 3.2, spacing: 15 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 3.5, spacing: 20 }, // Desktop center align
      },
      "(min-width: 1280px)": {
        slides: { perView: 4.2, spacing: 20 },
      },
    },
  });

  const reviews = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="w-full py-16 overflow-hidden">
      <div
        className="headingpngdiv mb-5"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={headingImage} alt="headings" className="heading_image" />
        <h2 className="heading_texts">Customer Feedback</h2>
        <img src={headingImage} alt="headings" className="heading_image-right" />
      </div>

      <div ref={sliderRef} className="keen-slider overflow-visible">
        {reviews.map((_, idx) => (
          <div
            key={idx}
            className="keen-slider__slide flex justify-center items-center"
          >
            <div className="w-[90%] h-full rounded-lg overflow-hidden shadow-md bg-white ">
              <CustomerReviews />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
