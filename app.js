// app.js
const express = require("express");
const http = require("http");
const path = require("path");
const morgan = require("morgan");
const connectToDatabase = require("./config"); 
const lessonRoutes = require("./routes/lessonRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
app.use(morgan("short"));

app.use(express.json());

connectToDatabase()
    .then((db) => {
        app.locals.db = db; 
        console.log("Database connected and assigned to app.locals.db");
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err);
        process.exit(1);
    });

// Serve static files
app.use(express.static(path.join(__dirname, "static")));

app.use("/api/products", lessonRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
    res.status(404).send("File not found!");
});

http.createServer(app).listen(3000, () => {
    console.log("Server running at http://localhost:3000/");
});
