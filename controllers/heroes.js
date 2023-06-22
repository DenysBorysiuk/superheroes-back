const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Hero } = require("../models/hero");

const getAll = async (req, res) => {
  const allHeroes = await Hero.find();

  return res.json(allHeroes);
};

const getById = async (req, res) => {
  const { heroId } = req.params;
  const result = await Hero.findById(heroId);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  return res.json(result);
};

const addNew = async (req, res) => {
  const images = [];

  if (req.files) {
    req.files.forEach((file) => {
      const imagePath = "images/" + file.filename;
      images.push(imagePath);
    });
  }

  const newHero = {
    ...req.body,
    images,
  };

  const result = await Hero.create(newHero);
  return res.status(201).json(result);
};

const deleteById = async (req, res) => {
  const { heroId } = req.params;
  const result = await Hero.findByIdAndRemove(heroId);

  if (!result) {
    return res.status(404).json({ message: "Not found" }).end();
  }

  return res.json({ message: "hero deleted" }).end();
};

const updateById = async (req, res) => {
  const { heroId } = req.params;
  const result = await Hero.findByIdAndUpdate(heroId, req.body, {
    new: true,
  });

  if (!result) {
    return res.status(404).json({ message: "Not found" }).end();
  }

  return res.json(result);
};

const updateFavorite = async (req, res) => {
  const { heroId } = req.params;
  const result = await Hero.findByIdAndUpdate(heroId, req.body, {
    new: true,
  });

  if (!result) {
    return res.status(404).json({ message: "Not found" }).end();
  }

  return res.json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addNew: ctrlWrapper(addNew),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
