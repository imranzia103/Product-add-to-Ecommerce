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
    res.status(201).json({product});
  } catch (error) {
    console.error(error);
    res.status(500).json(error.message);
  }
});
export { addProduct };
