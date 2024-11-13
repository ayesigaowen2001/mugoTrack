"use client";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SignUpPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [Animals, setAnimals] = useState<string>("");
  const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Set to true once the component is mounted
    setIsMounted(true);
  }, []);

  const handleLogin = () => {
    if (email && password && FirstName && LastName && userName && Animals) {
      // Proceed with the login only if the component is mounted (client-side)
      if (isMounted) {
        router.push("/dashboard/page");
      }
    } else {
      alert("Please enter all fields");
    }
  };

  if (!isMounted) return null; // Prevent rendering on the server

  return (
    <div className="w-[950px] h-[620.20px] px-[160px] pt-[10.62px] pb-[29.95px] bg-white flex justify-center items-center ">
      <div className="w-[560.01px] h-[527.63px] relative ml-56">
        {/* Logo */}
        <div className="w-[58.44px] h-[44.78px] absolute left-[70.71px] ">
          <div
            style={{
              height: "30.95px",
              width: "46px",
              background: "#8E6C2F",
              marginLeft: "170px",
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
        <div className="absolute w-full left-[170.85px] top-[80.18px] text-black text-[21.47px] font-normal font-['Imprima']">
          Create your account
        </div>

        {/* Email Input */}
        <div className="flex flex-col ">
          <div className="flex flex-row absolute top-[130.97px]">
            <div className="    w-[260.01px]  h-[47.11px] bg-white rounded-md border border-[#201c1c">
              <span className="p-float-label">
                <InputText
                  id="First name"
                  value={FirstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
                />
                <label htmlFor="name" className="text-[15.47px]">
                  First name
                </label>
              </span>
            </div>
            <div className="  w-[260.01px] ml-4 h-[47.11px] bg-white rounded-md border border-[#201c1c">
              <span className="p-float-label">
                <InputText
                  id="Last name"
                  value={LastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
                />
                <label htmlFor="email" className="text-[15.47px]">
                  Last name
                </label>
              </span>
            </div>
          </div>
          {/* Password Input */}
          <div className="flex flex-row absolute top-[210.97px] ">
            <div className="  w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
              <span className="p-float-label">
                <InputText
                  id="username"
                  value={userName}
                  // type="password"
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
                />
                <label htmlFor="name" className="text-[15.47px]">
                  Username
                </label>
              </span>
            </div>
            <div className="  ml-4 w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
              <span className="p-float-label">
                <InputText
                  id="animals"
                  value={Animals}
                  type="number"
                  onChange={(e) => setAnimals(e.target.value)}
                  className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
                />
                <label htmlFor="animals" className="text-[15.47px]">
                  Animals
                </label>
              </span>
            </div>
          </div>
          <div className="flex flex-row absolute top-[290.97px]">
            <div className="  w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
              <span className="p-float-label">
                <InputText
                  id="email"
                  value={email}
                  // type="password"
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
                />
                <label htmlFor="email" className="text-[15.47px]">
                  Email
                </label>
              </span>
            </div>
            <div className="  ml-4 w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
              <span className="p-float-label">
                <InputText
                  id="password"
                  value={password}
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
                />
                <label htmlFor="password" className="text-[15.47px]">
                  password
                </label>
              </span>
            </div>
          </div>
        </div>

        {/* Already has an account*/}
        <div className="flex flex-row absolute top-[457.39px] w-full ml-36">
          <h4 className="text-[19.08px] font-normal font-['Imprima']">
            Already have an account?
          </h4>
          <Link
            href="/login/page"
            className=" left-[1.19px]  text-green-800 text-[19.08px] font-normal font-['Imprima']"
          >
            Log in
          </Link>
        </div>

        {/* Continue Button */}
        <div
          className="absolute left-[150.26px] top-[360.53px] w-[260.01px] h-[47.11px] bg-[#3f9758] rounded-md border border-[#201c1c]"
          onClick={handleLogin}
        >
          <h5 className="absolute   px-20 pt-2 text-black text-[21.47px] font-normal">
            Continue
          </h5>
        </div>
        {/* Terms of use and privacy policy  */}
        <div className="flex flex-row absolute top-[507.39px] w-full ml-56">
          {/* <h4 className="text-[19.08px] font-normal font-['Imprima']">
            Already have an account?
          </h4> */}
          <Link
            href="#"
            className=" left-[1.19px]  text-black  text-[8.51px] underline font-normal font-['Imprima']"
          >
            Terms of use
          </Link>
          <span className="px-2  text-[8.51px]">|</span>
          <Link
            href="#"
            className=" left-[1.19px]  text-black  text-[8.51px] underline font-normal font-['Imprima']"
          >
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
