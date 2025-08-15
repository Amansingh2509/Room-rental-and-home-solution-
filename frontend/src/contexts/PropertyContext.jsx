import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};

export const PropertyProvider = ({ children }) => {
  const { user } = useAuth();
  const [properties, setProperties] = useState([]);

  const fetchAllProperties = async () => {
    try {
      const response = await axios.get("/api/properties");
      setProperties(response.data);
    } catch (error) {
      console.error("Failed to fetch properties", error);
    }
  };

  const fetchOwnerProperties = async (ownerId) => {
    try {
      const response = await axios.get(`/api/properties/owner/${ownerId}`);
      setProperties(response.data);
    } catch (error) {
      console.error("Failed to fetch owner properties", error);
    }
  };

  useEffect(() => {
    if (user?.userType === "Property Owner") {
      fetchOwnerProperties(user.id);
    } else {
      fetchAllProperties();
    }
  }, [user]);

  const addProperty = async (propertyData) => {
    try {
      const token = user?.token; // Assuming token is stored in user object
      const response = await axios.post("/api/properties", propertyData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        withCredentials: true,
      });
      setProperties((prevProperties) => [...prevProperties, response.data]);
      return response.data;
    } catch (error) {
      console.error("Failed to add property", error);
      throw error;
    }
  };

  const value = {
    properties,
    addProperty,
    fetchAllProperties,
    fetchOwnerProperties,
  };

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
