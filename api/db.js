var Knex  = require("knex");

module.exports = Knex.initialize({
  client: 'pg',
  debug: true,
  connection: {
    host     : '127.0.0.1',
    user     : 'sam',
    password : null,
    database : 'transit'
  }
});
