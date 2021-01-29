const db = require("../models");
const bcrypt = require("bcryptjs");

// Defining methods for the UsersController
module.exports = {
  findAll: function (req, res) {
    db.User.findAll({ include: [db.Company] })
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
    db.User.create(req.body)
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    idToNumber = parseInt(req.params.id);
    let passwordUpdated = req.body.password;
    if (passwordUpdated !== undefined ) {
      if (passwordUpdated.length <= 20) {
        passwordUpdated = bcrypt.hashSync(
          passwordUpdated,
          bcrypt.genSaltSync(10),
          null
        );
      }
    }
    db.User.update(
      {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        address: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        password: passwordUpdated,
      },
      {
        where: {
          id: idToNumber,
        },
      }
    )
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
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
