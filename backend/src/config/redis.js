const {createClient} = require("redis");

const client = createClient();

client.on('error' , (err)=>{
    
    console.log("Error from redis client", err)
})

module.exports = client;