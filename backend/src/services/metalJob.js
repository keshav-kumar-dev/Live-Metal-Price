const cron = require("node-cron");
const axios = require("axios");
const redisClient = require("../config/redis");

const url = process.env.METAL_API+"key=" + process.env.METAL_API_KEY + "&currency=" + process.env.METAL_CURRENCY + "&unit=" + process.env.METAL_UNIT;

const getUpdatedMetalPrice = async ()=>{
    console.log("Crons run")

    const result = await axios.get(url);
    await redisClient.set("metalData" ,JSON.stringify(result.data));
    const redisData = await redisClient.get("metalData")
    // console.log("redisData",redisData)

}

cron.schedule("*10 * * * * *", getUpdatedMetalPrice);

module.exports = getUpdatedMetalPrice