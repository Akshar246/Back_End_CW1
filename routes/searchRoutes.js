const express = require("express");
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { name, location, minPrice, maxPrice, minSpaces, maxSpaces } =
      req.query;

    const query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) {
        query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
        query.price.$lte = parseFloat(maxPrice);
      }
    }

    // Search by available spaces range
    if (minSpaces || maxSpaces) {
      query.availableSpaces = {};
      if (minSpaces) {
        query.availableSpaces.$gte = parseInt(minSpaces);
      }
      if (maxSpaces) {
        query.availableSpaces.$lte = parseInt(maxSpaces);
      }
    }

    // Fetch matching products from MongoDB
    const products = await req.app.locals.db
      .collection("products")
      .find(query)
      .toArray();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error during search:", error);
    res.status(500).json({ error: "An error occurred while searching" });
  }
});

module.exports = router;

module.exports = router;
