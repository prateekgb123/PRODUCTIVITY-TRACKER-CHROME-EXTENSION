const router = require("express").Router();
const { getReport } = require("../controllers/reportController");

router.get("/", getReport);

module.exports = router;
