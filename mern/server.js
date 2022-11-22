const express = require('express');
const connectDB=require('./config/db');
const cors=require("cors");
const route=require("./route")

const app = express();
const bodyParser=require("body-parser")

app.use(cors());
app.use(bodyParser.json())
app.use("/spendings",route)
connectDB();


const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));