import express from 'express';
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import cors from 'cors';
import {connectDB} from './lib/db.js'
import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app, server } from './lib/socket.js';

import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

dotenv.config();

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use('/api/auth', authRoutes);
app.use('/api', messageRoutes);

if(process.env.NODE_ENV === "production"){
    const frontendPath = path.join(__dirname, '../../Frontend/dist');
  
  if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
    
    app.get('*', (req, res) => {
      res.sendFile(path.join(frontendPath, 'index.html'));
    });
  } else {
    console.warn('Frontend build not found at:', frontendPath);
  }
}

server.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    connectDB();
})