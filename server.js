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
app.use(passport.initialize());
app.use(passport.session());
app.use(fileupload());


app.use(routes);

// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
