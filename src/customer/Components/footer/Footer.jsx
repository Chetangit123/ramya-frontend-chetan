import React from "react";
import { Link } from "react-router-dom";
import logo from "./assets/2.png";
import InsatFrame from "./assets/1 (2).png";

const Footer = () => {
  return (
    <footer className="bg-[#551f3d] text-whites rounded-t-2xl text-sm footer_Padding">
      <div className="flex flex-col md:flex-row justify-between items-start gap-8">
        {/* Contact Section */}
        <div className="flex flex-col">
          <img src={logo} alt="Ramya Vastram"  style={{height:"120px" , width:"200px"}} />
          <h6 className="space-y-2 text-white/90 mt-5">ELEGANCE WOVEN IN TRADITION. TIMELESS <br/> ETHNIC WEAR CRAFTED WITH GRACE, HERITAGE, <br/> AND SOULFUL ARTISTRY.</h6>
     
        </div>

        {/* Discover Section */}
        {/* <div className="flex flex-col" style={{paddingTop: "100px"}}>
          <h4 className="font-semibold mb-4 uppercase text-white">Contact</h4>
          <ul className="space-y-2 text-white/90">
             <h6 className="mt-2">PHONE: +91 95899 45653</h6>
          <h6 className="mt-2">MAIL: RAMYAVASTRAM@GMAIL.COM</h6>
          <h6 className="mt-2">ADDRESS: 17 PATNISADAN, <br/> KALALSERI, UJJAIN, M.P. (456006)</h6>
          </ul>
        </div> */}

        {/* Support Section */}
        <div className="flex flex-col" style={{paddingTop: "100px"}}>
          <h4 className="font-semibold mb-4 uppercase text-white">SUPPORT</h4>
          <ul className="space-y-2 text-white/90">
            <li><Link to="/contact-us">CONTACT US</Link></li>
            <li> <Link to="/bulk-order">BUY IN BULK</Link> </li>
          </ul>
        </div>

        {/* Policies Section */}
        <div className="flex flex-col" style={{paddingTop: "100px"}}>
          <h4 className="font-semibold mb-4 uppercase text-white">POLICIES</h4>
          <ul className="space-y-2 text-white/90">
          <li><Link to="/TermsConditions">TERMS & CONDITIONS</Link></li>
           
            <li><Link to="/ShippingDeliveryPolicy">SHIPPING & DELIVERY POLICY</Link></li>
            <li><Link to="/PrivacyPolicy">PRIVACY POLICY</Link></li>
            <li><Link to="/CancellationReturnPolicy">CANCELLATION & RETURN POLICY</Link></li>
          </ul>
        </div>

        {/* Social Icons Section */}
        <div className="flex flex-col items-center">
         
          <Link to="https://www.instagram.com/ramyavastram/">
            <img src={InsatFrame} alt="Instagram Feed" className="w-full" style={{height:"245px"}}  />
          </Link>
           <h4 className="font-semibold mb-4 uppercase text-white mt-5">Follow Us</h4>
        </div>
      </div>

      {/* Bottom Copyright Section */}
      <div className="text-center text-white/90 text-sm mt-10">
        © Copyright 2025 by Ramya Vastram. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
