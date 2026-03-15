const Group = require("../models/Group");
const Treat = require("../models/Treat");
const asyncHandler = require("../utils/asyncHandler");

// ADD TREAT
exports.addTreat = asyncHandler(async (req, res) => {
  const { dishName, givenBy, funValue, groupId } = req.body;

  if (!dishName || !givenBy || !funValue || !groupId) {
    const error = new Error("Missing required fields");
    error.statusCode = 400;
    throw error;
  }

  const newTreat = new Treat({
    dishName,
    givenBy,
    funValue,
    groupId,
  });

  const savedTreat = await newTreat.save();

  res.status(201).json(savedTreat);
});

// GET TREATS BY GROUP
exports.getTreatsByGroup = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  const treats = await Treat.find({ groupId });

  res.status(200).json({
    count: treats.length,
    treats,
  });
});

// DELETE TREAT
exports.deleteTreat = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const treat = await Treat.findById(id);

  if (!treat) {
    const error = new Error("Treat not found");
    error.statusCode = 404;
    throw error;
  }

  await treat.deleteOne();

  res.status(200).json({
    message: "Treat deleted",
  });
});

// UPDATE TREAT
exports.updateTreat = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { dishName, givenBy, funValue } = req.body;

  const treat = await Treat.findById(id);

  if (!treat) {
    const error = new Error("Treat not found");
    error.statusCode = 404;
    throw error;
  }

  treat.dishName = dishName || treat.dishName;
  treat.givenBy = givenBy || treat.givenBy;
  treat.funValue = funValue || treat.funValue;

  const savedTreat = await treat.save();

  res.status(200).json(savedTreat);
});

// LEADERBOARD
exports.getLeaderboard = asyncHandler(async (req, res) => {
  const { groupId } = req.params;

  // Check group exists
  const group = await Group.findOne({ code: groupId });
  if (!group) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  const leaderboard = await Treat.aggregate([
    { $match: { groupId: groupId } },
    {
      $group: {
        _id: "$givenBy",
        totalFun: { $sum: "$funValue" },
      },
    },
    { $sort: { totalFun: -1 } },
  ]);

  res.status(200).json({
    group: group.name,
    leaderboard,
  });
});
