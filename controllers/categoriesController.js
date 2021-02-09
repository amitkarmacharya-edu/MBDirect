const { sequelize } = require("../models");
const db = require("../models");
// Defining methods for the companiesController

module.exports = {
  findAll: function(req, res) {
    db.Category.findAll({}).then((dbCategory) => {
      res.json(dbCategory);
    });
  },
  countCategoriesByCompany: function(req, res) {
    db.sequelize.query("SELECT categories.name, COUNT(companies.id) AS numberCompanies FROM `categories` JOIN companies ON companies.CategoryId = categories.id GROUP BY categories.id", { type: sequelize.QueryTypes.SELECT})
    .then(dbCategory => res.json(dbCategory))
    .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Category
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(dbCategory => res.json(dbCategory))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Category
      .create(req.body)
      .then(dbCategory => res.json(dbCategory))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Category
      .Update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(dbCategory => res.json(dbCategory))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Category
      .destroy({
        where: {
          id: req.params.id
        }
      })      
      .then(dbCategory => res.json(dbCategory))
      .catch(err => res.status(422).json(err));
  },
};

