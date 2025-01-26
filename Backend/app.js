import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';

// routes
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js'

// MONGO CONNECTION
import mongoConnect from "./config/mongoConnect.js";
import cookieParser from "cookie-parser";
mongoConnect();


dotenv.config();

const app = express();
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly list allowed HTTP methods
}))

app.use(cookieParser())

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/auth', authRoutes)
app.use('/todo', todoRoutes )


app.listen(process.env.PORT, ()=>{
    console.log(`PORT LISTENING ON ${process.env.PORT}`);
    
})