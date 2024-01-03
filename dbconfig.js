const mongoose = require("mongoose")

mongoose.set("strictQuery", false);

const mongoDB = "mongodb://127.0.0.1/my_database";

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

const dbConnectionOpen = () => {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    db.once('open', () => {
        console.log('Connected to the database!');
    });
}

module.exports = dbConnectionOpen;