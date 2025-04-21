const path = require("path");
const config = require(path.join(__dirname, "setting.json"));

class DatabaseConnection {
    static getMongoClient() {
        const user = config.mongodb.username;
        const pass = config.mongodb.password;
        const dbName = config.mongodb.database;

        const url = `mongodb+srv://${user}:${pass}@project.89jfuwr.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=Project`;

        const { MongoClient } = require("mongodb");
        const client = new MongoClient(url);
        return client;
    }
}

module.exports = DatabaseConnection;
