var Promise     = require('bluebird');
var Get         = Promise.promisify(require("request").get);
var memoryCache = require('memory-cache');
var APIKEY      = process.env['MBTA_KEY'];
var URLBASE     = "http://realtime.mbta.com/developer/api/v1/stopsbyroute?api_key=" + APIKEY + "&route=";

module.exports = function(routeId) {
  if (cached = memoryCache.get(routeId)) {
    return Promise.resolve(cached);
  }

  return Get(URLBASE+routeId, {
    headers: {
      accept: 'application/json'
    }
  })
  .then(function(d) {
    d = JSON.parse(d[0].body);
    memoryCache.put(routeId, d);
    return d;
  })
}
