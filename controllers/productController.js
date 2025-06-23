import asyncHandler from "../middlewares/asyncHandler.js";

import Product from "../model/productModel.js";
const addProduct = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.status(400).json({ error: "Name is required" });
      case !price:
        return res.status(400).json({ error: "Price is required" });
      case !description:
        return res.status(400).json({ error: "Description is required" });
      case !category:
        return res.status(400).json({ error: "Category is required" });
      case !quantity:
        return res.status(400).json({ error: "Quantity is required" });
      case !brand:
        return res.status(400).json({ error: "Brand is required" });
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    const { name, price, description, category, quantity, brand } = req.fields;

    switch (true) {
      case !name:
        return res.status(400).json({ error: "Name is required" });
      case !price:
        return res.status(400).json({ error: "Price is required" });
      case !description:
        return res.status(400).json({ error: "Description is required" });
      case !category:
        return res.status(400).json({ error: "Category is required" });
      case !quantity:
        return res.status(400).json({ error: "Quantity is required" });
      case !brand:
        return res.status(400).json({ error: "Brand is required" });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields },
      { new: true }
    );

    await product.save();

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const removeProduct = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const fetchProducts = asyncHandler(async (req, res) => {
  try {
    const pageSize = 6;
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};

    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword }).limit(pageSize);
    res.json({
      products,
      page: 1,
      pages: Math.ceil(count / pageSize),
      hasMore: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

const addProductReview = asyncHandler(async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyViewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyViewed) {
        res.status(400);
        throw new Error("You have already reviewed this product");
      }

      const review = {
        user: req.user._id,
        name: req.user.username,
        rating: Number(rating),
        comment,
      };

      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();

      res.status(201).json({ message: "Review added successfully" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});

export {
  addProduct,
  updateProductDetails,
  removeProduct,
  fetchProducts,
  fetchAllProducts,
  addProductReview,
};
