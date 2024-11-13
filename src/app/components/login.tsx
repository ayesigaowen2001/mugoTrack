import React from "react";
import Image from "next/image";
import Link from "next/link";

const LoginPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen  items-center flex flex-col justify-center  bg-white px-4">
      {/* Main Container */}
      <div className="w-[436px]">
        {/* Logo Section */}
        <div className="w-[98px] h-[75.09px] mx-auto mb-8">
          <div className="w-full h-full bg-[#8e6c2f] rounded-[30px]"></div>
          <div
            style={{
              height: "30.95px",
              width: "46px",
              background: "#8E6C2F",
              marginLeft: "31px",
              borderRadius: "30px",
              paddingLeft: "14px",
              paddingRight: "10px",
              paddingTop: "4px",
            }}
            className="absolute left-[28.58px]"
          >
            <Image
              src="/images/icons/icons8-year-of-ox-30.png"
              alt="Logo"
              width={19.17}
              height={20.87}
            />
          </div>
        </div>

        {/* Welcome Back Text */}
        <div className="text-center text-black text-4xl font-normal font-[Imprima] mb-8">
          Welcome back
        </div>

        {/* Email Input Field */}
        <div className="w-full h-[79px] bg-white rounded-[10px] border border-[#201c1c] mb-4 p-4">
          <label className="block text-black text-4xl font-normal font-[Imprima] mb-2">
            Email
          </label>
          <input
            type="text"
            className="w-full p-2 text-black text-4xl font-normal font-[Imprima] border-none outline-none"
            placeholder="Enter your email"
          />
        </div>

        {/* Password Input Field */}
        <div className="w-full h-[77px] bg-white rounded-[10px] border border-[#141313] mb-4 p-4">
          <label className="block text-black text-4xl font-normal font-[Imprima] mb-2">
            Password
          </label>
          <input
            type="password"
            className="w-full p-2 text-black text-4xl font-normal font-[Imprima] border-none outline-none"
            placeholder="Enter your password"
          />
        </div>

        {/* Forgot Password */}
        <Link href="/resetPassword">
          <a className="text-center text-black text-[32px] font-normal font-[Imprima] mb-8">
            Forgot password?
          </a>
        </Link>

        {/* Continue Button */}
        <button className="w-full h-[79px] bg-[#3f9758] text-white text-4xl font-normal font-[Imprima] rounded-[10px] mb-8">
          Continue
        </button>

        {/* Terms of Use and Privacy Policy */}
        <div className="flex justify-center space-x-4 text-black text-sm font-normal font-[Imprima] underline">
          <a href="#">Terms of use</a>
          <span>|</span>
          <a href="#">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
