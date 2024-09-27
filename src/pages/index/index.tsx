// pages/index.tsx
import React from "react";
import HomePage from "../../app/components/home";
import LoginPage from "../login/login";
const Home: React.FC = () => {
  return (
    <div>
      <LoginPage />
    </div>
  );
};

export default Home;
