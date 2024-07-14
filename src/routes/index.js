const newsRouter = require("./news");
const coursesRouter = require("./courses");
const siteRouter = require("./site");
const testRouter = require("./test");

function route(app) {
  app.use("/new", newsRouter);
  app.use("/courses", coursesRouter);
  // app.use("/test", testRouter);
  app.use("/", siteRouter);
}

module.exports = route;
