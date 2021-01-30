const db = require("../models");
// Defining methods for the companiesController

module.exports = {
  
  findAll: function(req, res) {
    db.Company.findAll({include: [db.Ad]}).then((dbCompany) => {
      res.json(dbCompany);
    });
  },
  findById: function(req, res) {
    db.Company
      .findOne({
        where: {
          id: req.params.id
        },
        include: [db.Ad]
      })
      .then(dbCompany => res.json(dbCompany))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Company
      .create(req.body)
      .then(dbCompany => res.json(dbCompany))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    idToNumber = parseInt(req.params.id);
    console.log(idToNumber);
    db.Company
      .update(req.body, {
        where: {
          id: idToNumber,
        }
      })
      .then(dbCompany => res.json(dbCompany))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Company
      .destroy({
        where: {
          id: req.params.id
        }
      })      
      .then(dbCompany => res.json(dbCompany))
      .catch(err => res.status(422).json(err));
  }
};

