const db = require("../models");
const uuid = require("uuid").v4;
const path = require("path");
const { uploadImage } = require("../gcCloudStorage/helpers/gcCloudStorage.js");


// Defining methods for the adsController

module.exports = {
  
  findAll: function(req, res) {
    db.Ad.findAll({}).then((dbAd) => {
      res.json(dbAd);
    });
  },
  findAllbyUser: function(req, res) {
    db.Ad.findAll({
      where: {
        UserId: req.params.userId
      },
      }).then((dbAd) => {
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
    if (!req.files || !req.files.image){
      const ad = {
        name: req.body.name,
        description: req.body.description,
        discount: req.body.discount,
        status: req.body.status,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        CompanyId: req.body.CompanyId,
        UserId:req.body.UserId        
      }
      db.Ad.create(ad)
      .then((dbAd) => res.json(dbAd))
      .catch((err) => res.status(422).json(err));
      return
    }

  // console.log(req.files);
  const img = req.files.image;
  uploadImage(img)
    .then(imageUrl => {
      const ad = {
        name: req.body.name,
        description: req.body.description,
        discount: req.body.discount,
        status: req.body.status,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        CompanyId: req.body.CompanyId,
        UserId:req.body.UserId,
        image: imageUrl,        
      }
      db.Ad.create(ad)
      .then((dbAd) => res.json(dbAd))
      .catch((err) => res.status(422).json(err));
    })
    .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {

    idToNumber = parseInt(req.params.id);
    console.log(idToNumber);    

    if (!req.files || !req.files.image){
      const ad = {
        name: req.body.name,
        description: req.body.description,
        discount: req.body.discount,
        status: req.body.status,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        CompanyId: req.body.CompanyId,
        UserId:req.body.UserId        
      }
      db.Ad.update(ad,
        {
          where: {
            id: idToNumber,
          },
        })
      .then((dbUser) => res.json(dbUser))
      .catch((err) => res.status(422).json(err));
      return
    }

    // console.log(req.files);
    const img = req.files.image;
    uploadImage(img)
      .then(imageUrl => {
        const ad = {
          name: req.body.name,
          description: req.body.description,
          discount: req.body.discount,
          status: req.body.status,
          start_date: req.body.start_date,
          end_date: req.body.end_date,
          CompanyId: req.body.CompanyId,
          UserId:req.body.UserId,
          image: imageUrl,        
        }
        db.Ad.update(ad,
          {
            where: {
              id: idToNumber,
            },
          })
        .then((dbAd) => res.json(dbAd))
        .catch((err) => res.status(422).json(err)); 
      })
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
  },
};

