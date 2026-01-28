const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("./db");
const userRoutes = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Koneksi ke MongoDB
connectDB();

// Routes
app.use("/users", userRoutes);

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
