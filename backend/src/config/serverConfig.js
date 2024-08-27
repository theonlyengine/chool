// backend/src/config/serverConfig.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./dbConfig');
const cors = require('cors');

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

module.exports = app;
