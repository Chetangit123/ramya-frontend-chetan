// import { useState, useRef, useEffect } from "react";
// import Zoom from 'react-medium-image-zoom';
// import 'react-medium-image-zoom/dist/styles.css';

// const MagnifierImage = ({ src, width = 500, height = 600, zoomLevel = 2 }) => {
//   const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

//   // Hooks must be declared here, not inside conditionals
//   const imgRef = useRef(null);
//   const magnifierRef = useRef(null);
//   const animationFrameId = useRef(null);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsDesktop(window.innerWidth >= 768);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     return () => {
//       if (animationFrameId.current) {
//         cancelAnimationFrame(animationFrameId.current);
//       }
//     };
//   }, []);

//   const handleMouseMove = (e) => {
//     if (!isDesktop) return; // Only run on desktop
//     if (!imgRef.current || !magnifierRef.current) return;
//     if (animationFrameId.current) return;

//     animationFrameId.current = requestAnimationFrame(() => {
//       const { top, left, width: imgWidth, height: imgHeight } = imgRef.current.getBoundingClientRect();
//       const x = e.pageX - left - window.scrollX;
//       const y = e.pageY - top - window.scrollY;

//       magnifierRef.current.style.left = `${x - 100}px`;
//       magnifierRef.current.style.top = `${y - 100}px`;
//       magnifierRef.current.style.backgroundPosition = `${-x * zoomLevel + 100}px ${-y * zoomLevel + 100}px`;

//       animationFrameId.current = null;
//     });
//   };

//   if (isDesktop) {
//     return (
//       <div style={{ position: "relative", width, height, overflow: "hidden" }}>
//         <img
//           ref={imgRef}
//           src={src}
//           alt="Zoomable Product"
//           style={{ width: "100%", height: "100%", objectFit: "contain" }}
//           onMouseEnter={() => {
//             if (magnifierRef.current) magnifierRef.current.style.display = "block";
//           }}
//           onMouseLeave={() => {
//             if (magnifierRef.current) magnifierRef.current.style.display = "none";
//           }}
//           onMouseMove={handleMouseMove}
//         />

//         <div
//           ref={magnifierRef}
//           style={{
//             position: "absolute",
//             display: "none",
//             pointerEvents: "none",
//             top: 0,
//             left: 0,
//             width: "200px",
//             height: "200px",
//             border: "2px solid #ccc",
//             borderRadius: "50%",
//             backgroundImage: `url(${src})`,
//             backgroundRepeat: "no-repeat",
//             backgroundSize: `${width * zoomLevel}px ${height * zoomLevel}px`,
//           }}
//         />
//       </div>
//     );
//   }

//   return (
//     <div style={{ width, height }}>
//       <Zoom>
//         <img
//           src={src}
//           alt="Zoomable Product"
//           style={{ width: "100%", height: "100%", objectFit: "contain" }}
//         />
//       </Zoom>
//     </div>
//   );
// };

// export default MagnifierImage;

import { useState, useEffect } from "react";
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const MagnifierImage = ({ src, width = 500, height = 600 }) => {
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ width, height }}>
      <Zoom zoomMargin={40}>
        <img
          src={src}
          alt="Zoomable Product"
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </Zoom>
    </div>
  );
};

export default MagnifierImage;
