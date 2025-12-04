import React from 'react';
import Jewellery from './Jewellery';
import Jewelleryimg from './assets/Ramya Vastram Categories/banner1.jpg'
import Sarees from './Sarees';
function AllJawellery() {
  return (
    <div>
      <div
        style={{
          width: '100%',
          position: 'relative',
          overflow: 'hidden',
          aspectRatio: '16/6', // Add aspect-ratio for modern browsers
          maxHeight: 500,
        }}
      >
        <img
          src={Jewelleryimg}
          alt="Jewellery Banner"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            objectPosition: 'center',
          }}
        />
      </div>
      < Sarees/>
    </div>
  );
}

export default AllJawellery;
