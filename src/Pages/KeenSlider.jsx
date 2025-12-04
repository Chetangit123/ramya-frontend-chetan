// import React, { useEffect, useRef } from "react";
// import { useKeenSlider } from "keen-slider/react";
// import "keen-slider/keen-slider.min.css";
// import reelsVideo from "./assets/Reels/reels.mp4";
// import reelsVideo2 from "./assets/Reels/reelsVideo1.mp4";
// import reelsVideo3 from "./assets/Reels/reelsVideo2.mp4";
// import reelsVideo4 from "./assets/Reels/reelsVideo3.mp4";
// import reelsVideo5 from "./assets/Reels/reelsVideo5.mp4";
// import reelsVideo6 from "./assets/Reels/reelsVideo6.mp4";
// import reelsVideo7 from "./assets/Reels/reelsVideo7.mp4";
// import reelsVideo8 from "./assets/Reels/reelsVideo8.mp4";
// import reelsVideo9 from "./assets/Reels/reelsVideo9.mp4";
// import headingImage from "./assets/headings-style.png";

// export default function ReelsSlider() {
//   const videoRefs = useRef([]);

//   const [sliderRef, instanceRef] = useKeenSlider({
//     loop: true,
//     mode: "snap",
//     slides: {
//       origin: "center",
//       perView: 1.2, // Show partial left/right cards on small screens
//       spacing: 15,
//     },
//     slideChanged(slider) {
//       videoRefs.current.forEach((video, index) => {
//         if (index === slider.track.details.rel) {
//           video?.play();
//         } else {
//           video?.pause();
//         }
//       });
//     },
//     breakpoints: {
//       "(min-width: 640px)": {
//         slides: { perView: 2.2, spacing: 15 },
//       },
//       "(min-width: 768px)": {
//         slides: { perView: 3.2, spacing: 15 },
//       },
//       "(min-width: 1024px)": {
//         slides: { perView: 3.5, spacing: 15 }, // Perfect desktop centering
//       },
//       "(min-width: 1280px)": {
//         slides: { perView: 4.2, spacing: 15 },
//       },
//     },
//   });

//   useEffect(() => {
//     videoRefs.current[0]?.play();
//   }, []);

//   const slides = [
//     reelsVideo,
//     reelsVideo2,
//     reelsVideo3,
//     reelsVideo4,
//     reelsVideo5,
//     reelsVideo6,
//     reelsVideo7,
//     reelsVideo8,
//     reelsVideo9,
//   ];

//   return (
//     <div className="w-full py-10 overflow-hidden">
//       <div
//         className="headingpngdiv mb-5"
//         style={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//       >
//         <img src={headingImage} alt="headings" className="heading_image" />
//         <h2 className="heading_texts">Watch And Buy</h2>
//         <img src={headingImage} alt="headings" className="heading_image-right" />
//       </div>

//       <div ref={sliderRef} className="keen-slider h-[500px] overflow-visible">
//         {slides.map((videoSrc, idx) => (
//           <div
//             className="keen-slider__slide flex justify-center items-center relative"
//             key={idx}
//           >
//             <div className="w-[90%] h-full rounded-lg overflow-hidden shadow-lg bg-black relative">
//               <video
//                 ref={(el) => (videoRefs.current[idx] = el)}
//                 src={videoSrc}
//                 className="w-full h-full object-cover"
//                 muted
//                 loop
//                 playsInline
//                 preload="auto"
//               />
//               <div className="newslider-content absolute bottom-4 left-1/2 transform -translate-x-1/2">
//                 <div className="customer-name newclass"></div>
//                 <div className="customer-review"></div>
//                 <a href="/collections/sarees" tabIndex="0">
//                   View Product
//                 </a>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
