const db = require("../models");

// Defining methods for the UsersController
module.exports = {
  findAll: function(req, res) {
    db.User
      .findAll({include: [db.Company]})     
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.User
      .findOne({
        where: {
          id: req.params.id
        },
        include: [db.Company]
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.User
      .create(req.body)
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.User
      .Update(req.body, {
        where: {
          id: req.params.id
        }
      })
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.User
      .destroy({
        where: {
          id: req.params.id
        }
      })      
      .then(dbUser => res.json(dbUser))
      .catch(err => res.status(422).json(err));
  }
};
