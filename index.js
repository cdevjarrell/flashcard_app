const connectDB = require("./startup/db");
const express = require("express");
const collections = require("./routes/collections");

const app = express();
connectDB();

app.use(express.json());
app.use("/api/collections", collections);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});
