const axios = require("axios");
const BASE_URL = "http://localhost:5000/api/properties"; // Adjust the port as necessary

const testInvalidPropertyCreation = async () => {
  try {
    // Test with missing required fields
    let response = await axios.post(BASE_URL, {});
    console.log("Test with missing fields response:", response.data);
  } catch (error) {
    console.error("Error with missing fields:", error.response.data);
  }

  try {
    // Test with invalid data types
    let response = await axios.post(BASE_URL, {
      title: 123, // Invalid type
      description: "A beautiful test property.",
      type: "Flat",
      location: "Test Location",
      price: "not_a_number", // Invalid type
      bedrooms: 2,
      bathrooms: 1,
      area: 1000,
      amenities: ["WiFi"],
    });
    console.log("Test with invalid data types response:", response.data);
  } catch (error) {
    console.error("Error with invalid data types:", error.response.data);
  }
};

testInvalidPropertyCreation();
