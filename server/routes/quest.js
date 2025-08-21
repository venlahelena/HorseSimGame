const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const questController = require("../controllers/questController");

router.get("/", auth, questController.getUserQuests);
router.post("/assign", auth, questController.assignQuest);
router.put("/progress", auth, questController.updateQuestProgress);

module.exports = router;