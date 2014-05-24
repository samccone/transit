var getRoute  = require("../util/get_routes_by_stop");

module.exports = {
  get: function(req, res, next) {
    getRoute(req.params['stop_id'])
    .then(res[req.query.callback ? "jsonp" : "json"].bind(res))
    .catch(next);
  }
}
