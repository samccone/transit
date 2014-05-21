var getRoute  = require("../util/get_route");

module.exports = {
  get: function(req, res, next) {
    getRoute(req.params['route_id'])
    .then(res[req.query.callback ? "jsonp" : "json"].bind(res))
    .catch(next);
  }
}
