const db = require("../models");
const bcrypt = require("bcryptjs");
const uuid = require("uuid").v4;
const path = require("path");
const { uploadImage } = require("../gcCloudStorage/helpers/gcCloudStorage.js");

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

    db.User.findAll({
      where: {
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

    if (!req.files || !req.files.image) {
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

    // console.log(req.files);
    const img = req.files.image;
    uploadImage(img)
      .then(imageUrl => {
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
          image: imageUrl,
          password: req.body.password
        }
        db.User.create(user)
          .then((dbUser) => res.json(dbUser))
          .catch((err) => res.status(422).json(err));
      })
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    idToNumber = parseInt(req.params.id);
    console.log(idToNumber);
    let passwordUpdated = req.body.password;
    console.log(passwordUpdated);
    if (passwordUpdated !== undefined) {
      if (passwordUpdated.length <= 20) {
        passwordUpdated = bcrypt.hashSync(
          passwordUpdated,
          bcrypt.genSaltSync(10),
          null
        );
      }
    }

    if (!req.files || !req.files.image) {
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

    // console.log(req.files);
    const img = req.files.image;
    uploadImage(img)
      .then(imageUrl => {
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
          image: imageUrl,
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
      })
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.User.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  }
};
