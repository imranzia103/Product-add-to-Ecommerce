import express from "express";

import formidable from "express-formidable";

import checkId from "../middlewares/checkId.js ";

import  {addProduct}  from "../controllers/productController.js";

import { authenticate, authorizeAdmin} from "../middlewares/authmiddleware.js";


const router = express.Router();

router.route("/").post(authenticate, authorizeAdmin, formidable(), addProduct);



export default router;