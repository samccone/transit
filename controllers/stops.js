var _     = require("lodash");
var knex  = require("../db.js");

module.exports = {
  near: function(req, res, next) {
    var dist  = _.min([req.query.distance, 3218]);
    var lat   = parseFloat(req.query.latitude);
    var lng   = parseFloat(req.query.longitude);

    knex('stops')
    .where(knex.raw("ST_Distance_Sphere(stop, ST_GeomFromText('POINT("+lng+" "+lat+")', 4326)) < "+dist+";"))
    .then(res.json.bind(res))
    .catch(next);
  }
}

