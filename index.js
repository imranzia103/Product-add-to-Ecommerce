import express, { urlencoded } from 'express';

import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

import productRoutes from './routes/productRoutes.js';

import uploadRoutes from "./routes/uploadRoutes.js";


dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(cookieParser());

app.use(urlencoded({extended:true}));

connectDB();

app.use("/api/users", userRoutes);

app.use("/api/products", productRoutes);

app.use ("/api/upload", uploadRoutes)


app.listen(port, () => {
console.log(`THe server is Running on port: ${port}`);
})
