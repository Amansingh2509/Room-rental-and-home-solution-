const fs = require("fs");
const path = require("path");

// Create test images directory if it doesn't exist
const testImagesDir = "./test_images";
if (!fs.existsSync(testImagesDir)) {
  fs.mkdirSync(testImagesDir);
  console.log("📁 Created test_images directory");
}

// Simple 1x1 pixel PNG in base64
const tinyPNG =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==";

// Create test PNG files
const createTestImages = () => {
  const images = [];

  // Create 3 test image files
  for (let i = 1; i <= 3; i++) {
    const imagePath = path.join(testImagesDir, `property_image_${i}.png`);
    const buffer = Buffer.from(tinyPNG, "base64");
    fs.writeFileSync(imagePath, buffer);
    images.push(imagePath);
    console.log(`📸 Created test image: ${imagePath}`);
  }

  // Create QR payment screenshot
  const qrImagePath = path.join(testImagesDir, "qr_payment_screenshot.png");
  const buffer = Buffer.from(tinyPNG, "base64");
  fs.writeFileSync(qrImagePath, buffer);
  images.push(qrImagePath);
  console.log(`💳 Created QR payment screenshot: ${qrImagePath}`);

  return images;
};

createTestImages();
console.log("✅ All test images created successfully!");
