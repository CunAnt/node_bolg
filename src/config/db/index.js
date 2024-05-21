const mongoose = require('mongoose');

async function connect() {
  try {
    await mongoose.connect('mongodb://localhost:27017/individual_blog_dev', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('connect success');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
