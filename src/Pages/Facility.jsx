import React from 'react';  
import card from './assets/Facilityes/card.png'
import img from './assets/Facilityes/cash-on-delivery.png';
import customerSupport from './assets/Facilityes/customer-support.png';
import freeshipping from './assets/Facilityes/free-shipping (1).png';



const features = [
  { icon: card, text: 'Worldwide Delivery' },
  { icon: img, text: 'Free Shipping' },
  { icon: freeshipping , text: 'Cash On Delivery' },
  { icon: customerSupport, text: 'Easy Customer Support' },
  { icon: card, text: 'Easy Payments' },
];

const FeaturesSection = () => {
  return (
    <div className="features-container">
      {features.map((item, index) => (
        <div key={index} className="feature-box">
          <div className="icon-wrapper">
            <img src={item.icon} alt={item.text} />
          </div>
          <p>{item.text}</p>
        </div>
      ))}
    </div>
  );
};

export default FeaturesSection;
