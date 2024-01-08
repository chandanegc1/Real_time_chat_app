const http = require("http");
const express = require("express");
const cors = require("cors");
const socketIo= require("socket.io");

const app = express();
const port = 4000 || process.env.PORT


app.use(cors());       //cors is used for intercommunicate between url
app.get("/" ,(req ,res)=>{
    res.send("working..");
})

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection" , ()=>{
    console.log("new connection..");
})

server.listen(port , ()=>{
    console.log(`server listenning... http://localhost:${port}` , port);
})