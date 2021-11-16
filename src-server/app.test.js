process.env.NODE_ENV = 'test';

const request = require('supertest');
const seed = require('../scripts/db-seed');
const App = require('./app');

describe('Run basic server tests', () => {
  let app = {};

  // Wait for the app to load
  beforeAll(async () => {
    app = await App();
  }, 30000);

  afterAll(async () => {
    await seed.openClearAndCloseDB();
  });
  it('should have a successful DB connection', () => {
    const db = app.get('db');
    return expect(typeof db).toBe('object');
  });

  it('should respond 200 to the [GET /]', () => request(app).get('/').expect(200));
});
