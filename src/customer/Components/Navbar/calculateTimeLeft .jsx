import React, { useEffect, useState } from 'react';
import './Navbar.css'
const CountdownTimer = ({ endTime }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        hours: String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((difference / 1000 / 60) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((difference / 1000) % 60)).padStart(2, '0'),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  return (
    <div className="header_counter_bg text-white text-center py-4">
      <span className="text-lg font-bold">HURRY UP! SALE ENDS IN :</span>{' '}
      <span className="text-2xl font-extrabold mx-1">{timeLeft.hours}</span>
      <span className="text-lg">Hrs :</span>{' '}
      <span className="text-2xl font-extrabold mx-1">{timeLeft.minutes}</span>
      <span className="text-lg">Mins :</span>{' '}
      <span className="text-2xl font-extrabold mx-1">{timeLeft.seconds}</span>
      <span className="text-lg">Secs</span>
    </div>
  );
};

export default CountdownTimer;
