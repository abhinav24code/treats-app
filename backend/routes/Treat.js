const router = require("express").Router();
const treatController = require("../controllers/Treat");

// get all treats
router
  .get("/:groupId", treatController.getTreatsByGroup)
  .get("/leaderboard/:groupId", treatController.getLeaderboard)
  .post("/", treatController.addTreat)
  .patch("/:groupId", treatController.updateTreat)
  .delete("/:id", treatController.deleteTreat);

module.exports = router;
