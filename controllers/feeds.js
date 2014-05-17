var getFeed   = require("../util/get_vehicles");
var getRoute  = require("../util/get_route");

module.exports = {
  index: function(req, res, next) {
    getFeed()
    .then(res.json.bind(res))
    .catch(next)
  },

  near: function(req, res, next) {
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
  }
}
