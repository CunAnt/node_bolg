const path = require('path');
const express = require('express');

const exphbs = require('express-handlebars').engine;
const route = require('./routes');
const db = require('./config/db');
const app = express();
const port = 3030;

app.use(express.static(path.join(__dirname, '/public')));

app.use(
  express.urlencoded({
    extended: true,
  })
);
//Connect to DB
db.connect();

app.use(express.json());
//HTTP logger
app.use(morgan('combined'));

//Template engine
app.engine(
  'hbs',
  exphbs({
    extname: '.hbs',
  })
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
