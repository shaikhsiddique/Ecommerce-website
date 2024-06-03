const port = 4000;
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Default route
app.get('/', (req, res) => {
    res.send("Server is working");
});

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/Ecommerce", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));

// Multer configuration for image upload
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only images (jpeg, jpg, png, gif) are allowed'));
        }
    }
}).single('product');

// Image upload endpoint
app.post("/upload", (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ success: 0, message: err.message });
        } else {
            if (!req.file) {
                res.status(400).json({ success: 0, message: 'No file uploaded' });
            } else {
                res.status(200).json({
                    success: 1,
                    url: `http://localhost:${port}/images/${req.file.filename}`
                });
            }
        }
    });
});

// Serve uploaded images statically
app.use('/images', express.static('upload/images'));

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
