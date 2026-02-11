const Activity = require("../models/Activity");

exports.addActivity = async (req, res) => {
  const { site, duration } = req.body;

  await Activity.create({ site, duration });

  res.json({ msg: "Saved" });
};
