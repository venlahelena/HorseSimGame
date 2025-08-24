const path = require("path");
const dotenv = require("dotenv");
const bcrypt = require('bcrypt');
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const mongoose = require("mongoose");
const User = require("../models/User");
const StarterHorse = require("../models/StarterHorse");

console.log("Loaded DB_URI:", process.env.DB_URI);

const seed = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to DB");

    // Clear collections
    await User.deleteMany();
    await mongoose.connection.collection("horses").deleteMany({});
    await StarterHorse.deleteMany(); // clear starter horses collection

    // Create a test user (optional)
    const hashedPassword = await bcrypt.hash("password", 10);
    await User.create({
      username: "testuser",
      email: "test@example.com",
      password: hashedPassword,
    });

    // Seed starter horses
    const starterHorses = [
      {
        name: "Thunder",
        breed: "Arabian",
        age: 4,
        gender: "stallion",
        stats: { speed: 85, stamina: 70, agility: 75 },
        traits: { coatColor: "gray", markings: "blaze" },
        description: "A fast and graceful Arabian stallion.",
      },
      {
        name: "Bella",
        breed: "Arabian",
        age: 3,
        gender: "mare",
        stats: { speed: 80, stamina: 75, agility: 70 },
        traits: { coatColor: "bay", markings: "star" },
        description: "A gentle Arabian mare with stamina.",
      },
      {
        name: "Shadow",
        breed: "Arabian",
        age: 5,
        gender: "gelding",
        stats: { speed: 78, stamina: 68, agility: 72 },
        traits: { coatColor: "black", markings: "none" },
        description: "A reliable Arabian gelding.",
      },
      {
        name: "Storm",
        breed: "Mustang",
        age: 4,
        gender: "stallion",
        stats: { speed: 80, stamina: 75, agility: 70 },
        traits: { coatColor: "brown", markings: "stripe" },
        description: "A strong Mustang stallion.",
      },
      {
        name: "Luna",
        breed: "Mustang",
        age: 3,
        gender: "mare",
        stats: { speed: 78, stamina: 72, agility: 68 },
        traits: { coatColor: "palomino", markings: "spot" },
        description: "A swift Mustang mare.",
      },
      {
        name: "Dusty",
        breed: "Mustang",
        age: 5,
        gender: "gelding",
        stats: { speed: 75, stamina: 70, agility: 65 },
        traits: { coatColor: "gray", markings: "snip" },
        description: "A dependable Mustang gelding.",
      },
    ];

    await StarterHorse.insertMany(starterHorses);
    console.log("Starter horses seeded!");

    console.log("Database seeded! No horses created.");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
};

seed();
