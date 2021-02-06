const router = require("express").Router();
const adsController = require("../../controllers/adsController");

// Matches with "/api/ads"
router.route("/")
  .get(adsController.findAll)
  .post(adsController.create);

// // Matches with "/api/ads/:id"
router
  .route("/:id")
  .get(adsController.findById)
  .put(adsController.update)
  .delete(adsController.remove);

router
  .route("/byuser/:userId")
  .get(adsController.findAllbyUser);

module.exports = router;
