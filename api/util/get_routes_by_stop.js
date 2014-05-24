var Promise     = require('bluebird');
var Get         = Promise.promisify(require("request").get);
var memoryCache = require('memory-cache');
var APIKEY      = process.env['MBTA_KEY'];
var URLBASE     = "http://realtime.mbta.com/developer/api/v1/routesbystop?api_key=" + APIKEY + "&stop=";
var _           = require("lodash")

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
    d = _(JSON.parse(d[0].body).mode).filter({mode_name: "Bus"})
          .map(function(v) {
            return v.route
          })
          .flatten().value();

    memoryCache.put(key, d);
    return d;
  })
}
