const app = require("./app");
require("dotenv").config();
const redisClient = require("./config/redis")
const http = require("http")
const {Server}  = require("socket.io");

const server = http.createServer(app);

const io =new Server(server,{
    cors:{
origin:["http://127.0.0.1:5500", "http://localhost:5500"],
 methods: ["GET", "POST"]
}
});

module.exports = {io,server}

io.on('connection', (socket) => {
    socket.emit("connected", "socket connected")
  console.log('a user connected');
});

redisClient.connect().then(()=>{
    server.listen(process.env.PORT,async ()=>{
        console.log(`Server is running on PORT ${process.env.PORT}`);
    })
    const startCron = require("./services/metalJob");
    startCron(io);
})