// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for examples
const Groceries = require('../models/groceries')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { example: { title: '', text: 'foo' } } -> { example: { text: 'foo' } }
// const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

// index!!
router.get('/groceries', requireToken, (req, res, next) => {
  Groceries.find({owner: req.user._id})
    .populate('owner')
    .then(handle404)
    .then(groceries => res.json({ groceries }))
    .catch(next)
})

router.get('/groceries/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Groceries.findById(id)
    .then(grocery => res.json({ grocery }))
    .catch(next)
})
router.post('/groceries', requireToken, (req, res, next) => {
  req.body.groceries.owner = req.user.id
  const groceriesData = req.body.groceries
  Groceries.create(groceriesData)
    .then(grocery =>
      res.status(201).json({ grocery }))
    .catch(next)
})
router.patch('/groceries/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  delete req.body.groceries.owner
  const groceriesData = req.body.groceries

  Groceries.findById(id)
    .then(handle404)
    .then(grocery => {
      requireOwnership(req, grocery)
      return grocery.updateOne(groceriesData)
    })
    .then(grocery => res.json({ grocery }))
    .catch(next)
})
router.delete('/groceries/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Groceries.findById(id)
    .then(handle404)
    .then(grocery => {
      requireOwnership(req, grocery)
      grocery.deleteOne()
    })

    .then(grocery => res.sendStatus(204))
    .catch(next)
})

module.exports = router
