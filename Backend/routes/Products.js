const express = require("express");
const router = express.Router();
const Product = require("../models/ProductsSchema");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

router.post("/addproduct", upload.single("image"), async (req, res) => {
  try {
    const { name, brand, categoryid, description, price, stock, size } =
      req.body;
    const image = req.file ? req.file.filename : null;
    if (
      !name ||
      !brand ||
      !categoryid ||
      !description ||
      !price ||
      !stock ||
      !image ||
      !size
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingProduct = await Product.findOne({ name });
    if (existingProduct) {
      return res.status(409).json({ message: "This perfume already exists" });
    }

    const newProduct = new Product({
      name,
      brand,
      categoryid,
      description,
      price,
      stock,
      image: req.file?.filename,
      size,
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error while adding product",
      error: error.message,
    });
  }
});

//delete a product
router.delete("/deleteProduct", async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res
      .status(201)
      .json({ message: "You should select the name of perfume" });
  }
  const checkname = await Product.findOne({ name });
  if (!checkname) {
    res.status(201).json({ message: "No perfume of this name" });
  }

  const deleteProduct = await Product.findOneAndDelete({ name });
  res.status(201).json({ message: "product deleted", deleteProduct });
});

//update product
router.put("/updateProduct/:id", async (req, res) => {
  const productId = req.params.id;
  const { name, brand, description, price, stock, image, size } = req.body;
  const updateProduct = await Product.findByIdAndUpdate(productId, {
    name,
    brand,
    description,
    price,
    stock,
    image,
    size,
  });
  return res
    .status(201)
    .json({ message: "Product updated successfuly", updateProduct });
});

module.exports = router;
