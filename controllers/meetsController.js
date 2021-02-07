const { sequelize } = require("../models");
const db = require("../models");

// Defining methods for the MeetsController
module.exports = {
  findAll: function (req, res) {
    db.sequelize
      .query(
        `select meets.id, meets.title, meets.description, meets.start_time, meets.end_time, meets.status, Buser.first_name, Buser.last_name, Buser.id as UserId , companies.name, companies.id AS CompanyId from (((meets
          join companies on meets.CompanyId = companies.id)
          join users Auser on companies.UserId = Auser.id)
          join users Buser on meets.UserId = Buser.id)`,
        {type: sequelize.QueryTypes.SELECT })
      .then((dbMeet) => {
        res.json(dbMeet)})
      .catch((err) => res.status(422).json(err));
  },
  findAllbyUser: function(req, res) {
    db.sequelize
      .query(
        "SELECT * FROM ((meets JOIN companies ON meets.CompanyId = companies.id) JOIN users on companies.UserId = users.id) WHERE users.id= ? GROUP BY meets.UserId ",
        { replacements: [req.params.userId], type: sequelize.QueryTypes.SELECT })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  findAllMeetsbyUser: function(req, res) {
    db.sequelize
      .query(
        `select meets.id, meets.title, meets.description, meets.start_time, meets.end_time, meets.status, Buser.first_name, Buser.last_name, Buser.id as UserId , companies.name, companies.id AS CompanyId from (((meets
          join companies on meets.CompanyId = companies.id)
          join users Auser on companies.UserId = Auser.id)
          join users Buser on meets.UserId = Buser.id)
          where Auser.id=?`,
        { replacements: [req.params.userId], type: sequelize.QueryTypes.SELECT })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  findMeetsbyMonth: function(req, res) {
    db.sequelize
      .query(
        `select monthname(start_time) as MonthName, count(meets.id) as Meets  from (((meets
          join companies on meets.CompanyId = companies.id)
          join users Auser on companies.UserId = Auser.id)
          join users Buser on meets.UserId = Buser.id)
          where Auser.id=? and year(mbdirect.meets.start_time) = ?
          group by month(meets.start_time)`,
        { replacements: [req.params.userId,req.params.year], type: sequelize.QueryTypes.SELECT })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  findAllMeetsbyMonth: function(req, res) {
    db.sequelize
      .query(
        `select monthname(start_time) as MonthName, count(meets.id) as Meets  from meets
          where year(meets.start_time) = ?
          group by month(meets.start_time)`,
        { replacements: [req.params.year], type: sequelize.QueryTypes.SELECT })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Meet.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.Company],
    })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  create: function (req, res) {
    db.Meet.create(req.body)
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Meet.Update(req.body, {
      where: {
        id: req.body.id,
      },
    })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.Meet.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
};
