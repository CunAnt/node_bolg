const path = require("path");
const express = require("express");
const morgan = require("morgan");
const exphbs = require("express-handlebars").engine;
const route = require("./routes");
const crypto = require("crypto");
const session = require("express-session");
const flash = require("connect-flash");
const db = require("./config/db");
const app = express();
const port = 3030;

app.use(express.static(path.join(__dirname, "/public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
//Connect to DB
db.connect();
//
app.use((req, res, next) => {
  console.log(`Request URL: ${req.url}`);
  next();
});
//
app.use(express.json());
//HTTP logger
app.use(morgan("combined"));

//Template engine
app.engine(
  "hbs",
  exphbs({
    extname: ".hbs",
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

route(app);

// session config
const secret = crypto.randomBytes(32).toString("hex");
app.use(
  session({
    secret: `${secret}`,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
