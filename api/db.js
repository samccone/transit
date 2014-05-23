var Knex  = require("knex");

module.exports = Knex.initialize({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'password',
    database : 'transit'
  }
});
