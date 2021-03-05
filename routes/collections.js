const { Collection } = required("../models/collection");
const { Flashcard, validate } = required("../models/flashcard");
const express = require("express");
const router = express.Router();

router.post("/:collectionId/collectionstack/:flashcardId", async (req, res) => {
  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection)
      return res
        .status(400)
        .send(
          `The collection with id "${req.params.collectionId}" does not exist.`
        );

    const flashcard = await Flashcard.findById(req.params.flashcardId);
    if (!flashcard)
      return res
        .status(400)
        .send(
          `The product with id "${req.params.flashcardId}" does not exist.`
        );

    collection.collectionStack.push(flashcard);

    await collection.save();
    return res.send(collection.collectionStack);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.export = router;
