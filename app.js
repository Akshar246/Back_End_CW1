
// app.js
const express = require("express");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const connectToDatabase = require("./config");
const lessonRoutes = require("./routes/lessonRoutes");
const orderRoutes = require("./routes/orderRoutes");
const searchRoutes = require("./routes/searchRoutes");

const app = express();

// Custom Logger Middleware
const loggerMiddleware = (req, res, next) => {
  const method = req.method;
  const url = req.url;

  const query = req.query || {};

  const timestamp = new Date().toISOString();

  console.log(`[${timestamp}] ${method} ${url}`);
  
  if (Object.keys(query).length > 0) {
    console.log(`Query Parameters:`, query);
  } else {
    console.log(`Query Parameters: None`);
  }

  next(); // Call the next middleware or route handler
};

// Middleware
app.use(morgan("short"));
app.use(loggerMiddleware); 
app.use(cors());
app.use(express.json());

// MongoDB Connection
connectToDatabase()
  .then((db) => {
    app.locals.db = db;
    console.log("Database connected and assigned to app.locals.db");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  });

// Serve Static Files
app.use(express.static(path.join(__dirname, "static")));
app.use("/api/images", express.static(path.join(__dirname + "/public/Images/"))); 

// Handle missing images
app.use("/api/images", (req, res) => {
  res.status(404).json({ error: "Image not found" });
});

// API Routes
app.use("/api/products", lessonRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api", searchRoutes);

// Fallback for 404
app.use((req, res) => {
  res.status(404).send("File not found!");
});

// Start the server
http.createServer(app).listen(3000, () => {
  console.log("🌐 Server running at http://localhost:3000/");
});
