// imports
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const cookieParser = require("cookie-parser");

app = express();
const authRoute = require("./routes/authRoute");
const { mongo_url, port } = process.env;

// MongoDB Connection
mongoose
  .connect(mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
    // seFindAndModify: false
  })
  .then(() => console.log("MongoDB is connected successfully"))
  .catch(err => console.error(err));

// Port Listen
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
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
