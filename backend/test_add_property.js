const axios = require("axios");

const addProperty = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5002/api/properties",
      {
        title: "Test Property",
        description: "A beautiful test property.",
        type: "Flat",
        location: "Test Location",
        price: 10000,
        bedrooms: 2,
        bathrooms: 1,
        area: 1000,
        areaUnit: "sqft",
        amenities: ["WiFi", "Parking"],
        ownerName: "Test Owner",
        ownerPhone: "1234567890",
        ownerEmail: "owner@example.com",
        availableFrom: new Date().toISOString(),
      },
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ODQ4YzUzMGEyMmEyY2UwMGNjY2RjNyIsImlhdCI6MTc1NjExNTU2OCwiZXhwIjoxNzU2MjAxOTY4fQ.MvFURZONElGateY9DNAelvfGGlGYkY2HrKhN032-Na8", // Updated with valid token
        },
      }
    );

    console.log("Property added successfully:", response.data);
  } catch (error) {
    console.error(
      "Error adding property:",
      error.response ? error.response.data : error.message
    );
  }
};

addProperty();
