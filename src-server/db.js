const massive = require('massive');
const { connectionStr, schema } = require('../config/db');

let dbState = {};
module.exports = async () => {
  if (!dbState.db) {
    const db = await massive(connectionStr, {
      // explicitly specify the used schemas
      allowedSchemas: [schema]
    });
    dbState = { db };
  }
  return Promise.resolve(dbState);
};
