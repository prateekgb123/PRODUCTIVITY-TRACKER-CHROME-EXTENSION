const router = require("express").Router();
const { addActivity } = require("../controllers/activityController");

router.post("/", addActivity);

module.exports = router;
