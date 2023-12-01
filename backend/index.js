// app.js
const express = require("express");
const { connectMongo } = require("./config/connect");
const routes = require("./routes/index");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: false }));
connectMongo();
app.use(bodyParser.json());
app.use(cors());
// Define a route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api", routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
