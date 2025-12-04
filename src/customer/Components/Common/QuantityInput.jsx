import React, { useState } from "react";

const QuantityInput = ({ min = 1, max = 10 }) => {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = () => {
    setQuantity((prev) => Math.max(prev - 1, min));
  };

  const handleIncrement = () => {
    setQuantity((prev) => Math.min(prev + 1, max));
  };

  const handleChange = (e) => {
    const value = Number(e.target.value);
    if (value >= min && value <= max) {
      setQuantity(value);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="font-semibold">Quantity:</label>
      <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
        <button
          onClick={handleDecrement}
          className="text-lg font-bold px-2 text-gray-700 hover:text-black"
        >
          –
        </button>
        <input
          type="number"
          className="w-8 text-center outline-none bg-transparent appearance-none"
          value={quantity}
          min={min}
          max={max}
          onChange={handleChange}
        />
        <button
          onClick={handleIncrement}
          className="text-lg font-bold px-2 text-gray-700 hover:text-black"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityInput;
