const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/Database");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/", employeeRoutes);

// app.get("/", (req, res) => {
//   res.send(" Employee Management API is running...");
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Server running on port ${PORT}`));
