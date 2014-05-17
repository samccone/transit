var _           = require("lodash");
var feedUrl     = 'http://developer.mbta.com/lib/gtrtfs/Passages.pb';
var Transit     = require("protobufjs").protoFromFile("gtfs-realtime.proto").build("transit_realtime");
var Promise     = require('bluebird');
var memoryCache = require('memory-cache');
var Get         = Promise.promisify(require("request").get);

module.exports = function() {
  return getPassages();
}

module.exports.byRoute = function(routeId) {
  return getPassages().then(function(d) {
    return _.findWhere(d, function(passage) {
      return passage.trip_update.trip.route_id == routeId;
    })
  })
}

function getPassages() {
  if (cache = memoryCache.get("passages")) {
    return Promise.resolve(cache);
  }

  return Get(feedUrl, {encoding: null})
  .then(function(d) {
    d = Transit.FeedMessage.decode(d[0].body).entity;
    memoryCache.put("passages", d, 1000 * 10);

    return d
  })
}
