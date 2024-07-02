const redis = require('redis-mock');
const { promisify } = require('util');
const redisClient = require('../utils/redisClient');

describe('Redis Client', () => {
  let client;

  beforeAll(() => {
    client = redis.createClient();
    redisClient.setClient(client);
  });

  afterAll(() => {
    client.quit();
  });

  it('should set and get values from Redis', async () => {
    const setAsync = promisify(client.set).bind(client);
    const getAsync = promisify(client.get).bind(client);

    await setAsync('testKey', 'testValue');
    const value = await getAsync('testKey');

    expect(value).toBe('testValue');
  });
});
