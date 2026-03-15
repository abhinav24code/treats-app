const Group = require("../models/Group");
const { generateCode } = require("../utils/generateCode");
const asyncHandler = require("../utils/asyncHandler");

// =======================
// CREATE GROUP
// =======================
exports.createGroup = asyncHandler(async (req, res) => {
  const { name, maxMembers } = req.body;

  const newGroup = new Group({
    name,
    maxMembers,
    code: generateCode(),
    members: [],
  });

  const savedGroup = await newGroup.save();

  res.status(201).json(savedGroup);
});

// =======================
// GET GROUP BY CODE
// =======================
exports.getGroupByCode = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const group = await Group.findOne({ code });

  if (!group) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json(group);
});

// =======================
// JOIN GROUP
// =======================
exports.joinGroup = asyncHandler(async (req, res) => {
  const { code, userName } = req.body;

  if (!code || !userName) {
    const error = new Error("Missing data");
    error.statusCode = 400;
    throw error;
  }

  const group = await Group.findOne({ code });

  if (!group) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  if (group.members.length >= group.maxMembers) {
    const error = new Error("Group full");
    error.statusCode = 400;
    throw error;
  }

  if (group.members.includes(userName)) {
    const error = new Error("User already joined");
    error.statusCode = 409;
    throw error;
  }

  group.members.push(userName);

  const updatedGroup = await group.save();

  res.status(200).json(updatedGroup);
});

// =======================
// REMOVE MEMBER
// =======================
exports.deleteGroupMember = asyncHandler(async (req, res) => {
  const { code, userName } = req.body;

  if (!code || !userName) {
    const error = new Error("Missing data");
    error.statusCode = 400;
    throw error;
  }

  const group = await Group.findOne({ code });

  if (!group) {
    const error = new Error("Group not found");
    error.statusCode = 404;
    throw error;
  }

  group.members = group.members.filter((m) => m !== userName);

  const updatedGroup = await group.save();

  res.status(200).json(updatedGroup);
});
