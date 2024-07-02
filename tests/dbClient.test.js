const { MongoMemoryServer } = require('mongodb-memory-server');
const { MongoClient } = require('mongodb');
const dbClient = require('../utils/dbClient');

describe('Database Client', () => {
  let mongoServer;
  let client;

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getUri();
    client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    dbClient.setClient(client);
  });

  afterAll(async () => {
    await client.close();
    await mongoServer.stop();
  });

  it('should insert and retrieve data from MongoDB', async () => {
    const db = client.db();
    const usersCollection = db.collection('users');
    const mockUser = { username: 'testUser', email: 'test@example.com' };

    await usersCollection.insertOne(mockUser);
    const user = await usersCollection.findOne({ username: 'testUser' });

    expect(user).toEqual(expect.objectContaining(mockUser));
  });
});
