const mongoose = require("mongoose");
const Joi = require("joi");
const { flashcardSchema } = require("flashcard");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collectionStack: { type: [flashcardSchema], default: [] },
});

const Collection = mongoose.model("Collection", collectionSchema);

function validateCollection(collection) {
  const schema = Joi.object({
    name: Joi.string().require(),
  });
  return schema.validate(collection);
}

exports.Collection = Collection;
exports.validate = validateCollection;
