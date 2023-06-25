const Joi = require("joi");
const { Schema, model } = require("mongoose");

const heroSchema = new Schema(
  {
    nickname: {
      type: String,
      required: [true, "Set nickname for superhero"],
    },
    real_name: {
      type: String,
      required: [true, "Set real name for superhero"],
    },
    origin_description: {
      type: String,
      required: [true, "Set description for superhero"],
    },
    superpowers: {
      type: String,
      required: [true, "Set superpowers for superhero"],
    },
    catch_phrase: {
      type: String,
      required: [true, "Set catch phrase for superhero"],
    },
    images: {
      type: Array,
    },
  },
  { versionKey: false, timestamps: true }
);

const addSchema = Joi.object({
  nickname: Joi.string().min(3).required(),
  real_name: Joi.string().min(3).required(),
  origin_description: Joi.string().min(3).required(),
  superpowers: Joi.string().min(3).required(),
  catch_phrase: Joi.string().min(3).required(),
});

const updateSchema = Joi.object({
  nickname: Joi.string().min(3).optional(),
  real_name: Joi.string().min(3).optional(),
  origin_description: Joi.string().min(3).optional(),
  superpowers: Joi.string().min(3).optional(),
  catch_phrase: Joi.string().min(3).optional(),
  images: Joi.string().optional(),
})
  .required()
  .min(1);

const Hero = model("hero", heroSchema);

module.exports = { addSchema, updateSchema, Hero };
