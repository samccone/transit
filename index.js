var port      = process.env['PORT'] || 8888;
var http      = require('http');
var app       = require("express")()
var getFeed   = require("./util/get_vehicles");
var getRoute  = require("./util/get_route");

app.get("/api/feed", function(req, res, next) {
  getFeed()
  .then(res.json.bind(res))
  .catch(next)
});

app.get("/api/route/:route_id", function(req, res, next) {
  getRoute(req.params['route_id'])
  .then(res.json.bind(res))
  .catch(next);
});

app.get("/api/feed/near", function(req, res, next) {
  getFeed
  .near(req.query)
  .filter(function(d) {
    return d.vehicle.trip && d.vehicle.trip.route_id;
  })
  .map(function(d) {
    return getRoute(d.vehicle.trip.route_id)
    .then(function(route) {
      d.route = route;
    })
    .then(function() {
      return d;
    });
  })
  .then(res.json.bind(res))
  .catch(next);
});

console.log("Server started on " + port);
http.createServer(app).listen(port);
