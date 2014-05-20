var fs    = require("fs");
var csv   = require("csv");
var Knex  = require("knex");

var knex = Knex.initialize({
  client: 'pg',
  connection: {
    host     : '127.0.0.1',
    user     : 'postgres',
    password : 'password',
    database : 'transit'
  }
});

var saves;

csv.parse(fs.readFileSync("seed/stops.txt", "utf8"), function(e, d) {
  if (e) {
    console.log(e);
    process.exit(1);
  }
  console.log("csv parsed");
  /** schema
     [ 'stop_id',
       'stop_code',
       'stop_name',
       'stop_desc',
       'stop_lat',
       'stop_lon',
       'zone_id',
       'stop_url',
       'location_type',
       'parent_station' ]
  **/
  saves = d.slice(1).map(function(item) {
    return {
      "stop_id": item[0],
      "stop_code": item[1],
      "stop_name": item[2],
      "stop": knex.raw("ST_GeomFromText('POINT("+parseFloat(item[4])+" "+parseFloat(item[5])+")', 4326)")
    }
  });

  console.log("saving csv data " + saves.length + " records");

  knex('stops').insert(saves).then(function() {
    console.log("all done");
    process.exit(0);
  })
  .catch(function(e) {
    console.log(e);
    process.exit(1);
  });
});
