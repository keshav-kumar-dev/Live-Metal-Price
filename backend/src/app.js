const express = require("express")
const helmet = require("helmet")
const cors  = require("cors")
require("dotenv").config();


const app = express();

app.use(cors({
origin:["http://127.0.0.1:5500", "http://localhost:5500"],
 methods: ["GET", "POST"]
}))

app.use(helmet())

module.exports = app;