// import React from 'react';
// import './ProductCard.css';
// import { useNavigate } from 'react-router-dom';

// const ViewCollection = ({ product }) => {
//   const navigate = useNavigate();
//   const {
//     brand,
//     title,
//     colorVariants = [],
//   } = product;

//   const defaultVariant = colorVariants[0] || {};
//   const images = defaultVariant.images || [];

//   const frontImage = images.find(img => img.label === 'front')?.url;
//   const backImage = images.find(img => img.label === 'back')?.url;
//   const fallbackImage = "https://via.placeholder.com/300x400?text=No+Image";

//   const handleNavigate = () => {
//     navigate(`/women/saree/${product.category?.name}`);
//   };
//   console.log(brand, 'check brand name');
//   return (
//     <div
//       className='productCard transition-all cursor-pointer flex flex-col'
//       style={{ borderRadius: '20px' }}
//     >
//       <div className='image-hover-container'>
//         <img className='main-image' src={frontImage || fallbackImage} alt={brand} />
//         {backImage && (
//           <img className='hover-image' src={backImage} alt={`${brand} back`} />
//         )}
//       </div>

//       <div className='textPart bg-white p-3 flex-grow flex flex-col justify-between'>
//         {/* <p className='font-semibold text-center'>{brand}</p> */}
//         <p className='font-semibold text-center'>
//           {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}
//         </p>

//         <button
//           onClick={handleNavigate}
//           style={{
//             backgroundColor: '#551F3D',
//             color: '#fff',
//             padding: '10px',
//             borderRadius: '6px',
//             marginTop: '12px',
//             width: '100%',
//             border: 'none',
//             fontWeight: 'bold',
//             cursor: 'pointer',
//           }}
//         >
//           View Collection
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ViewCollection;


import React from 'react';
import './ProductCard.css';
import { useNavigate } from 'react-router-dom';

const ViewCollection = ({ product }) => {
  const navigate = useNavigate();
  const {
    brand,
    title,
    colorVariants = [],
  } = product;

  const defaultVariant = colorVariants[0] || {};
  const images = defaultVariant.images || [];

  const frontImage = images.find(img => img.label === 'front')?.url;
  const backImage = images.find(img => img.label === 'back')?.url;
  const fallbackImage = "https://via.placeholder.com/300x400?text=No+Image";

  // Format category name
  const categoryName = product.category?.name || '';
  const formattedCategory = categoryName.charAt(0).toUpperCase() + categoryName.slice(1).toLowerCase();

  const handleNavigate = () => {
    navigate(`/women/saree/${categoryName.toLowerCase()}`);
  };

  console.log(brand, 'check brand name');

  return (
    <div
      className='productCard transition-all cursor-pointer flex flex-col'
      style={{ borderRadius: '20px' }}
    >
      <div className='image-hover-container'>
        <img className='main-image' src={frontImage || fallbackImage} alt={brand} />
        {backImage && (
          <img className='hover-image' src={backImage} alt={`${brand} back`} />
        )}
      </div>

      <div className='textPart bg-white p-3 flex-grow flex flex-col justify-between'>
        {/* Title */}
        <p className='font-semibold text-center truncate'>{title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</p>

        {/* Category Name */}
        {/* <p className='text-center text-sm text-gray-600 truncate' style={{ minHeight: '1.5rem' }}>
          {formattedCategory}
        </p> */}

        {/* View Collection Button */}
        <button
          onClick={handleNavigate}
          style={{
            backgroundColor: '#551F3D',
            color: '#fff',
            padding: '10px',
            borderRadius: '6px',
            marginTop: '12px',
            width: '100%',
            border: 'none',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          View Collection
        </button>
      </div>
    </div>
  );
};

export default ViewCollection;
