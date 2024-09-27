import React from "react";

const LoginPage: React.FC = () => {
  return (
    <div className="w-full min-h-screen  items-center flex flex-col justify-center  bg-white px-4">
      {/* Main Container */}
      <div className="w-[436px]">
        {/* Logo Section */}
        <div className="w-[98px] h-[75.09px] mx-auto mb-8">
          <div className="w-full h-full bg-[#8e6c2f] rounded-[30px]"></div>
          <img
            className="absolute left-[28.58px] top-[13.15px] w-[40.83px] h-[49.33px] rounded-[30px]"
            src="https://via.placeholder.com/41x49"
            alt="Logo"
          />
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
            Password*
          </label>
          <input
            type="password"
            className="w-full p-2 text-black text-4xl font-normal font-[Imprima] border-none outline-none"
            placeholder="Enter your password"
          />
        </div>

        {/* Forgot Password */}
        <div className="text-center text-black text-[32px] font-normal font-[Imprima] mb-8">
          Forgot password?
        </div>

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
