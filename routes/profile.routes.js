const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')

/* GET one profile*/ 
router.get('/profile', (req, res) => {
  /* const showProfile = await User.findById (req.params.profileId); */
  res.render('profile/profile')
});

  /* GET edit profile*/ 
router.get('/edit-profile', async (req, res) => {
  /* const showProfile = await User.findById (req.params.profileId); */
  //res.render('profile/edit-profile/')
  console.log("GETTTTTTTT")
});

/* POST edit profile */
/*FIX THE ID FOR THE SESSION!!!!!! */
router.post("/edit-profile", async (req, res) => {
  const sessionId = await req.session.user._id
  console.log("Session Iddddd: ", sessionId)
  // const profileToEdit = await User.findById(req.params.sessionId)
  // console.log("here is the user to edit", profileToEdit);
  res.send('edit page')
  // res.render("profile/edit-profile", { profileToEdit });
});

module.exports = router