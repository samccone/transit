var ProtoBuf  = require("protobufjs");
var request   = require("request");
var _         = require("underscore");
var express   = require("express");
var http      = require('http');
var app       = express();
var Transit   = ProtoBuf.protoFromFile("gtfs-realtime.proto").build("transit_realtime");
var server    = http.createServer(app).listen(8888);


var io = require("socket.io").listen(server);

app.get("/", function(req, res) {
  res.sendfile(__dirname + '/index.html');
});

function getBuses() {
  request.get('http://developer.mbta.com/lib/gtrtfs/Vehicles.pb', {
    encoding: null
  }, function(e, r, b) {
    var locations = _.map((Transit.FeedMessage.decode(r.body).entity), function(o) {
       return o.vehicle.position;
    });

    io.sockets.emit("update", {positions: locations});

    // get updates every 10 seconds
    setTimeout(getBuses, 1000 * 10);
  });
}


getBuses();
