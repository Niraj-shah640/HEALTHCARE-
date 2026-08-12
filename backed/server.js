const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const appointmentRoutes = require("./routes/appointmentRoutes");

const app = express();


// Middleware
app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/healthcare")
    .then(() => {
        console.log("MongoDB Connected");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error);
    });


// Test Route
app.get("/", (req, res) => {

    res.json({
        message: "HealthCare+ API is running"
    });

});


// Appointment Routes
app.use("/api/appointments", appointmentRoutes);


// Start Server
const PORT = 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});