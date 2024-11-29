const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql");
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

// Samin DB
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'diabetes project',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});


app.get('/doctors', (req, res) => {
    const sql = 'SELECT * FROM tbl_doctor';
    db.query(sql, (err, data) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json(err);
        }
        res.json(data);
    });
});

app.get('/appointments', (req, res) => {
    const sql = `
        SELECT 
            a.AppointmentID AS appointmentID,
            d.Name AS doctorName,
            a.Time AS appointmentTime,
            h.Email AS doctorEmail,
            h.PhoneNumber AS doctorPhone
        FROM 
            tbl_appointment a
        JOIN 
            tbl_doctor d ON a.DoctorID = d.DoctorID
        JOIN 
            tbl_healthcare_professionals h ON d.DoctorID = h.ID;
    `;

    db.query(sql, (err, results) => {
        if (err) {
            console.error('Query error:', err.message);
            return res.status(500).json({ error: 'Database query failed', details: err.message });
        }
        res.json(results);
    });
});





app.get("/", (req, res) => {
    res.send("Hello from backend");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})