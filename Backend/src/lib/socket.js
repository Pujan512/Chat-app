import {Server} from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST"]  
    },
    path: "/socket.io/" 
  });

const onlineUsers = {};



io.on("connection", (socket)=>{
    console.log("A user connected", socket.id);
    
    const userId = socket.handshake.query.userId;
    if(userId) onlineUsers[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(onlineUsers));
    
    socket.on("disconnect", ()=>{
        console.log("A user disconnected", socket.id)
        delete onlineUsers[userId];
        io.emit("getOnlineUsers", Object.keys(onlineUsers));
    })
})

export function getReceiverSocketId(userId){
    return onlineUsers[userId];
}

export {io, app, server};