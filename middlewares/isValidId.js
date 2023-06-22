const { isValidObjectId } = require("mongoose");

const isValidId = (req, res, next) => {
  const { heroId } = req.params;
  if (!isValidObjectId(heroId)) {
    return res.status(400).json({ error: `${heroId} is not valid` });
  }
  next();
};

module.exports = isValidId;
