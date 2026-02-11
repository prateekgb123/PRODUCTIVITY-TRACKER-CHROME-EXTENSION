const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/activity", require("./routes/activityRoutes"));
app.use("/api/report", require("./routes/reportRoutes"));

app.listen(5000, () => console.log("Server running on 5000"));
