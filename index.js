import express, { urlencoded } from 'express';

import dotenv from 'dotenv';

import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(urlencoded({extended:true}));
app.use("/api/users", userRoutes)


connectDB();


app.listen(port, ()=> {
    console.log(`The Server is Running on Port: ${port}`)
});