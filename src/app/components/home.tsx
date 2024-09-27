"use client";

import React, { useState, useEffect } from "react";

const HomePage: React.FC = () => {
  // Array of text items to display
  const textItems = [
    "Give me ideas for a customer loyalty program in a small bookstore",
    "Offer discounts for frequent customers",
    "Create a rewards program where customers earn points with each purchase",
    "Provide exclusive access to new book releases for loyal customers",
    "Host special events or book signings for frequent visitors",
  ];

  // State to keep track of the current text item
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to change the text item periodically
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textItems.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [textItems.length]);

  return (
    <div className="w-full h-screen relative bg-white flex flex-col justify-center items-center">
      {/* Main Content Wrapper */}
      <div className="w-full h-full max-w-[1440px] max-h-[876px] flex flex-col lg:flex-row">
        {/* Left Section (50px wider than right section) */}
        <div className="w-full lg:w-[calc(50%+25px)] h-full bg-neutral-100 flex items-center justify-center">
          {/* Sliding Text */}
          <div className="text-[#8e6c2f] text-2xl font-normal text-center font-[Imprima] animate-slide">
            {textItems[currentIndex]}
          </div>
        </div>

        {/* Right Section (50px narrower than left section) */}
        <div className="w-full lg:w-[calc(50%-25px)] h-full flex flex-col items-center justify-center bg-[#f0f0f0]/0">
          <div className="text-black text-[32px] font-normal font-[Imprima] mb-4">
            Get started
          </div>

          <div className="flex space-x-4">
            <button className="w-[181px] h-[39px] bg-[#3f9758] rounded-[10px] text-white text-2xl font-normal font-[Imprima]">
              Login
            </button>
            <button className="w-[181px] h-[39px] bg-[#3f9758] rounded-[10px] text-white text-2xl font-normal font-[Imprima]">
              Sign up
            </button>
          </div>

          <div className="flex space-x-4 mt-6 text-sm font-normal font-[Imprima] underline">
            <a href="#" className="text-black">
              Terms of use
            </a>
            <span>|</span>
            <a href="#" className="text-black">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>

      {/* Logo and Branding */}
      <div className="absolute top-4 left-4 flex items-center">
        <div className="relative w-[46px] h-[43.95px] bg-[#8e6c2f] rounded-[30px]">
          <img
            className="absolute left-[13.42px] top-[7.70px] w-[19.17px] h-[28.87px] rounded-[30px]"
            src="https://img.icons8.com/ios-glyphs/30/bull.png"
            alt="bull"
          />
        </div>
        <div className="ml-2 text-[#8e6c2f] text-xl font-normal font-[Imprima]">
          mugoTracker
        </div>
      </div>
    </div>
  );
};

export default HomePage;
// "use client";
// import React from "react";
// import { useState, useEffect } from "react";

// const HomePage: React.FC = () => {
//   const [carouselText, setCarouselText] = useState([
//     "Give me ideas for a customer loyalty program in a small bookstore",
//     "Provide exclusive discounts for frequent customers",
//     "Offer personalized book recommendations based on previous purchases",
//     "Implement a points system where customers earn rewards",
//   ]);
//   const [currentTextIndex, setCurrentTextIndex] = useState(0);

//   // Slide through text in the carousel every 3 seconds
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTextIndex((prevIndex) => (prevIndex + 1) % carouselText.length);
//     }, 3000); // Change text every 3 seconds
//     return () => clearInterval(interval);
//   }, [carouselText.length]);

//   return (
//     <div className="w-[843.51px] h-[616.92px] relative bg-white">
//       {/* Login Button */}
//       <div className="w-[107.22px] h-[23.10px] absolute left-[555.07px] top-[284.35px]">
//         <div className="w-full h-full bg-[#3f9758] rounded-md"></div>
//         <div className="absolute left-[36.73px] top-[3.55px] text-center text-white text-sm font-normal font-['Imprima']">
//           Login
//         </div>
//       </div>

//       {/* Get Started and Sign Up Section */}
//       <div className="w-[853.05px] h-[606.61px] absolute">
//         <div className="w-[487.54px] h-full bg-neutral-100"></div>
//         <div className="w-[366.10px] h-full absolute left-[486.95px] bg-[#f0f0f0]/0"></div>
//         <div className="absolute left-[624.38px] top-[250.58px] text-black text-[18.96px] font-normal font-['Imprima']">
//           Get started
//         </div>
//         <div className="w-[107.22px] h-[23.10px] absolute left-[687.18px] top-[284.35px]">
//           <div className="w-full h-full bg-[#3f9758] rounded-md"></div>
//           <div className="absolute left-[30.21px] top-[3.55px] text-center text-white text-sm font-normal font-['Imprima']">
//             Sign up
//           </div>
//         </div>
//       </div>

//       {/* Terms of Use and Privacy Policy */}
//       <div className="w-[110.61px] h-2.5 absolute left-[625.57px] top-[476.88px]">
//         <div className="absolute text-black text-[8.29px] font-normal font-['Imprima'] underline">
//           Terms of use
//         </div>
//         <div className="absolute left-[61.61px] text-black text-[8.29px] font-normal font-['Imprima'] underline">
//           Privacy Policy
//         </div>
//         <div className="absolute left-[52.72px] top-[7.70px] origin-top-left -rotate-90 border border-black"></div>
//       </div>

//       {/* Logo Section */}
//       <div className="absolute left-[26.66px] top-[13.03px]">
//         <div className="w-[27.25px] h-[26.03px] bg-[#8e6c2f] rounded-[17.77px]"></div>
//         <img
//           className="w-[11.35px] h-[17.10px] absolute left-[7.95px] top-[4.56px] rounded-[17.77px]"
//           src="https://via.placeholder.com/11x17"
//           alt="Logo"
//         />
//         <div className="absolute left-[32.58px] top-[5.92px] text-[#8e6c2f] text-xs font-normal font-['Imprima']">
//           mugoTracker
//         </div>
//       </div>

//       {/* Carousel Section */}
//       <div className="absolute left-[46.21px] top-[261.84px] text-[#8e6c2f] text-sm font-normal font-['Imprima']">
//         {carouselText[currentTextIndex]}
//       </div>
//     </div>
//   );
// };

// export default HomePage;
