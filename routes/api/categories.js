const router = require("express").Router();
const categoriesController = require("../../controllers/categoriesController");

// Matches with "/api/categories"
router.route("/")
  .get(categoriesController.findAll)
  .post(categoriesController.create);

// Matches with "/api/categories"
router.route("/countbycompany")
  .get(categoriesController.countCategoriesByCompany);

// // Matches with "/api/categories/:id"
router
  .route("/:id")
  .get(categoriesController.findById)
  .put(categoriesController.update)
  .delete(categoriesController.remove);

module.exports = router;
