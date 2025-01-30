// installed module
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// custom module
const app = require("./index");

// CONNECTING TO DATABASE
const DB = process.env.DATABASE.replace(/<PASSWORD>/g, process.env.PASSWORD);

mongoose.connect(DB).then((conn) => {
  console.log("Databse connected successfully");
});

// listen to server
port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`your app is running on http://localhost:${port}`);
});
