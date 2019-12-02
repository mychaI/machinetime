const { Pool } = require('pg');

const { PG_URI } = require('./config/keys');
const { env } = require('./config/env');

const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, cb) => {
	if (env === 'dev') {
	  console.log('executed query', text);
	}
	return pool.query(text, params, cb);
  }
};
