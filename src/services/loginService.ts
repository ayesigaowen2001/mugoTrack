import React, { useEffect, useState,useContext } from "react";
import axios from "axios";
import { AnimalContext } from "../app/components/customerResourcesContext";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface LoginData {
  email: string;
  password: string;
}

interface LoginProps {
  loginData: LoginData;
  onSuccess: (data: { loginData: any; customerResources: any }) => void;
 onError: (error: any) => void;
}

const Login: React.FC<LoginProps> = ({ loginData, onSuccess, onError }) => {
  const { setAnimalData } = useContext(AnimalContext);
  useEffect(() => {
    const performLogin = async () => {
      try {
        const response = await axios.post(`${API_BASE_URL}/customers/login`, loginData);

        if (response.status === 200) {
          const sessionToken = response.data.access_token;
          const customerId = response.data.customer_id;

          const resourcesResponse = await axios.get(`${API_BASE_URL}/customer-resources/${customerId}`, {
            headers: {
              token: sessionToken,
              customer_id: customerId,
            },
          });

          if (resourcesResponse.status === 200) {
            setAnimalData(resourcesResponse.data);
            onSuccess({
              loginData: response.data,
              customerResources: resourcesResponse.data,
              
            });
          } else {
            throw new Error("Failed to retrieve customer resources.");
          }
        } else {
          throw new Error("Login failed.");
        }
      } catch (error) {
        console.error("Login error:", error);
        onError(error);
      }
    };

    performLogin();
  }, [loginData, onSuccess,  setAnimalData, onError]); // Dependencies

  return null; // No UI component rendered
};

export default Login;