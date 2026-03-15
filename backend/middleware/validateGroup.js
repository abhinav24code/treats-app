// middleware/validateGroup.js

exports.validateCreateGroup = (req, res, next) => {
  const { name, maxMembers } = req.body;

  if (!name || name.trim() === "") {
    return res.status(400).json({ message: "Name is required" });
  }

  if (typeof maxMembers !== "number") {
    return res.status(400).json({ message: "maxMembers must be a number" });
  }

  next();
};
