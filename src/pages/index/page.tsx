// pages/index.tsx
import React from "react";
import HomePage from "../../app/components/home";
import LoginPage from "../login/page";
import { useRouter } from "next/router";

const Home: React.FC = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Home;
