const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
// const mysql = require("mysql");
dotenv.config();    
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// const db = mysql.createConnection({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB,
// });


app.get("/", (req, res) => {
    res.send("Hello from backend");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})