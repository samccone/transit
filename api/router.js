var fs          = require("fs");
var controllers = require("./controllers");

module.exports = function(app) {
  app.get("/api/feed", controllers.feed.index);
  app.get("/api/feed/near", controllers.feed.near);

  app.get("/api/route/:route_id", controllers.route.get);

  app.get("/api/alerts", controllers.alerts.index);

  app.get("/api/passages", controllers.passages.index);
  app.get("/api/passages/:route_id", controllers.passages.get);

  app.get("/api/near-stops", controllers.stops.near);

  app.get("/api/routes-by-stop/:stop_id", controllers.routesByStop.get);
  app.get("*", function(req, res){
    fs.createReadStream(__dirname+"/README.md").pipe(res);
  });
}
