const Activity = require("../models/Activity");

exports.addActivity = async (req, res) => {
  const { site, duration } = req.body;

  await Activity.create({
    user: req.user,
    site,
    duration
  });

  res.json({ msg: "Saved" });
};
