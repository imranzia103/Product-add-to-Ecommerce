import express, { urlencoded } from 'express';

import dotenv from 'dotenv';

import cookieParser from 'cookie-parser';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

import categoryRoutes from "./routes/categoryRoutes.js"

import productRoutes from './routes/productRoutes.js';

import uploadRoutes from "./routes/uploadRoutes.js";

import orderRoutes from "./routes/orderRoutes.js";

import path from 'path';


dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.use(cookieParser());

app.use(urlencoded({extended:true}));

connectDB();

app.use("/api/users", userRoutes);

app.use("/api/category", categoryRoutes)

app.use("/api/products", productRoutes);

app.use ("/api/upload", uploadRoutes);

app.use ("/api/orders", orderRoutes);

app.get("/api/confid/paypal", (req, res) => {
    res.send({clientId: process.env.PAYPAL_CLIENT_ID })
})


const __dirname = path.resolve();

app.use('/uploads', express.static(path.join(__dirname + '/uploads')));


app.listen(port, () => {
console.log(`THe server is Running on port: ${port}`);
})
