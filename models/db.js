const express = require('express');
const mongoose = require('mongoose');

var router = express.Router();

const URI = "mongodb+srv://<username>:<password>@cluster0.dawn7.mongodb.net/<databasename>?retryWrites=true&w=majority";

mongoose.connect(URI, {useNewUrlParser : true, useUnifiedTopology : true, useFindAndModify : false}, (err) => {
  if(!err) {
    console.log('Connected to MongoDB Altas database');
  }
  else{
    console.log(`Failed to connect to MongoDB Atlas database : ${err}`);
  }
});

require('./mcq.model');
