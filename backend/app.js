const express = require('express');
const app = express();
const port = 5000;
const mongoose = require("mongoose");
const { mongoUrl } = require("./keys");
const cors = require("cors");

// CORS setup to allow all origins (including your mobile device)
app.use(cors());

// Import models and routes
require('./models/model');
require('./models/post');
app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/createPost"));
app.use(require("./routes/user"));
app.use(require("./routes/category"));

// MongoDB connection
mongoose.connect(mongoUrl);

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo");
});

mongoose.connection.on("error", (err) => {
    console.log("not connected to mongodb", err);
});

// Make sure server listens on all IP addresses, not just localhost
app.listen(port, '0.0.0.0', () => {
    console.log("server is running on port " + port);
});
