const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')

/* GET one festival page with ID*/ 
router.get('/festival', (req, res) => {
    res.render('festival');
  });


/* GET add festival*/ 
router.get('/add-festival', isLoggedIn, (req, res, next) => {
    res.render('festival/add-festival');
  });
  
  /* POST add festival*/ 
  router.post('/add-festival', isLoggedIn, (req, res, next) => {

    ///////////////////START FROM HERE TO PUT IN THE CORRECT OBJECT////////////////
    const newFestival = req.body
  
    // Check that name, venue, textInfo, genre, date, image, email are provided
    if (name === '' || venue === '' || genre === '' || date === '') {
      res.status(400).render('festival/add-festival', {
        errorMessage: 'These fields are mandatory. Please provide the name of the festival, venue, genre, date',
      })
    }

    /*
    
    // Search the database for a festival with the name submitted in the form
Festival.findOne({ name }).then(found => {
  // If the festival is found, send the message festival is taken
  if (found) {
    return res.status(400).render('auth/add-festival', { errorMessage: 'Festival already in there.' })
  }

Festival.create({
    username,
    email,
    password: hashedPassword,
  })
})
.catch(error => {
  //  console.error(error)
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(400).render('auth/signup', { errorMessage: error.message })
  }
  if (error.code === 11000) {
    return res
      .status(400)
      .render('auth/signup', {
        errorMessage: 'Username need to be unique. The username you chose is already in use.',
      })
  }
  return res.status(500).render('auth/signup', { errorMessage: error.message })
})

    
    
    
    
    
    
    
    */ 

    res.render('festival/festival-added');
  });
  
  
  /* GET edit festival*/ 
  router.get('/edit-festival', isLoggedIn, (req, res, next) => {
    res.render('festival/edit-festival');
  });
  
  
  /* POST edit festival*/ 
  router.post('/edit-festival', isLoggedIn, (req, res, next) => {
    res.render('festival/edit-festival');
  });

  module.exports = router