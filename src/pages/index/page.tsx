// pages/index.tsx
import React from "react";
import HomePage from "../../app/components/home";
import LoginPage from "../login";
import { useRouter } from "next/router";
import Signup from "../signup";

const Home: React.FC = () => {
  return (
     <div>
    <HomePage/>
  </div>
   
  );
}

export default Home;
