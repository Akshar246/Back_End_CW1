const express = require("express");
const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { name, location, price, spaces } = req.query;

    const query = {};

    if (name) {
      query.name = { $regex: new RegExp(name, "i") };
    }

    if (location) {
      query.location = { $regex: new RegExp(location, "i") };
    }

    if (price) {
      const parsedPrice = parseFloat(price); // Parse price from query
      if (!isNaN(parsedPrice)) {
        query.price = { $regex: new RegExp(`^\\D*${parsedPrice}\\D*$`, "i") };
      }
    }

    // Search by exact spaces
    if (spaces) {
      query.availableSpaces = parseInt(spaces);
    }

    const products = await req.app.locals.db
      .collection("products")
      .find(query)
      .toArray();

    if (products.length === 0) {
      return({ message: "No matching products found." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: "An error occurred while searching" });
  }
});

module.exports = router;
