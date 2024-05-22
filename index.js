require('dotenv').config()
const express = require('express');
var cors = require('cors');
const app = express()
const mongoose = require('mongoose');
const router = require('./routes');
const PORT = process.env.PORT || 3030;

app.use(cors())
app.use(cors())
// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Connect MongoDb 
const DB_URI = process.env.DB_URI
mongoose.connect(DB_URI);
mongoose.connection.on("connected", () => console.log("Connected Mongo db"))
mongoose.connection.on("error", (err) => console.log("error----", err));

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.use(router)

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
});