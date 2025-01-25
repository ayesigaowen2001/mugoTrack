"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const HomePage: React.FC = () => {
  // Array of text items to display
  const textItems = [
    "Innovative features for an animal tracking system",
    "GPS-based tracking for real-time location monitoring",
    "Activity monitoring to analyze animal behavior",
    "Alerts for unusual movements or boundary breaches",
    "n app for easy access to tracking data and analytics",
    "Enabling integration with wildlife conservation databases for better insights",
  ];
  

  // State to keep track of the current text item
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true); // Set mounted state to true when the component mounts
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % textItems.length);
    }, 3000); // Change text every 3 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [textItems.length]);
  
  if (!isMounted) {
    return null; // Prevent rendering until the component is mounted
  }
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
          <Link href="/login">
          <button
              className="w-[181px] h-[39px] bg-[#3f9758] rounded-[10px] text-white text-2xl font-normal font-[Imprima]"
              //onClick={goToLogIn}
            >
              Login
            </button>
            </Link>
            
            <Link href="/signup"> 
            <button
              className="w-[181px] h-[39px] bg-[#3f9758] rounded-[10px] text-white text-2xl font-normal font-[Imprima]"
              //onClick={goToSignup}
            >
              Sign up
            </button>
            </Link>
           
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
      <div className="absolute top-4 left-3   flex-row " style={{width: "150px"}}>
        <div >
          
          <div
            style={{
              height: "30.95px",
              width: "46px",
              background: "#8E6C2F",
              marginLeft: "2px",
              borderRadius: "30px",
              paddingLeft: "14px",
              paddingRight: "10px",
              paddingTop: "4px",
            }}
            className="absolute ]"
          >
            <Image
              src="/images/icons/icons8-year-of-ox-30.png"
              alt="Logo"
              width={19.17}
              height={20.87}
            />
          </div>
        </div>
        <div className="  ml-12 text-[#8e6c2f] text-xl font-normal font-[Imprima]" >
          mugoTracker
        </div>
      </div>
    </div>
  );
};

export default HomePage;
