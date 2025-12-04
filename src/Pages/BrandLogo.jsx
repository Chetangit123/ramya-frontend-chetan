import React from 'react';
import headingImage from './assets/headings-style.png';

function BrandLogo() {
  const logos = [
    "//www.lavanyathelabel.com/cdn/shop/files/01_4088c577-2458-43b4-84dc-8e08d7a61a7e.png?v=1735816305",
    "//www.lavanyathelabel.com/cdn/shop/files/02_7f9faa94-b983-461f-a46e-89c3212692bf.png?v=1735816305",
    "//www.lavanyathelabel.com/cdn/shop/files/04.png?v=1735816305",
    "//www.lavanyathelabel.com/cdn/shop/files/05.png?v=1735816305",
    "//www.lavanyathelabel.com/cdn/shop/files/08.png?v=1735816306",
    "//www.lavanyathelabel.com/cdn/shop/files/06.png?v=1735816305",
    "//www.lavanyathelabel.com/cdn/shop/files/07_abb3fcef-e1e8-406b-9d51-e039452880ad.png?v=1735885172",
    "//www.lavanyathelabel.com/cdn/shop/files/09.png?v=1735816305",
    "//www.lavanyathelabel.com/cdn/shop/files/10.png?v=1735816305",
    // Add more if needed
  ];

  return (
    <div className="marquee-wrapper">  
     <div
            className="headingpngdiv"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={headingImage}
              alt="headings"
              className="heading_image"
            
            />
            <h2 className="heading_texts">As Seen on </h2>
            <img
              src={headingImage}
              alt="headings"
              className="heading_image-right"
              
            />
          </div>
      <div className="marquee-content">
        {logos.concat(logos).map((src, index) => (
          <div className="logo-item" key={index}>
            <img src={src} alt={`logo-${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default BrandLogo;
