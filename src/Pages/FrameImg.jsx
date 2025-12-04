
import React, { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import categoriesImg from "../Pages/assets/framImgs/Bridesmade.webp"
import categoriesImg1 from "../Pages/assets/framImgs/Bridesmade2.webp"
import categoriesImg2 from "../Pages/assets/framImgs/Cocktail.webp"
import categoriesImg3 from "../Pages/assets/framImgs/haldidress.webp"
import categoriesImg4 from "../Pages/assets/framImgs/Mehendi.webp"




export default function FrameImg() {
  const videoRefs = useRef([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderLoaded, setSliderLoaded] = useState(false);
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
  useEffect(() => {
    // Play the first video initially
    videoRefs.current[0]?.play();
  }, []);

  const slides = [
    categoriesImg,
    categoriesImg1,
    categoriesImg2,
    categoriesImg3,
    categoriesImg4,
  ];

  return (
    <div ref={sliderRef} className="keen-slider h-[500px] overflow-hidden">
      {slides.map((videoSrc, idx) => (
        <div className="keen-slider__slide flex justify-center items-center" key={idx}>
       <img src={videoSrc} style={{height:"100%"}}/>
        </div>
      ))}
    </div>
  );
}
