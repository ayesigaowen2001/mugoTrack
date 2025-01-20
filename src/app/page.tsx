// import Home from "../pages/index/page";
// import Dashboard from "../pages/dashboard/page";
// import NavBar from "./components/navbar";
// import { useRouter } from "next/router";
// import Signup from "../pages/signup/page";
// import LoginPage from "../pages/login/page";
// export default function Page() {
//   return <Home />;
// }
"use client"

import Home from "../pages/index/page";
import Dashboard from "../pages/dashboard/page";
import NavBar from "./components/navbar";
import Signup from "../pages/signup/page";
import LoginPage from "../pages/login/page";
import {  AnimalProvider } from "./components/customerResourcesContext";  // Import the context provider

export default function Page() {
  return (
   
    
      <Home />
  
  );
}
