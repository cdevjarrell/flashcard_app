const mongoose = require("mongoose");
const flashCard = require("./Card");

const collectionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  collectionStack: [flashCard.schema],
});




module.exports = mongoose.model('Collection', collectionSchema)
