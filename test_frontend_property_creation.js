const axios = require("axios");

// Configuration
const BASE_URL = "http://localhost:5002";
const FRONTEND_URL = "http://localhost:5175";

// Test user credentials
const TEST_USER = {
  email: "demo@gmail.com",
  password: "1234",
};

// Test property data
const TEST_PROPERTY = {
  title: "Test Property from Frontend",
  description: "A beautiful test property created via frontend simulation",
  type: "Flat",
  location: "Test Location, City",
  price: 15000,
  bedrooms: 3,
  bathrooms: 2,
  area: 1200,
  areaUnit: "sqft",
  amenities: ["WiFi", "Parking", "Air Conditioning"],
  ownerName: "Test Owner",
  ownerPhone: "9876543210",
  ownerEmail: "owner@example.com",
  availableFrom: new Date().toISOString(),
};

async function testFrontendPropertyCreation() {
  console.log("🧪 Testing Frontend Property Creation Flow...");

  try {
    // Step 1: Login to get a valid token
    console.log("🔑 Logging in...");
    const loginResponse = await axios.post(
      `${BASE_URL}/api/auth/login`,
      TEST_USER
    );

    if (!loginResponse.data.token) {
      throw new Error("Login failed: No token received");
    }

    const token = loginResponse.data.token;
    console.log("✅ Login successful");
    console.log("📋 Token:", token);

    // Step 2: Update localStorage with the new token (simulating frontend behavior)
    console.log("🔄 Updating localStorage with new token...");
    console.log(`Run this in browser console:
localStorage.setItem('token', '${token}');
const user = JSON.parse(localStorage.getItem('user') || '{}');
user.token = '${token}';
localStorage.setItem('user', JSON.stringify(user));
console.log('Token updated in localStorage');
    `);

    // Step 3: Test property creation with the valid token
    console.log("🏠 Testing property creation...");
    const propertyResponse = await axios.post(
      `${BASE_URL}/api/properties`,
      TEST_PROPERTY,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("✅ Property created successfully!");
    console.log("📋 Property Details:", {
      id: propertyResponse.data._id,
      title: propertyResponse.data.title,
      owner: propertyResponse.data.owner,
      status: propertyResponse.data.status,
    });

    // Step 4: Verify the property was actually created
    console.log("🔍 Verifying property in database...");
    const verifyResponse = await axios.get(
      `${BASE_URL}/api/properties/${propertyResponse.data._id}`
    );
    console.log("✅ Property verified in database!");
    console.log("📋 Full property data:", verifyResponse.data);

    return {
      success: true,
      property: propertyResponse.data,
      token: token,
    };
  } catch (error) {
    console.error("❌ Test failed:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.log("💡 Authentication error - token may be invalid or expired");
      console.log(
        "💡 Try running the token update script in the browser console"
      );
    }

    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
}

// Run the test
testFrontendPropertyCreation().then((result) => {
  if (result.success) {
    console.log("\n🎉 Frontend property creation test PASSED!");
    console.log("💡 Now try adding a property through the actual frontend UI");
    console.log("💡 Frontend URL: http://localhost:5175/");
  } else {
    console.log("\n💥 Frontend property creation test FAILED!");
  }
});
