const express = require('express')
const router = express.Router()

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

/* GET Search page */
router.get('/', async (req, res, next) => {
    const allFestivals = await Festival.find()
    res.render('search-result', {allFestivals});
  })

  module.exports = router