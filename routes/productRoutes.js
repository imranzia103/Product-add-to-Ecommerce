import express from "express";

import formidable from "express-formidable";

import checkId from "../middlewares/checkId.js ";

import {
    addProduct,
    updateProductDetails,
    removeProduct,
    fetchProducts,
    fetchAllProducts,
    addProductReview,
    fetchTopProducts,
    fetchnewProducts
} from "../controllers/productController.js";

import { authenticate, authorizeAdmin } from "../middlewares/authmiddleware.js";


const router = express.Router();

router
    .route("/")
    .get(fetchProducts)
    .post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allProducts").get(fetchAllProducts);
router
    .route("/:id/reviews")
    .post(authenticate, authorizeAdmin, checkId , addProductReview);

router.get("/top", fetchTopProducts);
router.get("/new", fetchnewProducts);   
       

router
    .route("/:id")
    .put(authenticate, authorizeAdmin, formidable(), updateProductDetails)
    .delete(authenticate, authorizeAdmin, removeProduct);



export default router;