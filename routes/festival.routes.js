const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')

const fileUploader = require('../config/cloudinary.config');

/* GET one festival page with ID*/ 
router.get('/festival', (req, res) => {
    res.render('festival/festival');
  });


/* GET add festival*/ 
router.get('/add-festival', isLoggedIn, (req, res, next) => {
    res.render('festival/add-festival');
  });
  
/* POST add festival*/ 
router.post('/add-festival', isLoggedIn, fileUploader.single('image'), async (req, res, next) => {

  const {name, venue, textInfo, genre, date, image, socialMedia} = req.body

  try 
  {
  // Check that name, venue, genre, date are provided
    if (name === '' || venue === '' || genre === '' || date === '') {
      res.status(400).render('festival/add-festival', {
        errorMessage: 'Please provide the name of the festival, venue, genre, date. These fields are mandatory.',
      })
    }

    // Search the database for a festival with the name submitted in the form
    const foundUser = await Festival.findOne({ name })
      // If the festival is found, send the message festival is taken
      if (foundUser) {
        return res.status(400).render('festival/add-festival', { errorMessage: 'Festival already in there.' })
      } else 
      {
          const createdFestival = await Festival.create({
          name,
          venue,
          textInfo,
          genre,
          date,
          image,
          socialMedia
        })
        res.render('festival/festival-added', {createdFestival});
      }
  }
  catch(error) 
  {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).render('festival/add-festival', { errorMessage: error.message })
    }
    return res.status(500).render('festival/add-festival', { errorMessage: error.message })
  }
})

  /* GET edit festival */
  router.get("/edit-festival/:festivalId", isLoggedIn, async (req, res) => {
    const festivalToEdit = await Festival.findById(req.params.festivalId)
    
    const allFestivals = await Festival.find();
    res.render("festival/edit-festival", { festivalToEdit, allFestivals });
  });
  
  /* POST festival edited */
  router.post("/edit-festival/:festivalId", isLoggedIn, fileUploader.single('image'), async (req, res) => {
    console.log('Req body: ', req.body)
    console.log('Req params: ', req.params) 
    const festivalId = req.params.festivalId
    const {name, venue, textInfo, genre, date, imageUrl, socialMedia} = req.body
    const updatedfestival = await Festival.findByIdAndUpdate(festivalId, {name, venue, textInfo, genre, date, imageUrl, socialMedia}, {new: true,});
  res.redirect("/profile/profile");
  });

  module.exports = router