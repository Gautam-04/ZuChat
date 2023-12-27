const express = require("express");
const cors = require("cors");
const app = express();
const userRoutes = require("./routes/userRoute");
const dotenv = require("dotenv");
const connectDb = require('./config/db');
dotenv.config();

connectDb();


app.use(cors());
app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/login", (req, res) => {
  res.json({ message: "Hello from server!" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}.`);
});
