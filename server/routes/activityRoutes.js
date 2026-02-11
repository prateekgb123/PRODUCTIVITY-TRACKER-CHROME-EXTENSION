const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { addActivity } = require("../controllers/activityController");

router.post("/", auth, addActivity);

module.exports = router;
