const router = require("express").Router();
const companiesController = require("../../controllers/companiesController");

// Matches with "/api/companies"
router.route("/")
  .get(companiesController.findAll)
  .post(companiesController.create);

// // Matches with "/api/companies/:id"
router
  .route("/:id")
  .get(companiesController.findById)
  .put(companiesController.update)  
  .delete(companiesController.remove);

router
  .route("/noimage/:id")
  .put(companiesController.updateWithNoImage);

router
  .route("/byuser/:userId")
  .get(companiesController.findAllbyUser);
  

module.exports = router;
