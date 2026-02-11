const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const { getReport } = require("../controllers/reportController");

router.get("/", auth, getReport);

module.exports = router;
