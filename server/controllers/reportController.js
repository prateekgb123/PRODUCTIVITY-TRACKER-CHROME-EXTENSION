const Activity = require("../models/Activity");

exports.getReport = async (req, res) => {
  const data = await Activity.aggregate([
    { $match: { user: require("mongoose").Types.ObjectId(req.user) } },
    { $group: { _id: "$site", total: { $sum: "$duration" } } }
  ]);

  res.json(data);
};
