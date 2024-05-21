class NewControllers {
  // [GET] /news
  index(req, res) {
    res.render('new');
  }
  // [GET] /:slug
  show(req, res) {
    res.send('show pages');
  }
}

module.exports = new NewControllers();
