const router = require("express").Router();
const meetsController = require("../../controllers/meetsController");

// Matches with "/api/meets"
router.route("/")
  .get(meetsController.findAll)
  .post(meetsController.create);

// Matches with "/api/meets"
router.route("/countguests/:userId")
  .get(meetsController.findAllbyUser);

// Matches with "/api/meets"
router.route("/meetsbymonth/:userId/:year")
  .get(meetsController.findMeetsbyMonth);

router.route("/allmeetsbymonth/:year")
  .get(meetsController.findAllMeetsbyMonth);

  // Matches with "/api/meets"
router.route("/countmeets/:userId")
.get(meetsController.findAllMeetsbyUser);

// Matches with "/api/meets/:id"
router
  .route("/:id")
  .get(meetsController.findById)
  .put(meetsController.update)
  .delete(meetsController.remove);

module.exports = router;
