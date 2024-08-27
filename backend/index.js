const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const cookieParser = require("cookie-parser");
const expressLayouts = require('express-ejs-layouts');
const path = require("path");


mongoose.connect(process.env.MONGODB_CONNECTION_STRING ).then(console.log("db connected"));

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('stylesheet'));

app.use('/stylesheet', express.static(path.join(__dirname, '../frontend/stylesheet')));
app.set('views', path.join(__dirname, '../frontend/views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);


app.use("/api/auth", authRoutes);
app.use("/user", userRoutes);

app.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/register', (req, res) => {
  res.render('register', { title: 'register' });
});

app.listen(7000, () => {
  console.log("server running on localhost:7000");
});
