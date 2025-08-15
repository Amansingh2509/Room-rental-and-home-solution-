import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok && data.token) {
        const userData = {
          id: data.user._id,
          name: data.user.name,
          email: data.user.email,
          userType: data.user.userType,
          token: data.token,
        };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", data.token);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name, email, password, userType) => {
    try {
      console.log("Attempting registration with:", { name, email, userType });

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, userType }),
      });

      console.log("Registration response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        return {
          success: true,
          message: data.message || "Registration successful",
        };
      } else {
        let errorMessage = "Registration failed";
        try {
          const errorData = await response.json();
          errorMessage =
            errorData.message || `Registration failed: ${response.status}`;
        } catch (jsonError) {
          console.error("Failed to parse error response:", jsonError);
          errorMessage = `Server error: ${response.status} ${response.statusText}`;
        }

        console.error("Registration failed:", errorMessage);
        return { success: false, message: errorMessage };
      }
    } catch (error) {
      console.error("Registration network error:", error);

      // Handle different types of network errors
      let errorMessage = "Network error - please check your connection";

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage =
          "Cannot connect to server - please ensure the backend is running on port 5002";
      } else if (
        error.name === "TypeError" &&
        error.message.includes("Failed to fetch")
      ) {
        errorMessage =
          "Connection failed - please check if the server is running";
      } else if (error.message.includes("NetworkError")) {
        errorMessage = "Network error - please check your internet connection";
      }

      return { success: false, message: errorMessage };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const value = {
    user,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
