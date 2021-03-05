const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  category: { type: String, required: true, minlength: 2, maxlength: 255 },
  description: { type: String, required: true },
  dateModified: { type: Date, default: Date.now },
});

const Flashcard = mongoose.model("Flashcard", flashcardSchema);

module.exports = Flashcard;
