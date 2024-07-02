import app from '../server';
import request from 'supertest';
import { expect } from 'chai';

describe('POST /users', () => {
  it('should create a new user', async () => {
    const userData = { username: 'testuser', email: 'testuser@example.com' };
    const res = await request(app)
      .post('/users')
      .send(userData);
    expect(res.status).to.equal(200); // Adjust status code as needed
    expect(res.body).to.have.property('id').that.is.a('string'); // Adjust response properties as needed
  });
});

describe('GET /connect', () => {
  it('should establish connection', async () => {
    const res = await request(app)
      .get('/connect');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message').that.equals('Connected');
  });
});

describe('GET /disconnect', () => {
  it('should disconnect', async () => {
    const res = await request(app)
      .get('/disconnect');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message').that.equals('Disconnected');
  });
});

describe('GET /users/me', () => {
  it('should return user profile', async () => {
    const res = await request(app)
      .get('/users/me');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('username').that.is.a('string');
    expect(res.body).to.have.property('email').that.is.a('string');
  });
});
