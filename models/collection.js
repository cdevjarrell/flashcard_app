const mongoose = require("mongoose");
const flashcard = require("./Card");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  cards: [flashcard.schema],
});

module.exports = mongoose.model("Collection", collectionSchema);
