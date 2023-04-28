const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

const mongoose = require('mongoose')

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

/* GET home page */
router.get("/", async (req, res, next) => {
  const allFestivals = await Festival.find()

  res.render("index", { allFestivals });
});

/* GET index page */
router.get("/index", (req, res, next) => {
  res.render("index");
});

/* GET search result*/ 
router.get('/search-result', (req, res) => {
  res.render('search-result');
});

module.exports = router;
