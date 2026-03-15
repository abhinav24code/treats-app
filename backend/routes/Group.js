const router = require("express").Router();
const groupController = require("../controllers/Group");
const { validateCreateGroup } = require("../middleware/validateGroup");

// group routes
router
  .post("/", validateCreateGroup, groupController.createGroup) // Create group
  .get("/:code", groupController.getGroupByCode) // Get group by code
  .patch("/join", groupController.joinGroup) // Join group
  .patch("/remove", groupController.deleteGroupMember); // Remove member

module.exports = router;
