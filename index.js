const connectDB = require("./startup/db");
const express = require("express");
const app = express();
const flashcards = require("./routes/flashcards");
const collections = require("./routes/collections");

connectDB();

app.use(express.json());
app.use("/api/flashcards", flashcards);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
