const axios = require("axios");

// Configuration
const BASE_URL = "http://localhost:5002";
const TEST_USER = {
  email: "test@example.com",
  password: "testpassword",
};

// Function to generate test token
const generateTestToken = async () => {
  try {
    console.log("🔑 Generating test authentication token...");

    // Try to login with test credentials
    const response = await axios.post(`${BASE_URL}/api/auth/login`, TEST_USER);

    if (response.data && response.data.token) {
      console.log("✅ Token generated successfully!");
      console.log("📋 Token:", response.data.token);
      console.log("👤 User:", response.data.user);
      return response.data.token;
    }
  } catch (error) {
    console.error(
      "❌ Failed to generate token:",
      error.response?.data || error.message
    );

    // If login fails, try to register first
    console.log("🔄 Attempting to register test user...");
    try {
      await axios.post(`${BASE_URL}/api/auth/register`, {
        ...TEST_USER,
        name: "Test User",
        userType: "owner",
      });
      console.log("✅ Test user registered successfully!");

      // Now try to login again
      const loginResponse = await axios.post(
        `${BASE_URL}/api/auth/login`,
        TEST_USER
      );
      console.log("✅ Token generated successfully!");
      console.log("📋 Token:", loginResponse.data.token);
      console.log("👤 User:", loginResponse.data.user);
      return loginResponse.data.token;
    } catch (registerError) {
      console.error(
        "❌ Failed to register test user:",
        registerError.response?.data || registerError.message
      );
      return null;
    }
  }
};

// Run the function
generateTestToken().then((token) => {
  if (token) {
    console.log("\n📝 To use this token in the comprehensive test:");
    console.log(
      `Replace AUTH_TOKEN in comprehensive_property_test.js with: ${token}`
    );
  } else {
    console.log("\n💥 Failed to generate test token");
  }
});
