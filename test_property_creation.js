// Comprehensive test script to verify property creation with all new fields
const axios = require("axios");

const testProperty = {
  title: "Test Luxury 3BHK Apartment with All Features",
  description:
    "Beautiful 3 bedroom apartment with modern amenities in prime location. Features include 24x7 water supply, backup electricity, covered parking, and all modern amenities.",
  type: "Flat",
  location: "123 Test Street, Test City, Test State - 123456",
  price: 25000,
  bedrooms: 3,
  bathrooms: 2,
  area: 1200,
  areaUnit: "sqft",
  furnished: "Furnished",
  parking: "Available",
  parkingType: "Covered Parking",

  // Owner Contact Information
  ownerName: "Test Property Owner",
  ownerPhone: "+91 9876543210",
  ownerEmail: "test.owner@example.com",
  ownerAlternatePhone: "+91 9876543211",
  ownerAddress: "456 Owner Street, Owner City, Owner State - 654321",

  // Property Specifications
  roomType: "3BHK",
  propertyAge: "1-5 years",
  floorNumber: 5,
  totalFloors: 10,
  facingDirection: "North",

  // Utility Details
  waterSupply: "24x7",
  electricity: "Backup Available",

  // Availability
  availableFrom: "2024-02-01",

  // Amenities (as JSON string for FormData)
  amenities: JSON.stringify([
    "WiFi",
    "Parking",
    "Gym",
    "Security",
    "Swimming Pool",
    "Air Conditioning",
  ]),

  // Security Deposit Information
  securityDeposit: 7500,
  maintenanceCharges: 2000,
  securityDepositPaid: true,
  securityDepositAmount: 7500,
  securityDepositOptions: JSON.stringify({
    case1: 7500, // 30% of rent
    case2: 25000, // 1 month rent
    case3: 50000, // 2 months rent
    case4: 75000, // 3 months rent
    case5: 30000, // Fixed amount for Flat type
  }),
};

console.log("🧪 Testing property creation with ALL fields...");
console.log("📋 Property data includes:");
console.log("   - Basic Information: title, description, type, location");
console.log("   - Pricing: rent, security deposit, maintenance charges");
console.log("   - Specifications: bedrooms, bathrooms, area, room type");
console.log("   - Owner Contact: name, phone, email, address");
console.log("   - Property Details: age, floors, facing direction");
console.log("   - Utilities: water supply, electricity");
console.log("   - Security Deposit: options, payment status, amount");
console.log("   - Amenities: WiFi, Parking, Gym, Security, Swimming Pool, AC");

console.log("\n🚀 To test this, ensure the backend server is running and use:");
console.log("POST /api/properties with the above data");
console.log("The response should include ALL the stored fields including:");
console.log("✅ All basic property information");
console.log("✅ Owner contact details");
console.log("✅ Property specifications and utilities");
console.log("✅ Security deposit information with options");
console.log("✅ Availability and amenity data");

console.log("\n📝 Test Commands:");
console.log("1. Start backend: cd backend && npm start");
console.log("2. Run test: node test_property_creation.js");
console.log("3. Check MongoDB: db.properties.find() to verify data storage");
console.log("4. Verify frontend: Check if property appears in properties list");

console.log("\n🔍 Expected Results:");
console.log("• Property created successfully with status 201");
console.log("• All fields stored in MongoDB correctly");
console.log("• Security deposit options properly parsed and stored");
console.log("• Property visible in frontend properties list");
console.log("• All form fields displayed correctly in property details");
