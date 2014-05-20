var Knex = require("knex");

var knex = Knex.initialize({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    database : 'transit'
  }
});

knex.schema.table('stops', function (table) {
  table.string("stop_id");
  table.string("stop_code");
  table.string("stop_name");
})
.then(function() {
  return knex.raw('ALTER TABLE stops ADD COLUMN location POINT;')
})
.then(function() {
  console.log("schema set");
  process.exit(0);
})
.catch(function(e){
  console.log(e);
  process.exit(1);
})