//import settings
const express = require('express')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config();
var bodyParser = require('body-parser')

//import middleware
const authMiddleware = require('./middleware/auth.middleware.js')

//import routes
const professorsRoute=require("./routes/professor.js")  
const courseRoute=require("./routes/course.js")  

//app setup
const app = express()
const port = 3000
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//db setup and connect
mongoose.connect(`${process.env.mongoURL}`, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


// Handling routes request
app.use("/course",authMiddleware)
app.use("/professor",professorsRoute)
app.use("/course",courseRoute)

//Server start
app.listen(port, () => {
  console.log(`Server started on ${port}`)
})