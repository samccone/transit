var Promise     = require('bluebird');
var Get         = Promise.promisify(require("request").get);
var memoryCache = require('memory-cache');
var APIKEY      = process.env['MBTA_KEY'];
var URLBASE     = "http://realtime.mbta.com/developer/api/v1/routesbystop?api_key=" + APIKEY + "&stop=";


module.exports = function(stopId) {
  var key = "stop-"+stopId
  if (cached = memoryCache.get(key)) {
    return Promise.resolve(cached);
  }

  return Get(URLBASE+stopId, {
    headers: {
      accept: 'application/json'
    }
  })
  .then(function(d) {
    d = JSON.parse(d[0].body);
    memoryCache.put(key, d);
    return d;
  })
}
