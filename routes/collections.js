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

router.get("/:id", async (req, res) => {
  try {
    const collections = await Collection.findById(req.params.id);
    return res.send(collections);
  } catch (error) {
    return res.status(400).send(`Database error ${error}`);
  }
});

router.get("/:collectionId/cards/:cardId", async (req, res) => {
  try {
    const collections = await Collection.findById(req.params.collectionId);
  } catch (error) {
    return res.status(400).send(`Internal Server Error: ${error}`);
  }

  try {
    const card = await Card.findById(req.param.cardId);
    return res.send(card);
  } catch (err) {
    return res.status(400).send(`Database error ${err}`);
  }
});

router.post("/", async (req, res) => {
  const { error } = validateCollection(req.body);
  if (error) return res.status(400).send(error);

  let collection = new Collection({
    name: req.body.name,
    cards: [],
  });
  try {
    const result = await collection.save();
    return res.send(result);
  } catch (error) {
    return res.status(400).send(`Database Error ${error}`);
  }
});

router.post("/:collectionId/cards/", async (req, res) => {
  let card = new Card({
    name: req.body.name,
    description: req.body.description,
  });

  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error);

  try {
    const collection = await Collection.findById(req.params.collectionId);
    if (!collection)
      return res
        .status(400)
        .send(
          `The collection with id "${reqp.params.collectionId} does not exist.`
        );

    collection.cards.push(card);

    await collection.save();
    return res.send(collection.card);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:collectionId", async (req, res) => {
  try {
    const { error } = validateCollection(req.body);
    if (error) return res.status(400).send(error);

    const collection = await Collection.findByIdAndUpdate(
      req.params.collectionId,
      {
        name: req.body.name,
      },
      { new: true }
    );

    if (!collection)
      return res
        .status(400)
        .send(
          `The collection with id "${req.params.collectionId} does not exist.`
        );

    await collection.save();

    return res.send(collection);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:collectionId/cards/:cardId", async (req, res) => {
  try {
    const { error } = validateCard(req.body);
    if (error) return res.status(400).send(error);

    const collection = await Collection.findById(req.params.collectionId);
    if (!collection)
      return res
        .status(400)
        .send(
          `The collection with id "${req.params.collectionId} does not exist.`
        );

    const card = collection.cards.id(req.params.cardId);
    if (!card)
      return res
        .status(400)
        .send(
          `The card with id "${req.params.cardId} does not exist in the card collection.`
        );

    card.name = req.body.name;
    card.description = req.body.description;

    await collection.save();
    return res.send(card);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const collection = await Collection.findByIdAndRemove(req.params.id);

    if (!collection)
      return res
        .status(400)
        .send(`The collection with id "${req.params.id} does not exist.`);

    return res.send(collection);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

function validateCard(card) {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(card);
}

function validateCollection(collection) {
  const schema = Joi.object({
    name: Joi.string().required().min(2).max(255),
  });
  return schema.validate(collection);
}

module.exports = router;
