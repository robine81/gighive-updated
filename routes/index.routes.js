const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

/* GET index page */
router.get("/index", (req, res, next) => {
  res.render("index");
});

/* GET one festival page with ID*/ 
router.get('/festival', (req, res) => {
  res.render('festival');
});

/* GET search result*/ 
router.get('/search-result', (req, res) => {
  res.render('search-result');
});

module.exports = router;
