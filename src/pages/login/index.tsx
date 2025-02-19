"use client";

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import Link from "next/link";
import { AnimalContext } from "@/src/app/components/customerResourcesContext";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const LoginPage: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const { animalData, setAnimalData, setUserData, userData } =
    useContext(AnimalContext);
  const router = useRouter();

  useEffect(() => {
    console.log("Updated animalData:", animalData);
  }, [animalData]);
  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (userData.customer_id && userData.access_token) {
      const intervalId = setInterval(async () => {
        try {
          const resourcesResponse = await axios.get(
            `${API_BASE_URL}/customer-resources/${userData.customer_id}`,
            {
              headers: {
                token: userData.access_token,
                customer_id: userData.customer_id,
              },
            }
          );

          if (resourcesResponse.status === 200) {
            setAnimalData(resourcesResponse.data);
            console.log("Updated animalData:", resourcesResponse.data);
          } else {
            throw new Error("Failed to retrieve customer resources.");
          }
        } catch (error) {
          console.error("Error fetching customer resources:", error);
        }
      }, 30000); // 30 seconds

      return () => clearInterval(intervalId);
    }
  }, [userData, setAnimalData]);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const performLogin = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${API_BASE_URL}/customers/login`,
        loginData
      );
      if (response.status === 200) {
        const sessionToken = response.data.access_token;
        const customerId = response.data.customer_id;
        console.log(response.data);
        setUserData({
          customer_id: customerId,
          access_token: sessionToken,
        });
        const resourcesResponse = await axios.get(
          `${API_BASE_URL}/customer-resources/${customerId}`,
          {
            headers: {
              token: sessionToken,
              customer_id: customerId,
            },
          }
        );

        if (resourcesResponse.status === 200) {
          setAnimalData(resourcesResponse.data);
          console.log(resourcesResponse.data);
          router.push("/dashboard");
        } else {
          throw new Error("Failed to retrieve customer resources.");
        }
      } else {
        throw new Error("Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(true);
    }
  };

  const handleSubmit = () => {
    if (!loginData.email || !loginData.password) {
      alert("Please enter both email and password.");
      return;
    }
    performLogin();
  };
  console.log(animalData);
  if (!isMounted) return null; // Prevent rendering on the server

  return (
    <div
      className="w-[950px] h-[620.20px]  pt-[62.62px] pb-[29.95px] bg-white flex justify-center "
      style={{ marginLeft: "100px" }}
    >
      {loading && (
        <div
          className="absolute top-[144.18px] ml-44 w-[260.01px] h-2  animate-pulse z-50"
          style={{ background: "#8E6C2F" }}
        ></div>
      )}
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
