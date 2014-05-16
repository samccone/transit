var feedUrl     = 'http://developer.mbta.com/lib/gtrtfs/Vehicles.pb';
var Transit     = require("protobufjs").protoFromFile("gtfs-realtime.proto").build("transit_realtime");
var Promise     = require('bluebird');
var Get         = Promise.promisify(require("request").get);
var _           = require("lodash");
var memoryCache = require('memory-cache');
var geolib      = require('geolib');

module.exports = function() {
  return getFeed();
}

module.exports.near = function(location) {
  // in KM, limit to 5k
  var distance = Math.min(location.distance || 2000, 5000);

  if (!location.latitude || !location.longitude) {
    throw new Error("you must pass latitude and longitude as query params");
  }

  return getFeed()
  .then(function(d) {
    return _.filter(d, function(d) {
      return geolib.isPointInCircle(d.vehicle.position, location, distance)
    });
  });
}

function getFeed() {
  if (cache = memoryCache.get('feed')) {
    return Promise.resolve(cache);
  }

  return requestFeed()
  .then(function(d) {
    memoryCache.put("feed", d, 5000);
    return d;
  });
}

function requestFeed() {
  return Get(feedUrl, {encoding: null})
  .then(function(d) {
    return Transit.FeedMessage.decode(d[0].body).entity
  })
}
