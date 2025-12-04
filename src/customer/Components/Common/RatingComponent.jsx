import React from 'react';
import ReactStars from "react-rating-stars-component";
function RatingComponent() {
  const ratingChanged = (newRating) => {
  };

  return (
    <div>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />,

    </div>
  );
}

export default RatingComponent;
