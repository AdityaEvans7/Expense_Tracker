const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs');
const app = express();

require('dotenv').config();

const PORT = process.env.PORT || 5000;  // Ensure there's a default value for PORT

// Middlewares
app.use(express.json());  // Parse incoming JSON data
app.use(cors());  // Enable CORS

// Routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)));

// Start the server and connect to the database
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

server();
