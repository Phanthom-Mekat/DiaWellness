const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const mysql = require("mysql");
const multer = require("multer");
const fs = require("fs");
const path = require('path');
dotenv.config();    
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

// Samin DB
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'dbms_project',
// });
// mekat
// const db = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'dbms_project',
// });
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'samin',
    database: 'dbms_project',
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Configure multer storage for in-memory file storage
const storage = multer.memoryStorage(); // Store files in memory for database insertion

const upload = multer({ 
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: function (req, file, cb) {
        // Accept only PDFs and images
        if (
            file.mimetype === "application/pdf" ||
            file.mimetype === "image/png" ||
            file.mimetype === "image/jpg" ||
            file.mimetype === "image/jpeg"
        ) {
            cb(null, true);
        } else {
            cb(new Error("Only PDF, PNG, JPG, and JPEG files are allowed!"), false);
        }
    }
});

const patientImageStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadDir = './uploads/patients';
        // Create directory if it doesn't exist
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'patient-' + uniqueSuffix + path.extname(file.originalname));
    }
});

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
        }
    }
    
    if (error.message === 'Only image files are allowed') {
        return res.status(400).json({ error: 'Only image files are allowed' });
    }
    
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});


const uploadPatientImage = multer({ 
    storage: patientImageStorage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'), false);
        }
    }
});

app.use('/uploads', express.static('uploads'));

app.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File too large. Maximum size is 5MB.' });
        }
    }
    
    if (error.message === 'Only image files are allowed') {
        return res.status(400).json({ error: 'Only image files are allowed' });
    }
    
    console.error('Unhandled error:', error);
    res.status(500).json({ error: 'Internal server error' });
});
// Existing routes...
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

app.post('/appointments', (req, res) => {
    const { DoctorID: id, email } = req.body; // Frontend sends DoctorID as 'id'

    if (!id || !email) {
        return res.status(400).json({ error: 'Doctor ID and email are required' });
    }

    const visitType = 'Regular Checkup'; // Default visit type

    // Get PatientID from email
    const findPatientQuery = 'SELECT ID FROM tbl_patient WHERE Email = ?';
    db.query(findPatientQuery, [email], (err, results) => {
        if (err) {
            console.error('Error fetching patient:', err);
            return res.status(500).json({ 
                error: 'Database error', 
                details: err.message 
            });
        }

        if (results.length === 0) {
            return res.status(404).json({ 
                error: 'No patient found with the provided email' 
            });
        }

        const PatientID = results[0].ID;

        const insertAppointmentQuery = `
            INSERT INTO tbl_appointment 
            (Appointment_ID, DoctorID, PatientID, \`Visit Type\`) 
            VALUES (NULL, ?, ?, ?)`; // Let DB auto-generate Appointment_ID

        db.query(insertAppointmentQuery, [id, PatientID, visitType], (insertErr, result) => {
            if (insertErr) {
                console.error('Appointment insertion error:', insertErr);
                return res.status(500).json({ 
                    error: 'Failed to create appointment',
                    details: insertErr.message 
                });
            }

            res.status(201).json({
                message: 'Appointment created successfully',
                appointmentId: result.insertId, // This will be the auto-generated Appointment_ID
                doctorId: id,
                patientId: PatientID,
                visitType: visitType
            });
        });
    });
});


