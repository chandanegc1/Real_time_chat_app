const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo= require("socket.io");

const app = express();
const port = 4000 || process.env.PORT


const users=[{}];


app.use(cors());       //cors is used for intercommunicate between url
app.get("/" ,(req ,res)=>{
    res.send("working..");
})


const server = http.createServer(app);
const io = socketIo(server);



io.on('connection' , (socket)=>{
    console.log("new connection..");

    socket.on('joined' , ({user})=>{
        users[socket.id] = user;         //on means receive the data
        console.log(user , "is joined..");
        socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined`});
        socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]} `})
    })
  
    socket.on('message' , ({message ,id})=>{
        io.emit('sendmessage' , {user:users[id] , message , id});
    })

    socket.on('disconnect' , ()=>{
        socket.broadcast.emit('leave' , {user:"Admin",message:`${users[socket.id]} has left`})
        console.log(`${users[socket.id]} has left`);
    })

    
})

server.listen(port , ()=>{
    console.log(`server listenning... http://localhost:${port}` , port);
})