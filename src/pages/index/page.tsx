// pages/index.tsx
import React from "react";
import HomePage from "../../app/components/home";
import LoginPage from "../login/page";
import { useRouter } from "next/router";
import Signup from "../signup/page";

const Home: React.FC = () => {
  return (
     <div>
    <Signup/>
  </div>
   
  );
}

export default Home;
