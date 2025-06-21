import express, { urlencoded } from 'express';

import dotenv from 'dotenv';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

import productRoutes from './routes/productRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());



app.use("/api/users", userRoutes)
app.use("/api/products", productRoutes)


connectDB();


app.listen(port, ()=> {
    console.log(`The Server is Running on Port: ${port}`)
});