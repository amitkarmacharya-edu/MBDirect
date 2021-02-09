const { sequelize } = require("../models");
const db = require("../models");

// Defining methods for the MeetsController
module.exports = {
  findAll: function (req, res) {
    db.sequelize
      .query(
        `select Meets.id, Meets.title, Meets.description, Meets.start_time, Meets.end_time, Meets.status, Buser.first_name, Buser.last_name, Buser.id as UserId , Companies.name, Companies.id AS CompanyId from (((Meets
          join Companies on Meets.CompanyId = Companies.id)
          join Users Auser on Companies.UserId = Auser.id)
          join Users Buser on Meets.UserId = Buser.id)`,
        {type: sequelize.QueryTypes.SELECT })
      .then((dbMeet) => {
        res.json(dbMeet)})
      .catch((err) => res.status(422).json(err));
  },
  findAllbyUser: function(req, res) {
    db.sequelize
      .query(
        "SELECT * FROM ((Meets JOIN Companies ON Meets.CompanyId = Companies.id) JOIN Users on Companies.UserId = Users.id) WHERE Users.id= ? GROUP BY Meets.UserId ",
        { replacements: [req.params.userId], type: sequelize.QueryTypes.SELECT })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  findAllMeetsbyUser: function(req, res) {
    db.sequelize
      .query(
        `select Meets.id, Meets.title, Meets.description, Meets.start_time, Meets.end_time, Meets.status, Buser.first_name, Buser.last_name, Buser.id as UserId , Companies.name, Companies.id AS CompanyId from (((Meets
          join Companies on Meets.CompanyId = Companies.id)
          join Users Auser on Companies.UserId = Auser.id)
          join Users Buser on Meets.UserId = Buser.id)
          where Auser.id=?`,
        { replacements: [req.params.userId], type: sequelize.QueryTypes.SELECT })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  findMeetsbyMonth: function(req, res) {
    db.sequelize
      .query(
        `select monthname(start_time) as MonthName, count(Meets.id) as Meets  from (((Meets
          join Companies on Meets.CompanyId = Companies.id)
          join Users Auser on Companies.UserId = Auser.id)
          join Users Buser on Meets.UserId = Buser.id)
          where Auser.id=? and year(Meets.start_time) = ?
          group by month(Meets.start_time)`,
        { replacements: [req.params.userId,req.params.year], type: sequelize.QueryTypes.SELECT })
      .then((dbMeet) => res.json(dbMeet))
      .catch((err) => res.status(422).json(err));
  },
  findAllMeetsbyMonth: function(req, res) {
    db.sequelize
      .query(
        `select monthname(start_time) as MonthName, count(Meets.id) as Meets  from Meets
          where year(Meets.start_time) = ?
          group by month(Meets.start_time)`,
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
