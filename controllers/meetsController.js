const db = require("../models");

// Defining methods for the MeetsController
module.exports = {
  findAll: function(req, res) {
    db.Meet
      .findAll({})     
      .then(dbMeet => res.json(dbMeet))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Meet
      .findOne({
        where: {
          id: req.params.id
        },
        include: [db.Company]
      })
      .then(dbMeet => res.json(dbMeet))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Meet
      .create(req.body)
      .then(dbMeet => res.json(dbMeet))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Meet
      .Update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(dbMeet => res.json(dbMeet))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Meet
      .destroy({
        where: {
          id: req.params.id
        }
      })      
      .then(dbMeet => res.json(dbMeet))
      .catch(err => res.status(422).json(err));
  }
};
