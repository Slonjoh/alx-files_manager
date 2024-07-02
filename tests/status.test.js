import app from '../server';
import request from 'supertest';
import { expect } from 'chai';

describe('GET /status', () => {
  it('should return status of Redis and MongoDB', async () => {
    const res = await request(app).get('/status');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('redis').that.is.a('boolean');
    expect(res.body).to.have.property('db').that.is.a('boolean');
  });
});
