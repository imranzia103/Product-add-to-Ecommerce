import express from 'express';
import formidable from 'express-formidable';


import { authenticate, authorizeAdmin } from '../middlewares/authmiddleware.js';
import checkId from '../middlewares/checkId.js';

const router = express.Router();


import { addProduct } from '../controller/productController.js';


router.route("/").post( formidable(), addProduct)


export default router;