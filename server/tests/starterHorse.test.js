const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const StarterHorse = require("../models/StarterHorses");

describe("StarterHorse API Tests", () => {
  let starterHorseId;

  beforeEach(async () => {
    // Clear collection before each test to avoid duplicates
    await StarterHorse.deleteMany({});

    // Seed a starter horse
    const starter = new StarterHorse({
      name: "Thunder",
      breed: "Arabian",
      age: 5,
      gender: "male",
      stats: { speed: 80, stamina: 75, agility: 70 },
      traits: {
        coatColor: "brown",
        markings: "star",
      },
      description: "A strong Arabian horse.",
    });
    const saved = await starter.save();
    starterHorseId = saved._id.toString();
  });

  test("GET /api/starterhorses/:id - returns starter horse by ID", async () => {
    const res = await request(app).get(`/api/starterhorses/${starterHorseId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe("Thunder");
    expect(res.body.breed).toBe("Arabian");
  });
});
