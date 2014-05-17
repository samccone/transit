var _           = require("lodash");
var feedUrl     = 'http://developer.mbta.com/lib/GTRTFS/Alerts/Alerts.pb';
var Transit     = require("protobufjs").protoFromFile("gtfs-realtime.proto").build("transit_realtime");
var Promise     = require('bluebird');
var memoryCache = require('memory-cache');
var Get         = Promise.promisify(require("request").get);

module.exports = function() {
  if (cache = memoryCache.get("alerts")) {
    return Promise.resolve(cache)
  }

  return Get(feedUrl, {encoding: null})
  .then(function(d) {
    return Transit.FeedMessage.decode(d[0].body).entity
  })
}
