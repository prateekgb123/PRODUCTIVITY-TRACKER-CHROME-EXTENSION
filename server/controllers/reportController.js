const Activity = require("../models/Activity");

exports.getReport = async (req, res) => {
  const data = await Activity.aggregate([
    { $group: { _id: "$site", total: { $sum: "$duration" } } },
    { $sort: { total: -1 } }
  ]);

  res.json(data);
};
