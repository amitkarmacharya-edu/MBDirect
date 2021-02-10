const db = require("../models");
const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;
const path = require("path");

// Defining methods for the UsersController
module.exports = {
  findAll: function (req, res) {
    db.User.findAll({ include: [db.Company] })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },
  findByEmail: function (req, res) {
    console.log("=====");
    console.log(req.body.email);
    console.log("=====");

    db.User.findAll({ where: {
      email: req.body.email
    } 
  })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },

  findById: function (req, res) {
    db.User.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Company],
    })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {

    if (!req.files || !req.files.image){
      const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,        
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,              
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        type: req.body.type,
        password: req.body.password
      }
      db.User.create(user)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
      return
    }

    console.log(req.files);
    const img = req.files.image;
    const imgName = uuid();
    const imgType = img.mimetype.split("/")[1];
    const IMAGE_PATH_CLIENT = `../images/${imgName}.${imgType}`;
    const IMAGE_PATH_SERVER = path.join(
      __dirname,
      `../public/images/${imgName}.${imgType}`
    );
    // Use the mv() method to place the file somewhere on your server
    img.mv(IMAGE_PATH_SERVER, err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,        
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,              
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        type: req.body.type,
        image: IMAGE_PATH_CLIENT,
        password: req.body.password
      }
      db.User.create(user)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));      
    });   
  },

  update: function (req, res) {
    idToNumber = parseInt(req.params.id);
    console.log(idToNumber);
    let passwordUpdated = req.body.password;
    console.log(passwordUpdated);
    if (passwordUpdated !== undefined ) {
      if (passwordUpdated.length <= 20) {
        passwordUpdated = bcrypt.hashSync(
          passwordUpdated,
          bcrypt.genSaltSync(10),
          null
        );
      }
    }

    if (!req.files || !req.files.image){
      const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,        
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,              
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        type: req.body.type,
        password: passwordUpdated
      }
      db.User.update(user,
        {
          where: {
            id: idToNumber,
          },
        })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
      return
    }

    console.log(req.files);
    const img = req.files.image;
    const imgName = uuid();
    const imgType = img.mimetype.split("/")[1];
    const IMAGE_PATH_CLIENT = `../images/${imgName}.${imgType}`;
    const IMAGE_PATH_SERVER = path.join(
      __dirname,
      `../public/images/${imgName}.${imgType}`
    );
    // Use the mv() method to place the file somewhere on your server
    img.mv(IMAGE_PATH_SERVER, err => {
      if (err) {
        console.log(err);
        return res.status(500).send(err);
      }
      const user = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,        
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,              
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        type: req.body.type,
        image: IMAGE_PATH_CLIENT,
        password: passwordUpdated
      }
      db.User.update(user,
        {
          where: {
            id: idToNumber,
          },
        })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));      
    });   
    
  },
  remove: function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },
};
