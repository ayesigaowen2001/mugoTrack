// "use client";

// import React, { useContext } from "react";
// import { AnimalContext } from "./customerResourcesContext";
// import Login from "@/src/services/loginService";

// const LoginComponent = () => {
//   const { setAnimalData } = useContext(AnimalContext);

//   const handleLogin = async () => {
//     const loginData = { email: "test@example.com", password: "password123" };
//     try {
//       await Login(loginData, setAnimalData); // Pass setAnimalData here
//       console.log("Login successful!");
//     } catch (error) {
//       console.error("Error during login:", error);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };

// export default LoginComponent;
