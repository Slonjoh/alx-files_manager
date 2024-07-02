import app from '../server';
import request from 'supertest';
import { expect } from 'chai';

describe('GET /stats', () => {
  it('should return number of users and files', async () => {
    const res = await request(app).get('/stats');
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('users').that.is.a('number');
    expect(res.body).to.have.property('files').that.is.a('number');
  });
});
