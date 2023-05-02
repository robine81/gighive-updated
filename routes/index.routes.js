const express = require('express');
const isLoggedIn = require('../middleware/isLoggedIn');
const router = express.Router();

const mongoose = require('mongoose')

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

/* GET home page */
router.get("/", async (req, res, next) => {
  const allFestivals = await Festival.find()

  res.render("index", { allFestivals });
});

module.exports = router;
