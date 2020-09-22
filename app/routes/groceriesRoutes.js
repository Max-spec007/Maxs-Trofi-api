const express = require('express')
const passport = require('passport')
const router = express.Router()

const Groceries = require('./../models/groceries')

const handle404 = require('./../../lib/custom_errors')

const requireToken = passport.authenticate('bearer', { session: false })
// index!!
router.get('/groceries', (req, res, next) => {
  // const id = req.params.id
  Groceries.find()
    .populate('user')
    .then(handle404)
    .then(groceries => res.json({ groceries }))
    .catch(next)
})
// .then(restaurants => {
//   res.status(200).json({ restaurants })
// })
// .catch(next)
// })
router.get('/groceries/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Groceries.findById(id)
    .then(grocery => res.json({ grocery }))
    .catch(next)
})
router.post('/groceries', requireToken, (req, res, next) => {
  console.log('It worked!', req.body)
  req.body.groceries.owner = req.user.id
  const groceriesData = req.body.groceries
  Groceries.create(groceriesData)
    .then(grocery =>
      res.status(201).json({ grocery }))
    .catch(next)
})
router.patch('/groceries/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  req.body.groceries.owner = req.user.id
  const groceriesData = req.body.groceries
  Groceries.findById(id)
    .then(handle404)
    .then(grocery => grocery.updateOne(groceriesData))
    .then(grocery => res.json({ grocery }))
    .catch(next)
})
router.delete('/groceries/:id', requireToken, (req, res, next) => {
  const id = req.params.id
  Groceries.findById(id)
    .then(handle404)
    .then(grocery => grocery.deleteOne())
    .then(grocery => res.sendStatus(204))
    .catch(next)
})

module.exports = router
