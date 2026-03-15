// backend/models/Treat.js
// placeholder model file
// backend/models/Group.js
// placeholder model file
const mongoose = require("mongoose");
const { Schema } = mongoose;

const treatSchema = new Schema({
  dishName: String,
  givenBy: String,
  funValue: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  groupId: String,
});

const Treat =
  mongoose.models.treatSchema || mongoose.model("treat", treatSchema);

module.exports = Treat;
