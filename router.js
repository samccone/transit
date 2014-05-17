var contollers  = require("./controllers");

module.exports = function(app) {
  app.get("/api/feed", contollers.feed.index);
  app.get("/api/route/:route_id", contollers.route.get)
  app.get("/api/feed/near", contollers.feed.near);
}
