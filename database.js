import knex from 'knex';

const db = knex({
  client: 'pg',
  connection: {
	connectionString: process.env.DATABASE_URL,
	ssl: {
	  rejectUnauthorized: false
	} 
	}
});

// const db = knex({
// 	client: 'pg',
// 	connection: {
// 		host: '127.0.0.1',
// 	  	user: 'emilio',
// 	  	password: 'egj38kb2',
// 	  	database: 'ebillsdb'
// 	}
// });
  
export default db;

