const express = require("express");
const bookedEventRoutes = require("./routes/bookedEventRoutes");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/booked-events", bookedEventRoutes);

module.exports = app;
