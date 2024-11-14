const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const connectDB = require("./config/db");


dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());


app.listen(precess.env.PORT || 5000,()=> {
    console.log("server is running🥳🥳🥳");
});