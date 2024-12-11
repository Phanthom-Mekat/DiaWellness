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
    database: 'dbms_project',
    // database: 'dbms_project'
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

// app.get('/appointments', (req, res) => {
//     const sql = `
//         SELECT 
//             a.AppointmentID AS appointmentID,
//             d.Name AS doctorName,
//             a.Time AS appointmentTime,
//             h.Email AS doctorEmail,
//             h.PhoneNumber AS doctorPhone,
//             d.Images AS doctorImage,
//             a.Date AS appointmentDate
//         FROM 
//             tbl_appointment a
//         JOIN 
//             tbl_doctor d ON a.DoctorID = d.DoctorID
//         JOIN 
//             tbl_healthcare_professionals h ON d.DoctorID = h.ID;
//     `;

//     db.query(sql, (err, results) => {
//         if (err) {
//             console.error('Query error:', err.message);
//             return res.status(500).json({ error: 'Database query failed', details: err.message });
//         }
//         res.json(results);
//     });
// });


// adding to appointment table

// app.post('/appointments', (req, res) => {
//     const { id: doctorID } = req.body; // Extract doctorID from the request body

//     if (!doctorID) {
//         return res.status(400).json({ error: 'Doctor ID is required' });
//     }

//     // Prepare static and dynamic data
//     // Fixed for now
//     const patientID = 20000001; // Static patient ID for now
//     const randomDate = new Date(); // Generate a current random date
//     randomDate.setDate(randomDate.getDate() + Math.floor(Math.random() * 10)); // Random date within 10 days
//     const appointmentDate = randomDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
//     const appointmentTime = `${Math.floor(Math.random() * 12 + 1)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`; // Random time

//     // SQL query for inserting into tbl_appointment
//     const sql = `
//         INSERT INTO tbl_appointment ( Time, Date, DoctorID, PatientID)
//         VALUES ( ?, ?, ?, ?)
//     `;

//     const values = [ appointmentTime, appointmentDate, doctorID, patientID];

//     // Execute the query
//     db.query(sql, values, (err, result) => {
//         if (err) {
//             console.error('Database error:', err);
//             return res.status(500).json({ error: 'Failed to insert appointment' });
//         }

//         console.log('Inserted appointment:', result);

//         res.status(201).json({
//             message: 'Appointment successfully created',
            
//             time: appointmentTime,
//             date: appointmentDate,
//             doctorID,
//             patientID,
//         });
//     });
// });


app.post('/appointments', (req, res) => {
    // Extract required data from request body
    const { DoctorID } = req.body;

    // Validate input
    if (!DoctorID) {
        return res.status(400).json({ 
            error: 'DoctorID is required' 
        });
    }

    // Define Visit Type (since you mentioned giving some value)
    const visitType = 'Regular Checkup';
    const PatientID = 100000;

    // SQL query to insert appointment
    const insertAppointmentQuery = `
        INSERT INTO tbl_appointment 
        (DoctorID, PatientID, \`Visit Type\`) 
        VALUES (?, ?, ?)`;

    // Execute insert query
    db.query(
        insertAppointmentQuery, 
        [DoctorID, PatientID, visitType], 
        (insertErr, result) => {
            if (insertErr) {
                console.error('Appointment insertion error:', insertErr);
                return res.status(500).json({ 
                    error: 'Failed to create appointment',
                    details: insertErr.message 
                });
            }

            // Successful insertion
            res.status(201).json({
                message: 'Appointment created successfully',
                appointmentId: result.insertId,
                doctorId: DoctorID,
                patientId: PatientID,
                visitType: visitType
            });
        }
    );
});

app.get('/appointments', (req, res) => {
    // Updated SQL query with exact column names
    const getAppointmentsQuery = `
        SELECT 
            a.Appointment_ID AS AppointmentID,
            d.Name AS DoctorName,
            d.Schedule AS DoctorSchedule,
            d.Email AS DoctorEmail,
            a.\`Visit Type\` AS VisitType
        FROM 
            tbl_appointment a
        JOIN 
            tbl_doctor d ON a.DoctorID = d.ID
    `;

    // Execute the query
    db.query(getAppointmentsQuery, (err, results) => {
        if (err) {
            console.error('Appointments fetch error:', err);
            return res.status(500).json({ 
                error: 'Failed to retrieve appointments',
                details: err.message 
            });
        }

        // If no appointments found
        if (results.length === 0) {
            return res.status(404).json({ 
                message: 'No appointments found' 
            });
        }

        // Successfully retrieved appointments
        res.json(results);
    });
});




app.get("/", (req, res) => {
    res.send("Hello from backend");
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})