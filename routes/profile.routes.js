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
    res.render('profile/profile');
  });

router.post('/profile', async (req,res) => {
    const editProfile = await Usermodel.create(req.body);
  })

module.exports = router