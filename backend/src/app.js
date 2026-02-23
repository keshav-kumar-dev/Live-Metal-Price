const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
require("dotenv").config();
const ApiError = require('./utils/ApiError');


const app = express();

app.use(cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5500"],
    methods: ["GET", "POST"]
}))

app.use(helmet())


app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});


module.exports = app;