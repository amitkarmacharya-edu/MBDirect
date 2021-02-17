const express = require("express");
const routes = require("./routes");
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

const session = require("express-session"); 
// Requiring passport as we've configured it
const passportLog = require("./config/passport"); 
const passport = require("passport");
const fileupload = require("express-fileupload"); 
const isAuthenticated = require("./config/middleware/isAuthenticated");

// Setting up port and requiring models for syncing
const PORT = process.env.PORT || 3001; 

const app = express();
const http= require("http").Server(app);
const io = require("socket.io")(http, {
  cookie: true
});

// Define middleware here
if(process.env.NODE_ENV !== "production"){
  app.options("*", cors());
  app.use(cors());
}

const db = require("./models");
app.use(fileupload());
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 
app.use(express.static("public"));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());
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

// creates a UUID for the user to use in meets
app.get("/meetsId", (req,res) => {
  res.status(200).json(uuidv4());
})

app.use(routes);
// Syncing our database and logging a message to the user upon success
db.sequelize.sync().then(() => {
  http.listen(PORT, () => {
    console.log(
      "==> :earth_americas:  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

/**
 * Socket.io
 */

// stores relations between user and business
// store all the business ids, users send request
// to business using their ids
const bidToSid = {}; // bid to business user socket it, to forward the messages

// socket
io.on('connection', (socket) => {

  console.log("user connected");

  log(socket.id);

  // creates rooms based on the business owner socket id
  socket.on("RegisterBusinessToMeets", async ({userId}) => {
    log("ResterBusinessToMeets");
    log("userID: " + userId);
    log("socketID : " + socket.id);
    // check if the owner has a business associated to him
    const companies = await db.Company.findAll({
      where: {UserId: userId},
      raw: true
    });

    log("company List");
    log(companies);
    log(companies.length === 0);
    // if there are no business under the user name
    if(companies.length === 0){
      socket.emit("FailedToRegisterBusiness", "No company Registered to the userID");
      return;
    }

    // for each company map the business id to the ownders active socket it
    companies.forEach(company => {
      const bId = company.id;
      // check if the business is already registered to Meets
      if(Object.keys(bidToSid).length > 0 && bidToSid[bId]) {
        socket.emit("FailedToRegisterToMeets", "Bad Request: Business Already connected to Meets");
        return;
      }

      // add the business map to owner socket it
      // all the connection to the business will be forwarded to the users/owner.
      log(bId);
      bidToSid[bId] = socket.id;
    });
    
    log(bidToSid);
  });

  /**
   * Connecting to Business room
   */

  // register the client to the room with business
  socket.on("connectToBusiness", ({userInfo, meetingType, bId, userId}) => {
    log("connecting to business");
    log("BusinessId : " + bId);
    log("userID : " + userId);
    log(userInfo);
    log("Business online: " + (bidToSid[bId] && true));
    log("Business socket: " + bidToSid[bId]);
    log(bidToSid);

    if(!bId || !userId){
      socket.emit("failedToConnectBusiness", {error: "Failed: \
      business Id or client id was not provided"});
      return;
    }

    if(!bidToSid[bId]) {
      console.log("failed to connect");
      socket.emit("failedToConnectBusiness", {error: "failed: \
      Business with that id is not online"});
      return;
    }

    // join room
    console.log("connected to business: " + bId);
    
    socket.join(bidToSid[bId]);

    socket.to(bidToSid[bId]).emit("dialTone", {
      userInfo: userInfo,
      meetingType: meetingType,
      remoteSocketId: socket.id,
      remoteUserId: userId
    });

  });

  // leave room
  socket.on("leaveRoom", ({businessSocketId}) => {
    console.log("leaveRoom");
    socket.leave(businessSocketId);
  });


  /**
   * Incoming and outgoing calls
   */

  // call rejected
  socket.on("callRejected", ({remoteSocketId}) => {
      console.log("Call rejected for : " + remoteSocketId);
      socket.to(remoteSocketId).emit("callRejected", {remoteUserId: socket.id});
  });

  /** 
   * webrtc
   * */
  
  // sdp description
  socket.on("signalChannel", ({remoteSocketId, userId, data}) => {
    console.log("broadCast sdp and candidates");
    console.log("broadcast TYPE: " + data.peerData.type);
    socket.to(remoteSocketId).emit("peerMessages", {
      remoteSocketId: socket.id, 
      userId: userId,
      data: data
    });
  });
  
  // on disconnect, clear the business to owner map if it exits
  socket.on("disconnect", () => {
    console.log(socket.id);
    console.log("disconnect");
    if(bidToSid)
    {
      const bId = Object.keys(bidToSid).filter(bId =>  bidToSid[bId] === socket.id);
      log("bid")
      log(bId);
      if(bId.length > 0) {
        bId.forEach(bId => delete bidToSid[bId]);
      }
    }

    log(bidToSid);
  });

});

function log(v){
  console.log("-----------------");
  console.log(v);
  console.log("-----------------");
}
