require('dotenv').load();
var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI);
var companies = db.get("companies");

/* GET home page. */

router.get('/:id', function(req, res, next) {
  companies.findOne({userId: req.params.id}, function(err, doc) {
    if (doc === null) {
      res.status(404).json({error: "No user id matching"});
    }
    res.status(200).json(doc);
  });
});

router.post('/create/:id', function(req, res, next) {
  companies.findOne({userId: req.params.id}, function(err, doc) {
    if (doc === null) {
      companies.insert({userId: req.params.id, companies: []}, function(err, doc) {
        res.end();
      });
    } else {
        res.end();
    }
  });
});

router.post('/delete/:id', function(req, res, next) {
  companies.remove({userId: req.params.id}, function(err, doc) {
    res.end();
  });
});

router.post('/:id', function(req, res, next) {
  companies.findOne({userId: req.params.id}, function(err, doc) {
    var object = doc;
    object.companies.push(req.body);
    companies.findAndModify({userId: req.params.id}, object, function (err, doc) {
      res.end();
    });
  });
});

module.exports = router;
