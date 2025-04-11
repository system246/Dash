const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/user_route.js');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Ensure JSON parsing is set before routes
app.use('/users', router);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((error) => console.log("Database connection error:", error));

app.get('/', (req, res) => {
    res.send("Your API is working");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Your API is running on port ${PORT}`));
