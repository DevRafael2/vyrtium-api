require("dotenv").config();
const express = require('express'), 
    mongoose = require('mongoose'), 
    cors = require("cors");

const app = express()
app.use(cors());
mongoose.connect(process.env.MONGO_URI)


app.use(express.json());

const routes = require('./src/routes/index-routes')

app.use('', routes);

module.exports = app;