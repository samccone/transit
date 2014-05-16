var port      = process.env['PORT'] || 8888;
var http      = require('http');
var app       = require("express")()
var getFeed   = require("./util/get_vehicals")
var _         = require("lodash");

app.get("/api/feed", function(req, res, next) {
  getFeed().then(_.bind(res.json, res));
});

app.get("/api/feed/near", function(req, res, next) {
  getFeed
  .near(req.query)
  .then(_.bind(res.json, res))
  .catch(next);
});

console.log("Server started on " + port);
http.createServer(app).listen(port);
