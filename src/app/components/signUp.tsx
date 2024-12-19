"use client";
import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import signUp from "@/src/services/signinService";

const SignUpPage: React.FC = () => {
  // const [email, setEmail] = useState("");
  // const [first_name, setfirst_name] = useState("");
  // const [last_name, setlast_name] = useState("");
  // const [username, setusername] = useState("");
  // const [num_animals, setnum_animals] = useState<string>("");
  // const [password, setPassword] = useState("");
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signinData, setsigninData] = useState({ email: "", password: "", num_animals: "", username: "",  last_name: "", first_name: "" });
  useEffect(() => {
    // Set to true once the component is mounted
    setIsMounted(true);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setsigninData({ ...signinData, [name]: value });
  };

  const handleSubmit = async () => {
    const { first_name, last_name, username, email, num_animals, password } = signinData;

    if (!first_name || !last_name || !username || !email || !num_animals || !password) {
      alert("Please fill in all fields.");
      return;
    }

    setLoading(true); // Start loading

    try {
      const data = await signUp(signinData); // Call signup service
      console.log("Signup successful:", data);
      router.push("login/page"); // Navigate to dashboard on success
    } catch (err) {
      setError(err as string); // Set error message on failure
      console.error("Signup failed:", err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (!isMounted) return null; // Prevent server-side rendering

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
                  id="first_name"
                  type="text"
                  value={signinData.first_name}
                  name="first_name"
                  onChange={handleInputChange}
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
                  id="last_name"
                   name ="last_name"
                   type="text"
                  value={signinData.last_name}
                  onChange={handleInputChange}
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
                  type = "text"
                  name ="username"
                  value={signinData.username}
                  // type="password"
                  onChange={handleInputChange}
                  className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
                />
                <label htmlFor="name" className="text-[15.47px]">
                  username
                </label>
              </span>
            </div>
            <div className="  ml-4 w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
              <span className="p-float-label">
                <InputText
                  id="num_animals"
                  name ="num_animals"
                  value={signinData.num_animals}
                  type="number"
                  onChange={handleInputChange}
                  className="w-[260.01px] h-[47.11px]  px-4 bg-white rounded-md border border-[#201c1c] focus:outline-none text-black text-[15.47px]"
                />
                <label htmlFor="num_animals" className="text-[15.47px]">
                  num_animals
                </label>
              </span>
            </div>
          </div>
          <div className="flex flex-row absolute top-[290.97px]">
            <div className="  w-[260.01px] h-[47.11px] bg-white rounded-md border border-[#201c1c">
              <span className="p-float-label">
                <InputText
                  id="email"
                  name = "email"
                  value={signinData.email}
                  // type="password"
                  onChange={handleInputChange}
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
                  name="password"
                  value={signinData.password}
                  type="password"
                  onChange={handleInputChange}
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
          onClick={handleSubmit}
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
