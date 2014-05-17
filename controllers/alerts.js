var getAlerts  = require("../util/get_alerts");

module.exports = {
  index: function(req, res, next) {
    getAlerts()
    .then(res.json.bind(res))
    .catch(next)
  }
}
