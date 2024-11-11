const { ObjectId } = require("mongodb");
const express = require("express");
const router = express.Router();

// GET all products
router.get("/", async (req, res) => {
    try {
        const db = req.app.locals.db; // Access the db instance
        if (!db) throw new Error("Database connection is missing.");

        const products = await db.collection("products").find({}).toArray();

        // Log each product to the terminal in the specified format
        products.forEach((product) => {
            const formattedLesson = {
                topic: product.name || "unknown",
                location: product.location || "unknown",
                price: product.price || "unknown",
                space: product.availableSpaces || "unknown"
            };
            console.log(JSON.stringify(formattedLesson));
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

// put methods
router.put("/:id", async (req, res) => {
    try {
        const db = req.app.locals.db;
        if (!db) {
            throw new Error("Database connection is missing.");
        }

        const updatedProduct = req.body;

        // Remove _id from the object if it exists
        delete updatedProduct._id;

        const result = await db.collection("products").updateOne(
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
