const newsRouter = require('./news');
const coursesRouter = require('./courses');
const siteRouter = require('./site');

function route(app) {
  app.use('/new', newsRouter);
  app.use('/courses', coursesRouter);

  app.use('/', siteRouter);
}

module.exports = route;
