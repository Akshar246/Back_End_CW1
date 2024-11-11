const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
  try {
    const products = await req.app.locals.db
      .collection("orders")
      .find({})
      .toArray();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Error fetching products");
  }
});

// Post route
router.post("/", async (req, res) => {
  try {
    const { name, phoneNumber, lessonIds, numberOfSpaces } = req.body;

    if (!name || !phoneNumber || !lessonIds || !numberOfSpaces) {
      return res.status(400).json({ error: "Missing order details" });
    }

    const newOrder = {
      name,
      phoneNumber,
      lessonIds,
      numberOfSpaces,
      orderDate: new Date(),
    };

    const result = await req.app.locals.db
      .collection("orders")
      .insertOne(newOrder);

    res.status(201).json(result.insertedId);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" });
  }
});

// Put method
router.put("/:id", async (req, res) => {
  try {
    const db = req.app.locals.db;
    if (!db) {
      throw new Error("Database connection is missing.");
    }

    const updatedProduct = req.body;

    delete updatedProduct._id;

    const result = await db
      .collection("orders")
      .updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: updatedProduct }
      );

    if (result.modifiedCount === 0) {
      return res.status(404).send("Product not found");
    }

    res.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send("Error updating product");
  }
});

module.exports = router;
