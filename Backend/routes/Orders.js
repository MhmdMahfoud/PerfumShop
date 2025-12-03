const express = require("express");
const router = express.Router();
const Order = require("../models/OrdersSchema");
const Product = require("../models/ProductsSchema");
const auth = require("../middleware/auth");

router.post("/addOrder", auth, async (req, res) => {
  try {
    const { product, quantity, address } = req.body;

    if (!product || !quantity || !address) {
      return res.status(400).json({ message: "All fields are required " });
    }

    const userId = req.user.id;

    const foundPerfume = await Product.findById(product);

    if (!foundPerfume) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (foundPerfume.stock <= 0) {
      return res.status(400).json({ message: "Out of stock" });
    }
    if (foundPerfume.stock < quantity) {
      return res
        .status(400)
        .json({ message: `There is only ${foundPerfume.stock}` });
    }
    totalPrice = quantity * foundPerfume.price;

    const newOrder = new Order({
      user: userId,
      product: product,
      status: "pending",
      quantity,
      address,
      totalPrice,
    });

    await newOrder.save();
    foundPerfume.stock -= quantity;

    await foundPerfume.save();

    return res
      .status(201)
      .json({ message: "Order created successfully", newOrder });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

module.exports = router;
