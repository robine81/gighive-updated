const express = require('express')
const router = express.Router()

const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10

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
});

/* POST edit profile */
router.post("/edit-profile", isLoggedIn, async (req, res) => {
  const sessionId = await req.session.user._id
  const profileToEdit = await User.findById(sessionId)
  res.render("profile/edit-profile", {profileToEdit});
});

/* POST profile edited */
router.post("/profile-edited", isLoggedIn, async (req, res) => {
  // const {name, surname, username, country, email, password} = req.body
  // const { userId } = req.sessionID
  // const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
})

module.exports = router