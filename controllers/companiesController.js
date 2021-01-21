const db = require("../models");
// Defining methods for the companiesController

module.exports = {
  
  findAll: function(req, res) {
    db.Company.findAll({}).then((dbCompany) => {
      res.json(dbCompany);
    });
  },
  create: function(req, res) {
    db.Company
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};

