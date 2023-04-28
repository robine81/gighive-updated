const express = require('express')
const router = express.Router()

const mongoose = require('mongoose')

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')

/* GET one profile*/ 
router.get('/profile/:profileId', async (req, res) => {
    /* const showProfile = await User.findById (req.params.profileId); */
    /* res.render('profile/profile/'); */
    console.log("in here")
  });

router.post('/profile/:profileId', async (req,res) => {
    /* const editProfile = await User.findByIdAndUpdate (profileId, req.body, {new: true});
    res.render('profile/profile'); */
  })

module.exports = router