import app from '../server';
import request from 'supertest';
import { expect } from 'chai';

describe('POST /files', () => {
  it('should upload a new file', async () => {
    const fileData = { filename: 'testfile.txt', size: 1024, type: 'text/plain' };
    const res = await request(app)
      .post('/files')
      .send(fileData);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('id').that.is.a('string');
  });
});

describe('GET /files/:id', () => {
  it('should return details of a file by ID', async () => {
    // Assuming 'testfileId' is a valid file ID in your system
    const fileId = 'testfileId';
    const res = await request(app)
      .get(`/files/${fileId}`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('filename').that.is.a('string');
    expect(res.body).to.have.property('size').that.is.a('number');
  });
});

describe('GET /files', () => {
  it('should return paginated list of files', async () => {
    const page = 1; // Adjust page number as needed
    const res = await request(app)
      .get('/files')
      .query({ page });
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('files').that.is.an('array');
    expect(res.body).to.have.property('currentPage').that.is.a('number');
  });
});

describe('PUT /files/:id/publish', () => {
  it('should publish a file by ID', async () => {
    // Assuming 'testfileId' is a valid file ID in your system
    const fileId = 'testfileId';
    const res = await request(app)
      .put(`/files/${fileId}/publish`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message').that.equals('File published successfully');
  });
});

describe('PUT /files/:id/unpublish', () => {
  it('should unpublish a file by ID', async () => {
    // Assuming 'testfileId' is a valid file ID in your system
    const fileId = 'testfileId';
    const res = await request(app)
      .put(`/files/${fileId}/unpublish`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('message').that.equals('File unpublished successfully');
  });
});

describe('GET /files/:id/data', () => {
  it('should return data of a file by ID', async () => {
    // Assuming 'testfileId' is a valid file ID in your system
    const fileId = 'testfileId';
    const res = await request(app)
      .get(`/files/${fileId}/data`);
    expect(res.status).to.equal(200);
    expect(res.body).to.have.property('data').that.is.a('string');
  });
});
