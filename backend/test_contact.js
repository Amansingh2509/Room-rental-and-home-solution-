const mongoose = require("mongoose");
const Contact = require("./modules/contact");

const mongoUri =
  process.env.MONGO_URI ||
  "mongodb+srv://2203031050640:asdfghjkl@cluster0.2llhzuj.mongodb.net/database";

async function testContact() {
  try {
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Test query to get all contact submissions
    const contacts = await Contact.find();
    console.log("Contact submissions in database:");
    console.log(contacts);

    // Count total submissions
    const count = await Contact.countDocuments();
    console.log(`Total contact submissions: ${count}`);

    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Error:", error);
  }
}

testContact();
