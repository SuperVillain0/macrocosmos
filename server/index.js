// imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app = express();
const authRoute = require("./routes/authRoute");
const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

// MongoDB Connection
mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // useFindAndModify: false
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch(err => console.error(err));

// Port Listen
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

// Middlewares
app.use(
  cors({
    origin: [`http://localhost:3000`],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);
