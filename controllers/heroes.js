const ctrlWrapper = require("../helpers/ctrlWrapper");
const { Hero } = require("../models/hero");

const getAll = async (req, res) => {
  const { page, limit } = req.query;
  const skip = (page - 1) * limit;

  const allHeroes = await Hero.find().count();
  const heroes = await Hero.find()
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  return res.json({
    status: "success",
    code: 200,
    data: {
      totalPages: Math.ceil(allHeroes / limit),
      heroes,
    },
  });
};

const getById = async (req, res) => {
  const { heroId } = req.params;
  const result = await Hero.findById({ _id: heroId });

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
  const { images } = req.body;
  const imagesArr = JSON.parse(images) || [];

  if (req.files) {
    req.files.forEach((file) => {
      const imagePath = "images/" + file.filename;
      imagesArr.push(imagePath);
    });
  }

  const updatedHero = {
    ...req.body,
    images: imagesArr,
  };

  const result = await Hero.findByIdAndUpdate(heroId, updatedHero, {
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
};
