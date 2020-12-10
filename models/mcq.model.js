const mongoose = require('mongoose');

const mcqSchema = new mongoose.Schema({
  sn : {
    type : Number
  },
  question : {
    type :String
  },
  answer : {
    type : String
  },
  option_A : {
    type : String
  },
  option_B : {
    type : String
  },
  option_C : {
    type : String
  },
  option_D : {
    type : String
  }
});

mongoose.model('mcq', mcqSchema);