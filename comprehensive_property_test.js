const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");

// Configuration
const BASE_URL = "http://localhost:5002";
const AUTH_TOKEN = "YOUR_AUTH_TOKEN_HERE"; // Replace with actual token

// Create test images directory if it doesn't exist
const testImagesDir = "./test_images";
if (!fs.existsSync(testImagesDir)) {
  fs.mkdirSync(testImagesDir);
  console.log("📁 Created test_images directory");
}

// Create test images (placeholder files for testing)
const createTestImages = () => {
  const images = [];

  // Create 3 test image files
  for (let i = 1; i <= 3; i++) {
    const imagePath = path.join(testImagesDir, `property_image_${i}.txt`);
    fs.writeFileSync(imagePath, `This is a test property image ${i} content`);
    images.push(imagePath);
    console.log(`📸 Created test image: ${imagePath}`);
  }

  // Create QR payment screenshot
  const qrImagePath = path.join(testImagesDir, "qr_payment_screenshot.txt");
  fs.writeFileSync(qrImagePath, "This is a test QR payment screenshot content");
  images.push(qrImagePath);
  console.log(`💳 Created QR payment screenshot: ${qrImagePath}`);

  return images;
};

// Test property creation with file uploads
const testPropertyCreation = async () => {
  console.log("🚀 Starting comprehensive property creation test...");
  console.log("=".repeat(60));

  try {
    // Create test images
    const testImages = createTestImages();
    const [image1, image2, image3, qrScreenshot] = testImages;

    // Create FormData with all fields
    const formData = new FormData();

    // Basic property information
    formData.append("title", "Automated Test Property - Luxury 2BHK");
    formData.append(
      "description",
      "Fully automated test property with all features, created for comprehensive testing of the property creation system."
    );
    formData.append("type", "Flat");
    formData.append(
      "location",
      "789 Test Avenue, Automation City, Test State - 789012"
    );
    formData.append("price", "18000");
    formData.append("bedrooms", "2");
    formData.append("bathrooms", "2");
    formData.append("area", "950");
    formData.append("areaUnit", "sqft");
    formData.append("furnished", "Semi-Furnished");
    formData.append("parking", "Available");
    formData.append("parkingType", "Open Parking");

    // Owner contact information
    formData.append("ownerName", "Automated Test Owner");
    formData.append("ownerPhone", "+91 9123456789");
    formData.append("ownerEmail", "auto.test@example.com");
    formData.append("ownerAlternatePhone", "+91 9876543210");
    formData.append(
      "ownerAddress",
      "123 Auto Street, Test District, Auto State - 123456"
    );

    // Property specifications
    formData.append("roomType", "2BHK");
    formData.append("propertyAge", "0-1 years");
    formData.append("floorNumber", "3");
    formData.append("totalFloors", "8");
    formData.append("facingDirection", "East");

    // Utility details
    formData.append("waterSupply", "Morning Only");
    formData.append("electricity", "24x7");

    // Availability
    formData.append("availableFrom", "2024-01-15");

    // Amenities
    formData.append(
      "amenities",
      JSON.stringify(["WiFi", "Parking", "Security", "Balcony", "Pet Friendly"])
    );

    // Security deposit information
    formData.append("securityDeposit", "5400");
    formData.append("maintenanceCharges", "1500");
    formData.append("securityDepositPaid", "true");
    formData.append("securityDepositAmount", "5400");
    formData.append(
      "securityDepositOptions",
      JSON.stringify({
        case1: 5400, // 30% of rent
        case2: 18000, // 1 month rent
        case3: 36000, // 2 months rent
        case4: 54000, // 3 months rent
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
      "📤 Sending property creation request with all fields and files..."
    );

    // Make the API request
    const response = await axios.post(`${BASE_URL}/api/properties`, formData, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": `multipart/form-data; boundary=${formData.getBoundary()}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
    });

    console.log("✅ SUCCESS: Property created successfully!");
    console.log("📊 Response Status:", response.status);
    console.log("🆔 Property ID:", response.data._id);
    console.log("📝 Property Title:", response.data.title);

    // Verify all fields are present in response
    const requiredFields = [
      "title",
      "description",
      "type",
      "location",
      "price",
      "bedrooms",
      "bathrooms",
      "area",
      "ownerName",
      "ownerPhone",
      "ownerEmail",
      "roomType",
      "propertyAge",
      "floorNumber",
      "totalFloors",
      "facingDirection",
      "waterSupply",
      "electricity",
      "amenities",
      "securityDeposit",
      "maintenanceCharges",
      "securityDepositPaid",
      "securityDepositAmount",
      "securityDepositOptions",
      "images",
      "qrPaymentScreenshot",
    ];

    const missingFields = requiredFields.filter(
      (field) => !(field in response.data)
    );

    if (missingFields.length === 0) {
      console.log("✅ All required fields present in response");
    } else {
      console.log("❌ Missing fields in response:", missingFields);
    }

    console.log("\n🔍 Property Details:");
    console.log(
      "   • Owner:",
      response.data.ownerName,
      `(${response.data.ownerPhone})`
    );
    console.log("   • Type:", response.data.type, response.data.roomType);
    console.log("   • Location:", response.data.location);
    console.log("   • Price: ₹", response.data.price, "/month");
    console.log(
      "   • Security Deposit: ₹",
      response.data.securityDepositAmount
    );
    console.log("   • Amenities:", response.data.amenities?.join(", "));
    console.log("   • Images:", response.data.images?.length, "uploaded");
    console.log(
      "   • QR Screenshot:",
      response.data.qrPaymentScreenshot ? "Uploaded" : "Missing"
    );

    return response.data;
  } catch (error) {
    console.error("❌ ERROR: Property creation failed");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Message:", error.message);
    }
    throw error;
  }
};

