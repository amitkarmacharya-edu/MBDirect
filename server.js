const express = require("express");
const routes = require("./routes");

const session = require("express-session"); 
// Requiring passport as we've configured it
const passportLog = require("./config/passport"); 
const passport = require("passport");
const fileupload = require("express-fileupload"); 
const isAuthenticated = require("./config/middleware/isAuthenticated");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3001; 

const db = require("./models");
const app = express();

app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(fileupload());


app.post("/api/login", passportLog.authenticate("local"), (req, res) => {
  // Sending back a password, even a hashed password, isn't a good idea
  res.json({    
    email: req.user.email,
    id: req.user.id
  });
});

app.post("/api/register", (req, res) => {
  console.log(req.body);
  db.User.create(req.body)
    .then(dbUser => {
      // res.json(dbUser);
      res.redirect(307, "/api/login");
    })
    .catch(err => {
      res.status(401).json(err);
    });
});

// Route for logging user out
app.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});


app.get("/companies", isAuthenticated, (req, res) => {
 res.redirect("/dashboard");
});

app.get("/users", isAuthenticated, (req, res) => {
  db.User
      .findAll({include: [db.Company]})     
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
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