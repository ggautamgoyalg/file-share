const express = require("express");
const mongo = require("./config/mongodb");
const path = require("path");
const app = express();
const sendEmail = require('./services/email')
require('dotenv').config()

app.use(express.static("public"));
mongo();

// template engine
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

app.use(express.json());
// Routes

app.use("/api/files/send", require("./routes/send"));
app.use("/api/files", require("./routes/files"));
app.use("/files/download", require("./routes/download"));
app.use("/files", require("./routes/show"));
//sendEmail();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`app is running on ${PORT}`);
});
