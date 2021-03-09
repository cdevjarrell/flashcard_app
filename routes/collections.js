const express = require("express");
const router = express.Router();
const Collection = require("../models/Collection");
const Joi = require("joi");
const { Card } = require("../models/Card");

router.get("/", async (req, res) => {
  try {
    const collections = await Collection.find();
    return res.send(collections);
  } catch (error) {
    return res.status(400).send(`Database error ${error}`);
  }
});

router.post("/", async (req, res) => {
  let collection = new Collection({
    name: req.body.name,
    cards:[],
  });
  try {
    const result = await collection.save();
    return res.send(result);
  }catch(error){
    return res.status(400).send(`Database Error ${error}`);
  }
});

  
router.put("/:collectionId/collectionstack/:flashcardId", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const collection = await Collection.findById(req.params.collectionId);
    if (!collection)
      return res
        .status(400)
        .send(
          `The collection with id "${reqp.params.flashcardId} does not exist.`
        );

    const flashcard = collection.collectionStack.id(req.params.flashcardId);
    if (!flashcard)
      return res
        .status(400)
        .send(
          `The flashcard with id "${req.params.flashcardId}" does not exist in the Collection Stack.`
        );

    collections.collectionStack.push(flashcard);

    flashcard.name = req.body.name;
    flashcard.description = req.body.description;
    flashcard.dateModified = Date.now();

    await collection.save();
    return res.send(flashcard);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete(
  "/:collectionId/collectionstack/:flashcardId",
  async (req, res) => {
    try {
      const collection = await Collection.findById(req.params.collectionId);
      if (!collection)
        return res
          .status(400)
          .send(
            `The collection with id "${req.params.collectionId} does not exist.`
          );

      let flashcard = collection.collectionStack.id(req.params.flashcardId);
      if (!flashcard)
        return res
          .status(400)
          .send(
            `The flashcard with id "${req.params.flashcardId} does not exist in the collection stack.`
          );

      flashcard = await flashcard.remove();

      await collection.save();
      return res.send(flashcard);
    } catch (ex) {
      return res.status(500).send(`Internal Server Error: ${ex}`);
    }
  }
);

module.exports = router;
