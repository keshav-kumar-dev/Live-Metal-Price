const express = require("express");
const catchAsync = require("../../utils/catchAsync");
require("dotenv").config();
const redisClient = require("../../config/redis")
require("../../services/metalJob")

const router = express.Router();

router.get("/", catchAsync(async (req,res)=>{
    const redisData = await redisClient.get("metalData")
    if(!redisClient){
        res.status(400).send("data not available")
    }
    // console.log("redisData",redisData)
    res.status(200).json(JSON.parse(redisData));
}))

module.exports = router;