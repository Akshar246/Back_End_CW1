const express = require('express');
const router = express.Router();

// Get all orders
router.get("/", async (req, res) => {
    try {
        const orders = await req.app.locals.db.collection("orders").find({}).toArray();
        
        if (orders.length === 0) {
            console.log("No orders found.");
        } else {
            console.log("Orders fetched successfully:", orders);
        }
        
        res.json(orders);  // Send all orders as JSON
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Error fetching orders" });
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
            orderDate: new Date()
        };

        const result = await req.app.locals.db.collection("orders").insertOne(newOrder);

        res.status(201).json(result.insertedId);
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Error creating order" });
    }
});
module.exports = router;

