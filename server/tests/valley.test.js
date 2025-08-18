const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

let token, userId;

beforeEach(async () => {
  // Create a fresh user before each test
  const user = await User.create({
    username: 'testuser',
    email: 'test@valley.com',
    password: 'hashedpassword'
  });
  userId = user._id;
  token = jwt.sign({ userId: userId }, process.env.JWT_SECRET || 'testsecret');
});

describe('Valley API', () => {
  it('should get valley state', async () => {
    const res = await request(app)
      .get('/api/valley')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('cleanliness');
    expect(res.body).toHaveProperty('infrastructureLevel');
    expect(res.body).toHaveProperty('economyHealth');
  });

  it('should update valley state', async () => {
    const updates = {
      cleanliness: 5,
      infrastructureLevel: 2,
      economyHealth: 3,
      unlockedAreas: ['training_ring']
    };
    const res = await request(app)
      .put('/api/valley')
      .set('Authorization', `Bearer ${token}`)
      .send(updates);
    expect(res.statusCode).toBe(200);
    expect(res.body.cleanliness).toBe(5);
    expect(res.body.infrastructureLevel).toBe(2);
    expect(res.body.economyHealth).toBe(3);
    expect(res.body.unlockedAreas).toContain('training_ring');
  });
});