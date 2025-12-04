import React from "react";

const WelcomeSection = () => {
  return (
    <section className=" WelcomeSection px-[25px] py-10 text-center bg-white">
      <h2 className="text-2xl md:text-3xl font-semibold text-[#EF4B6C] mb-6">
        Welcome to  Ramya Vastram: Where Elegance Meets Trends
      </h2>

      <div className="max-w-5xl mx-auto text-gray-700 text-base md:text-lg leading-relaxed text-left px-10 md:px-10">
        <p className="mb-4">
          If you searching for styles which are totally ethnic and rooted in Indian tradition and culture, then no look
          further than  Ramya Vastraml. Our collection comprising ethnic wear for women are vibrant, eye-catchy and trendy
          that it becomes almost impossible to overlook their charm. We offer an exclusive range of Indian ethnic wear that
          combines vibrant colors, stunning designs, and skin-friendly fabrics. Each category of ethnic wear collection is
          carefully curated to ensure exceptional quality and impeccable style for fashion-conscious females.
        </p>

        <p className="mb-6 mt-6">
          Ethnic fashion is evergreen, it is always in demand. With passage of time, the momentum of ethnic wear continues
          to grow and evolve. It is also one of the main reasons that buying a traditional dress is worthy of investment as
          it is suitable to be worn on different occasions, and helps create attractive ethnic look for different occasions.
        </p>

        <div className="text-center mt-10">
          <a
            href="#"
            className="inline-block px-6 py-2 text-[#EF4B6C] border border-[#EF4B6C] rounded-full font-medium hover:bg-[#EF4B6C] hover:text-white transition-all duration-300"
          >
           Go to top
          </a>
        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;
