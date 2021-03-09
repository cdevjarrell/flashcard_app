const mongoose = require("mongoose");

const flashcardSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 2, maxlength: 255 },
  description: { type: String, required: true },
  dateModified: { type: Date, default: Date.now },
});




module.exports.schema = flashcardSchema;
module.exports.Card = mongoose.model('Card', flashcardSchema);
