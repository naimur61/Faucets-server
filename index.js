const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/dbConnect');
const port = process.env.PORT || 4000;
const app = express();
dbConnect();
const authRouter = require("./routes/authRoute");

// const mongoose = require("mongoose");
// const passport = require("passport");
// const passportLocal = require("passport-local");
// const bcrypt = require("bcryptjs");
// const expressSession = require("express-session");
// const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
require('dotenv').config();





app.use(cors());
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/api/user/', authRouter)
app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
   console.log(port, 'is running.');
})