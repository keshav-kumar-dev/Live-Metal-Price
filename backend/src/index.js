const app = require("./app");
require("dotenv").config();
const redisClient = require("./config/redis")


redisClient.connect().then(()=>{
    app.listen(process.env.PORT,async ()=>{
        console.log(`Server is running on PORT ${process.env.PORT}`);
    })
})