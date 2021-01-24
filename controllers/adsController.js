const db = require("../models");
// Defining methods for the adsController

module.exports = {
  
  findAll: function(req, res) {
    db.Ad.findAll({}).then((dbAd) => {
      res.json(dbAd);
    });
  },
  findById: function(req, res) {
    db.Ad
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(dbAd => res.json(dbAd))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Ad
      .create(req.body)
      .then(dbAd => res.json(dbAd))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Ad
      .Update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(dbAd => res.json(dbAd))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Ad
      .destroy({
        where: {
          id: req.params.id
        }
      })      
      .then(dbAd => res.json(dbAd))
      .catch(err => res.status(422).json(err));
  }
};

