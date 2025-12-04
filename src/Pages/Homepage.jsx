import React from "react";
import HomeCarousel from "../customer/Components/Carousel/HomeCarousel";
import { homeCarouselData } from "../customer/Components/Carousel/HomeCaroselData";
import HomeProductSection from "../customer/Components/Home/HomeProductSection";
import ShopebyCategories from "./ShopebyCategories";
import KeenSlider from "./KeenSlider";
import BrandLogo from "./BrandLogo";
import FrameImg from "./FrameImg";
import FeaturesSection from "./Facility";
import CustomerReviews from "./CustomerReviews";
import CustomerReviewsSection from "./CustomerReviews/CustomerReviewsSection";
import WelcomeSection from "./CustomerReviews/WelcomeSection";
import BestSallers from "./BestSallers";
import Sales from "./Sales";
import WedingCollection from "./WedingCollection";
import SareeSection from "./SareeSection";

const Homepage = () => {

  return (
    <div className="" >
      <HomeCarousel images={homeCarouselData}  />

      <div className="space-y-10 ">
          <ShopebyCategories/>
        <BestSallers  section={"Saree"} />
         {/* <Sales data={sareePage1} section={"Sale"}  /> */}
         <WedingCollection/>
        
  
        <HomeProductSection  section={"Gopi Dress"} />
         <SareeSection section={"Saree"} />
        {/* <HomeProductSection data={mensPantsPage1} section={"Men's Pants"} /> */}
       
        {/* <FrameImg/>  */}
         <BrandLogo/>
        {/* <KeenSlider/> */}
       
        {/* <CustomerReviewsSection/> */}
         <FeaturesSection/>
         <WelcomeSection/>
      </div>

      
    </div>
  );
};

export default Homepage;
