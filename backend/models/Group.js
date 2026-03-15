// backend/models/Group.js
// placeholder model file
const mongoose = require("mongoose");
const { Schema } = mongoose;

const groupSchema = new Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  maxMembers: { type: Number, required: true },
  members: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Group =
  mongoose.models.groupSchema || mongoose.model("group", groupSchema);

module.exports = Group;
