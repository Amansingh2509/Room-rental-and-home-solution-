const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// Configuration
const BASE_URL = "http://localhost:5002";

// Create test images directory if it doesn't exist
const testImagesDir = "./test_images";
if (!fs.existsSync(testImagesDir)) {
  fs.mkdirSync(testImagesDir);
  console.log("📁 Created test_images directory");
}

// Use existing PNG test images
const getTestImages = () => {
  const images = [];

  // Use 3 test image files
  for (let i = 1; i <= 3; i++) {
    const imagePath = path.join(testImagesDir, `property_image_${i}.png`);
    if (fs.existsSync(imagePath)) {
      images.push(imagePath);
      console.log(`📸 Using test image: ${imagePath}`);
    } else {
      console.error(`❌ Test image not found: ${imagePath}`);
    }
  }

  // Use QR payment screenshot
  const qrImagePath = path.join(testImagesDir, "qr_payment_screenshot.png");
  if (fs.existsSync(qrImagePath)) {
    images.push(qrImagePath);
    console.log(`💳 Using QR payment screenshot: ${qrImagePath}`);
  } else {
    console.error(`❌ QR payment screenshot not found: ${qrImagePath}`);
  }

  return images;
};

// Test property creation with file uploads (without auth)
const testPropertyCreationNoAuth = async () => {
  console.log("🚀 Testing property creation WITHOUT authentication...");
  console.log("=".repeat(60));

  try {
    // Get test images
    const testImages = getTestImages();
    const [image1, image2, image3, qrScreenshot] = testImages;

    // Create FormData with all fields
    const formData = new FormData();

    // Basic property information
    formData.append("title", "Test Property - No Auth Test");
    formData.append(
      "description",
      "Test property created without authentication for testing purposes"
    );
    formData.append("type", "Flat");
    formData.append("location", "123 Test Street, Test City");
    formData.append("price", "15000");
    formData.append("bedrooms", "2");
    formData.append("bathrooms", "1");
    formData.append("area", "800");
    formData.append("areaUnit", "sqft");
    formData.append("furnished", "Semi-Furnished");
    formData.append("parking", "Available");
    formData.append("parkingType", "Open Parking");

    // Owner contact information
    formData.append("ownerName", "Test Owner");
    formData.append("ownerPhone", "+91 9876543210");
    formData.append("ownerEmail", "test@owner.com");
    formData.append("ownerAlternatePhone", "+91 9876543211");
    formData.append("ownerAddress", "456 Owner Street, Owner City");

    // Property specifications
    formData.append("roomType", "2BHK");
    formData.append("propertyAge", "1-5 years");
    formData.append("floorNumber", "2");
    formData.append("totalFloors", "5");
    formData.append("facingDirection", "East");

    // Utility details
    formData.append("waterSupply", "Morning Only");
    formData.append("electricity", "24x7");

    // Availability
    formData.append("availableFrom", "2024-01-15");

    // Amenities
    formData.append(
      "amenities",
      JSON.stringify(["WiFi", "Parking", "Security"])
    );

    // Security deposit information
    formData.append("securityDeposit", "4500");
    formData.append("maintenanceCharges", "1200");
    formData.append("securityDepositPaid", "true");
    formData.append("securityDepositAmount", "4500");
    formData.append(
      "securityDepositOptions",
      JSON.stringify({
        case1: 4500, // 30% of rent
        case2: 15000, // 1 month rent
        case3: 30000, // 2 months rent
        case4: 45000, // 3 months rent
        case5: 30000, // Fixed amount for Flat type
      })
    );

    // Add property images
    formData.append("images", fs.createReadStream(image1));
    formData.append("images", fs.createReadStream(image2));
    formData.append("images", fs.createReadStream(image3));

    // Add QR payment screenshot
    formData.append("qrPaymentScreenshot", fs.createReadStream(qrScreenshot));

    console.log(
      "📤 Sending property creation request without authentication..."
    );

    // Make the API request to the test endpoint without auth header
    const response = await axios.post(
      `${BASE_URL}/api/properties/test`,
      formData,
      {
        headers: {
          "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    console.log("✅ SUCCESS: Property created successfully!");
    console.log("📊 Response Status:", response.status);
    console.log("🆔 Property ID:", response.data._id);
    console.log("📝 Property Title:", response.data.title);

    return response.data;
  } catch (error) {
    console.error("❌ ERROR: Property creation failed");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
    return null;
  }
};

// Test property retrieval (this doesn't require auth)
const testPropertyRetrieval = async (propertyId) => {
  console.log("\n" + "=".repeat(60));
  console.log("🧪 Testing property retrieval...");

  try {
    const response = await axios.get(
      `${BASE_URL}/api/properties/${propertyId}`
    );
    console.log("✅ Property retrieved successfully");
    console.log("📊 Property data:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Property retrieval failed:", error.message);
    return null;
  }
};

// Main test function
const runTest = async () => {
  console.log("🏠 PROPERTY CREATION TEST (No Auth)");
  console.log("=".repeat(60));

  try {
    // Test property creation
    const createdProperty = await testPropertyCreationNoAuth();

    if (createdProperty) {
      // Test property retrieval
      await testPropertyRetrieval(createdProperty._id);

      console.log("\n" + "=".repeat(60));
      console.log("🎉 TEST COMPLETED!");
      console.log("✅ Property creation with all fields - SUCCESS");
      console.log("✅ File upload (images + QR) - SUCCESS");
    } else {
      console.log("\n💥 TEST FAILED - Authentication required");
      console.log("ℹ️  The property creation endpoint requires authentication");
      console.log("ℹ️  Please use a valid JWT token for testing");
    }
  } catch (error) {
    console.error("\n💥 TEST SUITE FAILED");
    console.error(error);
  }
};

// Run the test
runTest().catch(console.error);
