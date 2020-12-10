const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const mcq = mongoose.model('mcq');

router.get('/createTest', (req, res) => {
  mcq.find(function(err, docs) {
    res.render('createTest', {
      viewTitle : 'Create Test',
      qData : docs,
      sn : docs.length + 1
    });
  });
});

router.post('/save', (req, res) => {
  if(req.body._id == '') {
    saveQuestion(req, res);
  }
  else {
    editQuestion(req, res);
  }
});

router.get('/edit/:id', function(req, res) {
  mcq.findById(req.params.id, function(err, editdoc) {
    if(!err) {
      mcq.find((err, alldoc) => {
        res.render('createTest', {
          viewTitle : 'Edit Question',
          editData : editdoc,
          qData : alldoc,
          sn : editdoc.sn
        });
      });      
    }
    else {
      console.log('Failed to read from database : ' + err);
    }
  });
});

router.get('/delete/:id', function(req, res) {
  mcq.findOneAndRemove({_id : req.params.id}, function(err) {
    if(!err) {
      res.redirect('/createTest');
    }
    else {
      console.log(err);
    }
  })
});

function saveQuestion(req, res) {
  var qData = new mcq();
  qData.sn = req.body.sn;
  qData.question = req.body.question;
  qData.answer = req.body.answer;
  qData.option_A = req.body.optionA;
  qData.option_B = req.body.optionB;
  qData.option_C = req.body.optionC;
  qData.option_D = req.body.optionD;  

  qData.save((err) => {
    if(!err) {
      console.log('Question saved!');
      res.redirect('createTest');
    }
    else {
      console.log('Question failed to saved! : ' + err);
    }
  });
}

function editQuestion(req, res) {
  const query = { _id : req.body._id };
  const updateData = { $set : 
    {
      "sn" : req.body.sn,
      "question" : req.body.question,
      "answer" : req.body.answer,
      "option_A" : req.body.optionA,
      "option_B" : req.body.optionB,
      "option_C" : req.body.optionC,
      "option_D" : req.body.optionD
    }
  };

  mcq.findOneAndUpdate(query, updateData, function(err) {
    if(!err) {
      res.redirect('createTest');
    }
    else {
      console.log('Failed to update question! ' + err);
    }
  });
}

module.exports = router;