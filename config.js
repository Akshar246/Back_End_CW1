
const { MongoClient } = require("mongodb");
const propertiesReader = require("properties-reader");
const path = require("path");

const propertiesPath = path.resolve(__dirname, "conf/db.properties");
const properties = propertiesReader(propertiesPath);

const dbPrefix = properties.get("db.prefix");
const dbUsername = encodeURIComponent(properties.get("db.user"));
const dbPassword = encodeURIComponent(properties.get("db.pwd"));
const dbUrl = properties.get("db.dbUrl");
const dbParams = properties.get("db.params");

const uri = `${dbPrefix}${dbUsername}:${dbPassword}${dbUrl}${dbParams}`;

const client = new MongoClient(uri); // Removed deprecated options

async function connectToDatabase() {
    try {
        await client.connect();
        console.log("Connected to MongoDB successfully!");
        return client.db(properties.get("db.dbName")); // Return the database instance
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
}

module.exports = connectToDatabase;
