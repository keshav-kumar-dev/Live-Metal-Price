const WebSocket = require("ws");
const redisClient = require("../config/redis");

const startAllTickWebSocket = (io)=>{

    const TOKEN = process.env.ALLTICK_TOKEN;
    const WS_URl =  `wss://quote.alltick.co/quote-b-ws-api?token=${TOKEN}`;
    
    const ws = new WebSocket(WS_URl);
    
    // Heartbeat function to keep connection alive
    function sendHeartbeat(socket) {
      const hb = {
        cmd_id: 22000,
        seq_id: Date.now(),
        trace: "hb_" + Date.now(),
        data: {}
      };
      socket.send(JSON.stringify(hb));
    }
    
    
    ws.on('open', () => {
      console.log('✅ Connected to AllTick');
     
      sendHeartbeat(ws);
      const subRequest = {
        cmd_id: 22004,
        seq_id: 1,
        trace: "gold_subscription",
        data: {
          symbol_list: [ // Ensure "GOLD" is uppercase
            { code: "GOLD" } // Ensure "GOLD" is uppercase
          ]
        }
      };
    
      ws.send(JSON.stringify(subRequest));
      console.log('📡 Subscription request sent...');
    
      // 3. Set interval for heartbeat every 10 seconds
      setInterval(() => {
        if (ws.readyState === WebSocket.OPEN) {
          sendHeartbeat(ws);
        }
      }, 10000);
    });
    
    ws.on('message', async (data) => {
      const response = JSON.parse(data);
    
      // Protocol 22998 is the actual "Push" data from the server

      if(response.ret==400){
        return;
      }

      if (response.cmd_id === 22998 || (response.data && response.data.last_price)) {
        const tick = response.data;
        console.log(`[${new Date().toLocaleTimeString()}] 💰 Gold Price: $${tick.last_price || tick.price}`);
        // console.log(JSON.stringify(response.data))
        
        await redisClient.set("metalData" ,JSON.stringify(response.data));

        const redisData = await redisClient.get("metalData");

         io.emit("updatedMetalData",redisData);

      } else if (response.msg === "success") {
        console.log('✨ Server confirmed: ' + (response.cmd_id === 22000 ? 'Heartbeat' : 'Subscribed'));
      } else {
        // Log other messages to see if there's an error code
        console.log('System Message:', JSON.stringify(response));
      }
    });
    
    ws.on('error', (err) => {
      console.error('❌ WebSocket Error:', err.message);
    });
    
    ws.on('close', (code, reason) => {
      console.warn(`⚠️ Connection closed (Code: ${code}). Reason: ${reason || 'Unknown'}`);
      console.log('Retrying in 5 seconds...');
      // Optional: Add logic to restart the script
    });
}

module.exports = startAllTickWebSocket;