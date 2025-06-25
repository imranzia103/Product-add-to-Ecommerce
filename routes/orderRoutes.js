import express from 'express';

import {createOrder,
    getAllOrders, 
    getUserData, 
    countTotalOrders, 
    } from '../controllers/orderController.js';

import {authenticate, authorizeAdmin } from '../middlewares/authmiddleware.js';



const router = express.Router();


router
.route("/")
.post(authenticate, createOrder)
.get(authenticate, authorizeAdmin, getAllOrders);


router
.route("/mine")
.get(authenticate, getUserData);

router.route("/total-orders").get(countTotalOrders)



export default router;
