const express = require("express")
const helmet = require("helmet")
const metalPrice = require("./routes/v1/metalPrice");
const cors  = require("cors")
require("dotenv").config();

const app = express();
app.use(helmet())


app.use(cors({
 origin: "* " 
}))

app.use("/",metalPrice);


module.exports = app;