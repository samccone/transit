var getAlerts  = require("../util/get_alerts");

module.exports = {
  index: function(req, res, next) {
    getAlerts()
    .then(res[req.query.callback ? "jsonp" : "json"].bind(res))
    .catch(next)
  }
}
