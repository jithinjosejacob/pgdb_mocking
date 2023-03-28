const express = require("express");
const bodyParser = require("body-parser");
const controller = require("./controllers");
const cors = require("cors");

require("dotenv").config({ path: "./.env" });


const app = express();

app.use(cors());
app.use(bodyParser.json());

controller(app);
app.listen(3000, () => {
  console.log("the server has started listening");
});