app.get('/appointments', (req, res) => {
    // Updated SQL query with Photo included
    const getAppointmentsQuery = `
        SELECT 
            a.Appointment_ID AS AppointmentID,
            d.Name AS DoctorName,
            d.Schedule AS DoctorSchedule,
            d.Email AS DoctorEmail,
            d.Photo AS DoctorPhoto,
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

// Health data endpoints
app.post('/health-data', (req, res) => {
    const { 
        patientId,
        heartRate, 
        temperature, 
        glucoseLevel, 
        spo2, 
        bloodPressureSystolic, 
        bloodPressureDiastolic 
    } = req.body;

    // Validate required fields
    if (!patientId) {
        return res.status(400).json({ error: 'Patient ID is required' });
    }

    // Prepare SQL query
    const insertQuery = `
        INSERT INTO tbl_patient_health_data 
        (PatientID, HeartRate, BodyTemperature, GlucoseLevel, SpO2, BloodPressureSystolic, BloodPressureDiastolic, UpdatedBy)
        VALUES (?, ?, ?, ?, ?, ?, ?, 'patient')
    `;

    // Execute query
    db.query(
        insertQuery,
        [
            patientId,
            heartRate || null,
            temperature || null,
            glucoseLevel || null,
            spo2 || null,
            bloodPressureSystolic || null,
            bloodPressureDiastolic || null
        ],
        (err, result) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ 
                    error: 'Failed to save health data',
                    details: err.message 
                });
            }

            res.status(201).json({
                message: 'Health data saved successfully',
                recordId: result.insertId
            });
        }
    );
});

app.get('/health-data/latest', (req, res) => {
    const { patientId } = req.query;

    if (!patientId) {
        return res.status(400).json({ error: 'Patient ID is required' });
    }

    const sql = `
        SELECT 
            HeartRate, 
            BodyTemperature, 
            GlucoseLevel, 
            SpO2, 
            BloodPressureSystolic, 
            BloodPressureDiastolic,
            Date
        FROM tbl_patient_health_data
        WHERE PatientID = ?
        ORDER BY Date DESC, LastUpdated DESC
        LIMIT 1
    `;

    db.query(sql, [patientId], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                error: 'Failed to fetch health data',
                details: err.message 
            });
        }

        if (results.length === 0) {
            return res.status(404).json({ 
                message: 'No health data found for this patient' 
            });
        }

        res.json(results[0]);
    });
});

app.get('/health-data/history', (req, res) => {
    const { patientId, limit = 7 } = req.query;

    if (!patientId) {
        return res.status(400).json({ error: 'Patient ID is required' });
    }

    const sql = `
        SELECT 
            HeartRate, 
            BodyTemperature, 
            GlucoseLevel, 
            SpO2, 
            BloodPressureSystolic, 
            BloodPressureDiastolic,
            Date
        FROM tbl_patient_health_data
        WHERE PatientID = ?
        ORDER BY Date DESC
        LIMIT ?
    `;

    db.query(sql, [patientId, parseInt(limit)], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ 
                error: 'Failed to fetch health data history',
                details: err.message 
            });
        }

        res.json(results);
    });
});

// NEW API ENDPOINTS FOR MEDICAL REPORTS

// 1. POST endpoint for uploading medical reports
app.post('/api/reports/upload', upload.array('files', 5), (req, res) => {
    try {
        const files = req.files;
        const { date, type, doctor, description, patientId } = req.body;
        
        if (!files || files.length === 0) {
            return res.status(400).json({ error: 'No files uploaded' });
        }
        
        if (!date || !type || !patientId) {
            return res.status(400).json({ error: 'Required fields missing' });
        }
        
        // Since we can store multiple files in the frontend but the table structure has one file per record,
        // we need to process each file separately
        const filePromises = files.map(file => {
            return new Promise((resolve, reject) => {
                // Insert each file as a separate report record
                const insertQuery = `
                    INSERT INTO tbl_medical_reports 
                    (PatientID, ReportDate, DoctorName, ReportType, Description, FileData, FileName, FileType, FileSize) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
                `;
                
                const fileData = file.buffer; // Get file data from memory
                const fileExt = file.originalname.split('.').pop().toLowerCase();
                
                db.query(
                    insertQuery, 
                    [
                        patientId, 
                        date, 
                        doctor || 'Not Specified', 
                        type, 
                        description || '', 
                        fileData,
                        file.originalname,
                        fileExt,
                        file.size
                    ], 
                    (err, result) => {
                        if (err) {
                            reject(err);
                            return;
                        }
                        resolve(result.insertId);
                    }
                );
            });
        });
        
        // Wait for all file insertions to complete
        Promise.all(filePromises)
            .then(reportIds => {
                res.status(201).json({
                    message: 'Reports uploaded successfully',
                    reportIds: reportIds,
                    count: reportIds.length
                });
            })
            .catch(error => {
                console.error('Upload error:', error);
                res.status(500).json({ 
                    error: 'Failed to upload reports', 
                    details: error.message 
                });
            });
    } catch (error) {
        console.error('Upload error:', error);
        res.status(500).json({ 
            error: 'Failed to upload reports', 
            details: error.message 
        });
    }
});

// 2. GET endpoint for retrieving medical reports for a patient (metadata only)
app.get('/api/reports', (req, res) => {
    const { patientId } = req.query;
    
    if (!patientId) {
        return res.status(400).json({ error: 'Patient ID is required' });
    }
    
    // Query to get reports without file data to reduce response size
    const query = `
        SELECT 
            ReportID,
            PatientID,
            ReportDate,
            DoctorName,
            ReportType,
            Description,
            FileName,
            FileType,
            FileSize,
            UploadDate
        FROM 
            tbl_medical_reports
        WHERE 
            PatientID = ?
        ORDER BY 
            ReportDate DESC, UploadDate DESC
    `;
    
    db.query(query, [patientId], (err, results) => {
        if (err) {
            console.error('Reports fetch error:', err);
            return res.status(500).json({ 
                error: 'Failed to retrieve reports', 
                details: err.message 
            });
        }
        
        res.json(results);
    });
});

// 3. GET endpoint for retrieving a single report with file data
app.get('/api/reports/:id', (req, res) => {
    const reportId = req.params.id;
    
    if (!reportId) {
        return res.status(400).json({ error: 'Report ID is required' });
    }
    
    const query = `
        SELECT 
            ReportID,
            PatientID,
            ReportDate,
            DoctorName,
            ReportType,
            Description,
            FileData,
            FileName,
            FileType,
            FileSize,
            UploadDate
        FROM 
            tbl_medical_reports
        WHERE 
            ReportID = ?
    `;
    
    db.query(query, [reportId], (err, results) => {
        if (err) {
            console.error('Report fetch error:', err);
            return res.status(500).json({ 
                error: 'Failed to retrieve report', 
                details: err.message 
            });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }
        
        // Convert binary data to base64 for sending to client
        const report = results[0];
        
        // Send file data as base64
        report.FileData = report.FileData.toString('base64');
        
        res.json(report);
    });
});

// 4. GET endpoint for downloading file data as a file
app.get('/api/reports/:id/download', (req, res) => {
    const reportId = req.params.id;
    
    if (!reportId) {
        return res.status(400).json({ error: 'Report ID is required' });
    }
    
    const query = `
        SELECT 
            FileData,
            FileName,
            FileType
        FROM 
            tbl_medical_reports
        WHERE 
            ReportID = ?
    `;
    
    db.query(query, [reportId], (err, results) => {
        if (err) {
            console.error('Report fetch error:', err);
            return res.status(500).json({ 
                error: 'Failed to retrieve report', 
                details: err.message 
            });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }
        
        const report = results[0];
        const fileData = report.FileData;
        const fileName = report.FileName;
        
        // Set Content-Type based on file type
        let contentType = 'application/octet-stream'; // Default binary
        if (report.FileType === 'pdf') {
            contentType = 'application/pdf';
        } else if (['jpg', 'jpeg', 'png'].includes(report.FileType.toLowerCase())) {
            contentType = `image/${report.FileType.toLowerCase()}`;
        }
        
        // Set headers for file download
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
        res.setHeader('Content-Type', contentType);
        
        // Send the binary file data
        res.send(fileData);
    });
});

// 5. DELETE endpoint for removing reports
app.delete('/api/reports/:id', (req, res) => {
    const reportId = req.params.id;
    
    if (!reportId) {
        return res.status(400).json({ error: 'Report ID is required' });
    }
    
    const deleteQuery = `DELETE FROM tbl_medical_reports WHERE ReportID = ?`;
    
    db.query(deleteQuery, [reportId], (err, result) => {
        if (err) {
            console.error('Report deletion error:', err);
            return res.status(500).json({ 
                error: 'Failed to delete report', 
                details: err.message 
            });
        }
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Report not found' });
        }
        
        res.json({ message: 'Report deleted successfully' });
    });
});


app.post('/users', (req, res) => {
    const { Name, Email, Photo } = req.body;
    if (!Name || !Email || !Photo) {
        return res.status(400).json({ error: 'Name, Email, and Photo are required' });
    }
    // Check if user already exists
    const checkUserQuery = 'SELECT * FROM tbl_patient WHERE Email = ?';
    db.query(checkUserQuery, [Email], (checkErr, checkResults) => {
        if (checkErr) {
            console.error('User check error:', checkErr);
            return res.status(500).json({ error: 'Failed to check user existence' });
        }
        if (checkResults.length > 0) {
            return res.status(409).json({ error: 'User already exists' });
        }
        // Create new user
        const insertUserQuery = `
            INSERT INTO tbl_patient 
            (Name, Email, Photo) 
            VALUES (?, ?, ?)
        `;
        db.query(
            insertUserQuery,
            [Name, Email, Photo],
            (insertErr, result) => {
                if (insertErr) {
                    console.error('User creation error:', insertErr);
                    return res.status(500).json({ 
                        error: 'Failed to create user',
                        details: insertErr.message 
                    });
                }
                res.status(201).json({
                    message: 'User created successfully',
                    userId: result.insertId,
                    name: Name,
                    email: Email,
                    photo: Photo
                });
            }
        );
    });
});

// Check if user exists by email
app.get('/users/:email', (req, res) => {
    const email = req.params.email;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }
    const getUserQuery = 'SELECT * FROM tbl_patient WHERE Email = ?';
    db.query(getUserQuery, [email], (err, results) => {
        if (err) {
            console.error('User fetch error:', err);
            return res.status(500).json({ 
                error: 'Failed to fetch user',
                details: err.message 
            });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = results[0];
        res.json({
            id: user.ID,
            name: user.Name,
            email: user.Email,
            photo: user.Photo
        });
    });
});
app.put('/patients/:email', uploadPatientImage.single('image'), (req, res) => {
    try {
        const patientEmail = req.params.email; // Changed from id to email
        const {
            name,
            email,
            phoneNumber,
            location,
            gender,
            bloodType,
            age
        } = req.body;

        // Enhanced validation
        if (!patientEmail || !name || !email) {
            return res.status(400).json({ error: 'Patient email, name, and email are required' });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: 'Invalid email format' });
        }

        // Validate phone number if provided
        if (phoneNumber && phoneNumber.trim() && !/^\+?[1-9]\d{1,14}$/.test(phoneNumber)) {
            return res.status(400).json({ error: 'Invalid phone number format' });
        }

        // Validate age if provided
        if (age && (parseInt(age) < 0 || parseInt(age) > 120)) {
            return res.status(400).json({ error: 'Age must be between 0 and 120' });
        }

        // Check if patient exists by email
        const checkPatientQuery = 'SELECT * FROM tbl_patient WHERE Email = ?';
        db.query(checkPatientQuery, [patientEmail], (checkErr, checkResults) => {
            if (checkErr) {
                console.error('Patient check error:', checkErr);
                return res.status(500).json({ error: 'Failed to check patient existence' });
            }

            if (checkResults.length === 0) {
                return res.status(404).json({ error: 'Patient not found' });
            }

            const currentPatient = checkResults[0];

            // Check if new email is already taken by another patient (only if email is being changed)
            if (email !== patientEmail) {
                const emailCheckQuery = 'SELECT ID FROM tbl_patient WHERE Email = ? AND Email != ?';
                db.query(emailCheckQuery, [email, patientEmail], (emailErr, emailResults) => {
                    if (emailErr) {
                        console.error('Email check error:', emailErr);
                        return res.status(500).json({ error: 'Failed to validate email' });
                    }

                    if (emailResults.length > 0) {
                        return res.status(400).json({ error: 'Email is already in use by another patient' });
                    }

                    // Proceed with update
                    performUpdate();
                });
            } else {
                // Email not changed, proceed with update
                performUpdate();
            }

            function performUpdate() {
                // Handle image upload
                let photoPath = currentPatient.Photo; // Keep existing photo
                
                if (req.file) {
                    // Delete old photo if it exists and it's not a default photo
                    if (photoPath && !photoPath.startsWith('http') && fs.existsSync(photoPath)) {
                        try {
                            fs.unlinkSync(photoPath);
                        } catch (error) {
                            console.log('Could not delete old photo:', error.message);
                        }
                    }
                    photoPath = `/uploads/patients/${req.file.filename}`;
                }

                // Update patient in database
                const updatePatientQuery = `
                    UPDATE tbl_patient 
                    SET 
                        Name = ?,
                        Email = ?,
                        \`Phone Number\` = ?,
                        Address = ?,
                        Gender = ?,
                        \`Blood Type\` = ?,
                        Age = ?,
                        Photo = ?
                    WHERE 
                        Email = ?
                `;  

                db.query(
                    updatePatientQuery,
                    [
                        name,
                        email,
                        phoneNumber || null,
                        location || null,
                        gender || null,
                        bloodType || null,
                        age ? parseInt(age) : null,
                        photoPath,
                        patientEmail // Use original email for WHERE clause
                    ],
                    (updateErr, result) => {
                        if (updateErr) {
                            console.error('Patient update error:', updateErr);
                            return res.status(500).json({ 
                                error: 'Failed to update patient',
                                details: updateErr.message 
                            });
                        }

                        if (result.affectedRows === 0) {
                            return res.status(404).json({ error: 'Patient not found or no changes made' });
                        }

                        // Return updated patient data in the format expected by frontend
                        res.json({
                            message: 'Patient profile updated successfully',
                            id: currentPatient.ID,
                            name: name,
                            email: email,
                            phoneNumber: phoneNumber || null,
                            location: location || null,
                            gender: gender || null,
                            bloodType: bloodType || null,
                            age: age ? parseInt(age) : null,
                            photo: photoPath
                        });
                    }
                );
            }
        });
    } catch (error) {
        console.error('Patient update error:', error);
        res.status(500).json({ 
            error: 'Failed to update patient',
            details: error.message 
        });
    }
});



// Get patient profile
app.get('/patients/:email', (req, res) => {
    const patientEmail = req.params.email; // Changed from id to email

    if (!patientEmail) {
        return res.status(400).json({ error: 'Patient email is required' });
    }

    const getPatientQuery = 'SELECT * FROM tbl_patient WHERE Email = ?'; // Changed from ID to Email
    
    db.query(getPatientQuery, [patientEmail], (err, results) => {
        if (err) {
            console.error('Patient fetch error:', err);
            return res.status(500).json({ 
                error: 'Failed to fetch patient',
                details: err.message 
            });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Patient not found' });
        }

        const patient = results[0];
        
        // Return data in the format expected by frontend
        res.json({
            id: patient.ID,
            name: patient.Name,
            email: patient.Email,
            phoneNumber: patient.PhoneNumber,
            location: patient.Location,
            gender: patient.Gender,
            bloodType: patient.BloodType,
            age: patient.Age,
            photo: patient.Photo
        });
    });
});

// Fix 4: Add authentication middleware (optional but recommended)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(401);
    }

    // For now, just proceed without actual JWT verification
    // You can implement JWT verification here if needed
    next();
};

app.get("/", (req, res) => {
    res.send("Hello from backend");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});