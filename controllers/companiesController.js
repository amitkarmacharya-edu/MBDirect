const db = require("../models");
const uuid = require("uuid").v4;
const path = require("path");
const Sequelize = require("sequelize");
const { uploadImage } = require("../gcCloudStorage/helpers/gcCloudStorage.js");
// Defining methods for the companiesController

module.exports = {
  
  findAll: function(req, res) {
    db.Company.findAll({include: [db.Ad]}).then((dbCompany) => {
      res.json(dbCompany);
    });
  },
  findAllbyUser: function(req, res) {
    db.Company.findAll({
      where: {
        UserId: req.params.userId
      },
      include: [db.Ad]}).then((dbCompany) => {
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
    if (!req.files || !req.files.logo){
      const company = {
        name: req.body.name,
        description: req.body.description,
        address: req.body.address,
        email: req.body.email,
        phone: req.body.phone,
        fax: req.body.fax,        
        city: req.body.city,
        state: req.body.state,
        zip_code: req.body.zip_code,
        country: req.body.country,
        status: req.body.status,
        UserId: req.body.UserId,
        CategoryId: req.body.CategoryId
      }
      db.Company
      .create(company)
      .then(dbCompany => res.json(dbCompany))
      .catch(err => res.status(422).json(err));
      return
    }
    
    // console.log(req.files);
    const img = req.files.logo;
    uploadImage(img)
      .then(imageUrl => {
        const company = {
          name: req.body.name,
          description: req.body.description,
          address: req.body.address,
          email: req.body.email,
          phone: req.body.phone,
          fax: req.body.fax,
          logo: imageUrl,
          city: req.body.city,
          state: req.body.state,
          zip_code: req.body.zip_code,
          country: req.body.country,
          status: req.body.status,
          UserId: req.body.UserId,
          CategoryId: req.body.CategoryId
        }
        db.Company
        .create(company)
        .then(dbCompany => res.json(dbCompany))
        .catch(err => res.status(422).json(err));   
      })
      .catch(err => res.status(422).json(err));
  },

  update: function(req, res) {
    idToNumber = parseInt(req.params.id);
    console.log(idToNumber);

     // console.log(req.files);
     const img = req.files.logo;
     uploadImage(img)
       .then(imageUrl => {
        const company = {
          name: req.body.name,
          description: req.body.description,
          address: req.body.address,
          email: req.body.email,
          phone: req.body.phone,
          fax: req.body.fax,
          logo: imageUrl,
          city: req.body.city,
          state: req.body.state,
          zip_code: req.body.zip_code,
          country: req.body.country,
          status: req.body.status,
          UserId: req.body.UserId,
          CategoryId: req.body.CategoryId
        }
  
        db.Company
          .update(company, {
            where: {
              id: idToNumber,
            }
          })
          .then(dbCompany => res.json(dbCompany))
          .catch(err => res.status(422).json(err));  
       })
       .catch(err => res.status(422).json(err));
      
  }, 

  updateWithNoImage: function(req, res) {
    idToNumber = parseInt(req.params.id);
    console.log(idToNumber);
    const company = {
      name: req.body.name,
      description: req.body.description,
      address: req.body.address,
      email: req.body.email,
      phone: req.body.phone,
      fax: req.body.fax,      
      city: req.body.city,
      state: req.body.state,
      zip_code: req.body.zip_code,
      country: req.body.country,
      status: req.body.status,
      UserId: req.body.UserId,
      CategoryId: req.body.CategoryId
    }
    db.Company
        .update(company, {
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
  },
  
  getCompaniesByCategory: async function(req, res) {
    console.log("inside comapnay");
    console.log("0-----------------------------");
    db.sequelize.query("select * from (select *, row_number() over(partition by CategoryId order by CategoryId asc) as rn from Companies) as top5 where rn <= 5;", { type: Sequelize.QueryTypes.SELECT})
    .then(dbCompanies => {
      console.log(dbCompanies)
      res.json(dbCompanies)
    })
    .catch(err => res.status(422).json(err));
  }
};

