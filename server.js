require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const planetRoutes = require("./routes/planetRoutes");
const starRoutes = require("./routes/starRoutes");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB Connected"))
    .catch(err => console.error(err));

app.use("/planets", planetRoutes);
app.use("/stars", starRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
