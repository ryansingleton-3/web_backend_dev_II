const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use("/", require("./routes"));

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected via Mongoose");
    app.listen(port, () => {
      console.log(`Server listening at port: ${port}`);
    });
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
