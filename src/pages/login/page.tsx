"use client";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import login from "../../services/loginService";

const LoginPage: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  useEffect(() => {
    // Set to true once the component is mounted
    setIsMounted(true);
  }, []);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };
  const handleSubmit = async () => {
    if (!loginData) {
      alert("Please enter both email and password.");
      return;
    }

    setLoading(true); // Start loading

    try {
      //const loginData = { email, password };
      const data = await login(loginData); // Call login service
      console.log("Login successful:", data);
      router.push("/dashboard/page"); // Navigate to the dashboard on success
    } catch (err) {
      setError(err as string); // Set error message on failure
      console.error("Login failed:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!isMounted) return null; // Prevent rendering on the server

  return (
    <div className="w-[950px] h-[620.20px] px-[200px] pt-[62.62px] pb-[29.95px] bg-white flex justify-center items-center">
      <div className="w-[260.01px] h-[527.63px] relative ml-44">
        {/* Logo */}
        <div className="w-[58.44px] h-[44.78px] absolute left-[70.71px] top-10">
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
          >
            <Image
              src="/images/icons/icons8-year-of-ox-30.png"
              alt="Logo"
              width={19.17}
              height={20.87}
            />
          </div>
        </div>

        {/* Welcome back text */}
        <div className="absolute left-[57.85px] top-[134.18px] text-black text-[21.47px] font-normal font-['Imprima']">
          Welcome back
        </div>

        {/* Email Input */}
        <div className=" absolute top-[200.97px] w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
          <span className="p-float-label">
            <InputText
              id="email"
              name="email"
              value={loginData.email}
              onChange={handleLoginChange}
              className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
            />
            <label htmlFor="email" className="text-[15.47px]">
              Email
            </label>
          </span>
        </div>

        {/* Password Input */}
        <div className=" absolute top-[267.99px] w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
          <span className="p-float-label">
            <InputText
              id="password"
              name="password"
              value={loginData.password}
              type="password"
              onChange={handleLoginChange}
              className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
            />
            <label htmlFor="password" className="text-[15.47px]">
              Password
            </label>
          </span>
        </div>

        {/* Forgot Password Link */}
        <Link
          href="/resetpassword"
          className="absolute left-[1.19px] top-[327.39px] text-black text-[19.08px] font-normal font-['Imprima']"
        >
          Forgot password?
        </Link>

        {/* Continue Button */}
        <div
          className="absolute top-[402.53px] w-[260.01px] h-[47.11px] bg-[#3f9758] rounded-md border border-[#201c1c]"
          onClick={handleSubmit}
        ></div>
        <div className="absolute left-[88.26px] top-[413.86px] text-black text-[21.47px] font-normal">
          Continue
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
