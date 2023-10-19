const express = require('express')
const router = express.Router()

// ℹ️ Handles password encryption
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10

// Require the User model in order to interact with the database
const User = require('../models/User.model')

// Require the Festival model in order to interact with the database
const Festival = require('../models/Festival.model')

// Require necessary (isLoggedOut and isLoggedIn) middleware in order to control access to specific routes
const isLoggedOut = require('../middleware/isLoggedOut')
const isLoggedIn = require('../middleware/isLoggedIn')

// GET /auth/signup
router.get('/signup', isLoggedOut, (req, res) => {
  res.render('auth/signup')
})

// POST /auth/signup
router.post('/signup', isLoggedOut, (req, res) => {
  const { username, email, password } = req.body

  // Check that username, email, and password are provided
  if (username === '' || email === '' || password === '') {
    res.status(400).render('auth/signup', {
      errorMessage: 'All fields are mandatory. Please provide your username, email and password.',
    })

    return
  }

  if (password.length < 6) {
    res.status(400).render('auth/signup', {
      errorMessage: 'Your password needs to be at least 6 characters long.',
    })

    return
  }

  //   ! This regular expression checks password for special characters and minimum length
  /*
  const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
  if (!regex.test(password)) {
    res
      .status(400)
      .render("auth/signup", {
        errorMessage: "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter."
    });
    return;
  }
  */

  // Search the database for a user with the username submitted in the form
  User.findOne({ username }).then(found => {
    // If the user is found, send the message username is taken
    if (found) {
      return res.status(400).render('auth/signup', { errorMessage: 'Username already taken.' })
    }

    // if user is not found, create a new user - start with hashing the password
    return bcrypt
      .genSalt(saltRounds)
      .then(salt => bcrypt.hash(password, salt))
      .then(hashedPassword => {
        // Create a user and save it in the database
        return User.create({
          username,
          email,
          password: hashedPassword,
        })
      })
      .then(user => {
        // Bind the user to the session object
        req.session.user = user
        res.redirect('/')
      })
      .catch(error => {
          // console.error('Here is the errorrrrr: '+ error)
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
  })
})


// GET /auth/login
router.get('/login', isLoggedOut, (req, res) => {
  res.render('auth/login')
})

// POST /auth/login
router.post('/login', isLoggedOut, (req, res, next) => {
  const { username, email, password } = req.body

  console.log('SESSION =====> ', req.session);
 
  if (!username) {
    return res.status(400).render('auth/login', { errorMessage: 'Please provide your username.' })
  }

  // Here we use the same logic as above
  // - either length based parameters or we check the strength of a password
  if (password.length < 8) {
    return res
      .status(400)
      .render('auth/login', {
        errorMessage: 'Your password needs to be at least 8 characters long.',
      })
  }

  // Search the database for a user with the email submitted in the form
  User.findOne({ username })
    .then(user => {
      // If the user isn't found, send an error message that user provided wrong credentials
      if (!user) {
        return res.status(400).render('auth/login', { errorMessage: 'Wrong credentials.' })
      }

      // If user is found based on the username, check if the in putted password matches the one saved in the database
      bcrypt.compare(password, user.password).then(isSamePassword => {
        if (!isSamePassword) {
          return res.status(400).render('auth/login', { errorMessage: 'Wrong credentials.' })
        }

        req.session.user = user
        // req.session.user = user._id; // ! better and safer but in this case we saving the entire user object

        /********************* SHOULD WE redirect to /profile here???? ***************/
        return res.redirect('/profile')
      })
    })

    .catch(err => {
      // in this case we are sending the error handling to the error handling middleware that is defined in the error handling file
      // you can just as easily run the res.status that is commented out below
      next(err)
      // return res.status(500).render("auth/login", { errorMessage: err.message });
    })
})

// GET /logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) {
      res.status(500).render('auth/logout', { errorMessage: err.message })
      return
    }
    res.redirect('/') 
  })
})

module.exports = router