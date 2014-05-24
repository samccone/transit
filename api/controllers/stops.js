var _               = require("lodash");
var knex            = require("../db.js");
var routesByStop    = require("../util/get_routes_by_stop");
var getRouteDetails = require("../util/get_route");
var Promise         = require("bluebird");

function getStopRoutes(stop) {
  return routesByStop(stop.stop_id)
  .then(function(routes) {
    return Promise.map(routes, getRouteInfo)
    .then(function(routes) {
      stop.routes = routes
      return stop;
    })
  })
}

function getRouteInfo(route) {
  return getRouteDetails(route.route_id)
  .then(function(details) {
    route.direction = details.direction.map(function(dir) {
      if (dir.stop_ids) {
        return dir;
      }

      dir.stop_ids = _.map(dir.stop, function(stop){
        return stop.stop_id
      })

      delete dir.stop;

      return dir;
    });

    return route;
  })
}

module.exports = {
  near: function(req, res, next) {
    var dist  = _.min([req.query.radius, 3218]);
    var lat   = parseFloat(req.query.latitude);
    var lng   = parseFloat(req.query.longitude);

    knex('stops')
    .where(knex.raw("ST_Distance_Sphere(ST_Centroid(stop), ST_GeomFromText('POINT("+lat+" "+lng+")', 4326)) < "+dist+";"))
    .then(function(stops) {
      return Promise.map(stops, getStopRoutes)
    })
    .then(res.json.bind(res))
    .catch(next);
  }
}
