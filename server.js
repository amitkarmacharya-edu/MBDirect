const express = require("express");
const routes = require("./routes");

const session = require("express-session"); 
// Requiring passport as we've configured it
const passport = require("./config/passport"); 
const fileupload = require("express-fileupload"); 

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3001; 

const db = require("./models");
const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);


app.post("/register", (req, res) => {
  console.log(req.body);
  db.User.create(req.body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

app.get("/users", (req, res) => {
  // Here we add an "include" property to our options in our findAll query
  db.User.findAll({}).then(dbUser => {
    res.json(dbUser);
  });
});

app.post("/users", (req, res) => {
  console.log(req.body);
  db.User.create(req.body)
    .then(dbUser => {
      res.json(dbUser);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

app.use(routes);
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> :earth_americas:  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});