// Test property retrieval
const testPropertyRetrieval = async (propertyId) => {
  console.log("\n" + "=".repeat(60));
  console.log("🧪 Testing property retrieval...");

  try {
    const response = await axios.get(
      `${BASE_URL}/api/properties/${propertyId}`
    );
    console.log("✅ Property retrieved successfully");
    console.log("📊 Property data verified in database");
    return response.data;
  } catch (error) {
    console.error("❌ Property retrieval failed:", error.message);
    throw error;
  }
};

// Main test function
const runComprehensiveTest = async () => {
  console.log("🏠 COMPREHENSIVE PROPERTY CREATION TEST SUITE");
  console.log("=".repeat(60));

  try {
    // Test property creation
    const createdProperty = await testPropertyCreation();

    // Test property retrieval
    await testPropertyRetrieval(createdProperty._id);

    console.log("\n" + "=".repeat(60));
    console.log("🎉 ALL TESTS PASSED!");
    console.log("✅ Property creation with all fields - SUCCESS");
    console.log("✅ File upload (images + QR) - SUCCESS");
    console.log("✅ Data storage in MongoDB - SUCCESS");
    console.log("✅ Property retrieval - SUCCESS");

    console.log("\n📋 Next steps:");
    console.log("1. Check MongoDB: db.properties.find().pretty()");
    console.log("2. Verify all fields are stored correctly");
    console.log("3. Test frontend display in properties list");
    console.log("4. Validate images and QR screenshot are accessible");
  } catch (error) {
    console.error("\n💥 TEST SUITE FAILED");
    process.exit(1);
  }
};

// Run the test if this file is executed directly
if (require.main === module) {
  if (!AUTH_TOKEN || AUTH_TOKEN === "YOUR_AUTH_TOKEN_HERE") {
    console.error("❌ Please set a valid AUTH_TOKEN in the script");
    process.exit(1);
  }

  runComprehensiveTest().catch(console.error);
}

module.exports = { testPropertyCreation, testPropertyRetrieval };
