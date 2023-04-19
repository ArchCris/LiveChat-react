const express = require('express');
const app = express();
const http = require('http');
const PORT = 3001
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require("socket.io");
app.use(cors())
const io = new Server(server,{
    cors:{
        origin:'http://localhost:3000',
        methods: ['GET','POST']
    }
});
/*Check server*/ 
server.listen(3001, () => {
  console.log(`listening on ${PORT}`);
});
/*Listening connection*/ 
io.on('connection', (socket) => {
  /*User connect*/
  console.log(`A user connected in the socket:${socket.id}`);
  /*Join room*/
  socket.on('join_room',(data)=>{
    socket.join(data)
  })
  /*Get message*/
  socket.on('send_message',(data)=>{
    socket.to(data.room).emit("receive_message",data)
  })

  /*User disconnect*/
  socket.on("disconnect",()=>{
    console.log(`A user disconnected in the socket:${socket.id}`);
  })
});

