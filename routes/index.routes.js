const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

const isLoggedIn = require('../middleware/isLoggedIn');
const isLoggedOut = require('../middleware/isLoggedOut');

/* GET home page */
router.get("/", isLoggedIn, async (req, res, next) => {
  try { 
    const allFestivals = await Festival.find()
    const user = req.session.user._id

    console.log('Is logged in')
    console.log('Here is the session: ', req.session)
    console.log('Here is the user Id: ', req.session.user._id)
    console.log('Here is the user: ', user)

    if(user !== 'undefined') {
      res.render("index", {user, allFestivals});

    } else{
      console.log('Its NOT defined')
      res.render("index", {allFestivals});
    }

    
  } catch(err){
    console.error('There is an error with the index page' , err)
  }
});

router.get("/", isLoggedOut, async (req, res, next) => {
  try { 
    console.log('Is logged out')
    const allFestivals = await Festival.find()
    res.render("index", {allFestivals})
    
  } catch(err){
    console.error('There is an error with the index page' , err)
  }
});

module.exports = router;
