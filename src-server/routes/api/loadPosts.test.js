const request = require('supertest');
const seed = require('../../../scripts/db-seed');
const loadPosts = require('./loadPosts');
const App = require('../../app');

describe('loadPosts', () => {
  describe('integration', () => {
    it('calls posts.batchCreate with 10k posts', async () => {
      const successCb = jest.fn();
      const failureCb = jest.fn();
      const posts = { batchInsert: jest.fn().mockResolvedValue({ test: true }) };

      await loadPosts(successCb, failureCb, posts);

      expect(posts.batchInsert).toHaveBeenCalled();

      const batchInsertCalledWith = posts.batchInsert.mock.calls[0][0];
      expect(batchInsertCalledWith.length).toBe(10000);
    });
  });

  describe('e2e', () => {
    describe('when calling posts/load', () => {
      it('responds with 200 to [POST /posts/load]', async (done) => {
        const { db } = await seed.openDB();
        await seed.clearDB(db);

        const app = await App();

        request(app).post('/api/posts/load').expect(201).end((loadErr) => {
          if (loadErr) done(loadErr);
          request(app).get('/api/posts').expect(200).end(async (getErr, getRes) => {
            if (getErr) done(getErr);
            expect(getRes.body.length).toEqual(10000);
            await seed.clearDB(db);
            await seed.closeDB(db);
            done();
          });
        });
      }, 30000);
    });
  });
});
