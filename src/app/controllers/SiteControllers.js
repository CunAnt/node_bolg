const Course = require('../models/Course');
class SiteControllers {
  async home(req, res) {
    try {
      const docs = await Course.find();
      res.json(docs);
    } catch (error) {
      res.status(400).json({ error: 'Error' });
    }
    // res.render('home');
  }

  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteControllers();
