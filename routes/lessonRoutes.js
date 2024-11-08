const express = require("express");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        if (!req.db) {
            throw new Error("Database connection is missing.");
        }
        const products = await req.db.collection("products").find({}).toArray();

        // Log each product
        products.forEach((product) => {
            console.log(JSON.stringify({
                topic: product.name || "unknown",
                location: product.location || "unknown",
                price: product.price || "unknown",
                space: product.availableSpaces || "unknown"
            }));
        });

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Error fetching products");
    }
});

// POST a new product
router.post("/", async (req, res) => {
    try {
        if (!req.db) {
            throw new Error("Database connection is missing.");
        }
        const newProduct = req.body;
        const result = await req.db.collection("products").insertOne(newProduct);
        res.status(201).json(result.ops[0]);
    } catch (error) {
        console.error("Error inserting product:", error);
        res.status(500).send("Error inserting product");
    }
});

module.exports = router;
