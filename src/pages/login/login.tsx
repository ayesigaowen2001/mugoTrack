"use client";
import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
const LoginPage: React.FC = () => {
  // const [emailFocused, setEmailFocused] = useState(false);
  // const [passwordFocused, setPasswordFocused] = useState(false);
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="w-[950px] h-[620.20px] px-[200px] pt-[62.62px] pb-[29.95px] bg-white flex justify-center items-center">
      <div className="w-[260.01px] h-[527.63px] relative ml-44">
        {/* Logo */}
        <div className="w-[58.44px] h-[44.78px] absolute left-[100.71px] top-10">
          <div className="w-full h-full bg-[#8e6c2f] rounded-[17.89px]"></div>
          <img
            className="absolute w-[24.35px] h-[29.42px] left-[17.05px] top-[7.84px] rounded-[17.89px]"
            src="https://via.placeholder.com/24x29"
            alt="Logo"
          />
        </div>

        {/* Welcome back text */}
        <div className="absolute left-[57.85px] top-[134.18px] text-black text-[21.47px] font-normal font-['Imprima']">
          Welcome back
        </div>

        {/* Decorative Line */}
        <div className=" absolute top-[200.97px] w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
          <span className="p-float-label">
            <InputText
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
            />
            <label htmlFor="email" className="text-[15.47px]">
              Email
            </label>
          </span>
        </div>
        <div className=" absolute top-[267.99px] w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
          <span className="p-float-label">
            <InputText
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
            />
            <label htmlFor="email" className="text-[15.47px]">
              Password
            </label>
          </span>
        </div>
        {/* Password Input Field with Floating Label
        <div>
          <span className="p-float-label">
            <InputText
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="absolute top-[267.99px] px-4 w-[260.01px] h-[45.92px] text-[15.47px] bg-white rounded-md border border-[#141313]"
            />
            <label htmlFor="password" className="top-[285.99px] p-flo">
              Password
            </label>
          </span>
        </div> */}

        {/* Terms of Use and Privacy Policy */}
        <div className="absolute left-[87.07px] top-[490.63px] w-[200.83px] h-2.5">
          <div className="absolute text-black text-[8.35px] font-normal underline">
            Terms of use |
          </div>
          <div className="absolute left-[60.83px] text-black text-[8.35px] font-normal underline ">
            Privacy Policy
          </div>
          <div className="absolute left-[51.58px] top-[2.37px] origin-top-left rotate-[89.92deg] border border-black"></div>
        </div>

        {/* Forgot Password */}
        <div className="absolute left-[1.19px] top-[327.39px] text-black text-[19.08px] font-normal font-['Imprima']">
          Forgot password?
        </div>

        {/* Continue Button */}
        <div className="absolute top-[402.53px] w-[260.01px] h-[47.11px] bg-[#3f9758] rounded-md border border-[#201c1c]"></div>
        <div className="absolute left-[88.26px] top-[413.86px] text-black text-[21.47px] font-normal">
          Continue
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
