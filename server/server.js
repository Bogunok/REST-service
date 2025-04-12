require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const planetRoutes = require("./routes/planetRoutes");
const starRoutes = require("./routes/starRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error(err));

// Routes
app.use("/api/planets", planetRoutes);
app.use("/api/stars", starRoutes);
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));