var getPassages = require("../util/get_passages");

module.exports = {
  index: function(req, res, next) {
    getPassages()
    .then(res[req.query.callback ? "jsonp" : "json"].bind(res))
    .catch(next);
  },

  get: function(req, res, next) {
    getPassages
    .byRoute(req.params.route_id)
    .then(res[req.query.callback ? "jsonp" : "json"].bind(res))
    .catch(next);
  }
}

