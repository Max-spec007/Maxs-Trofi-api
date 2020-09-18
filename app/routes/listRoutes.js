const express = require('express')
const router = express.Router()
// require restaurant model
const Groceries = require('./../models/groceries')
const handle404 = require('./../../lib/custom_errors')
router.post('/groceries', (req, res, next) => {
  // store the incoming request's review data
  const listData = req.body.list
  // extract the restaurant we want to see on the page
  const groceryId = listData.groceryId
  // find the specific restaurant with the id restarantId
  Groceries.findById(groceryId)
    // if we cant find a restaurant, cause a 404 not found error to occur
    .then(handle404)
    .then(groceries => {
      // create a new review, by pushing it into the restaurant's subdocument array
      groceries.list.push(listData)
      // save the restaurant document
      return groceries.save()
    })
    // respond w/ 201 created and our restaurant which contains the new review
    .then(groceries => res.status(201).json({ groceries }))
})
router.delete('/list/:id', (req, res, next) => {
  // extract the review's id
  const listId = req.params.id
  console.log(listId)
  // Find the restaurants, that contains the review we're looking for
  // `'reviews._id': reviewId` means search for a restaurant, that has a review in the `reviews` array
  // with the `_id` of `reviewId`
  Groceries.findOne({ 'list._id': listId })
    // If we cant find a restaurant with the review in it, cause a 404 DocumentNotFoundError
    .then(handle404)
    .then(groceries => {
      // `restaurant.reviews.id(reviewId)` finds the review with the id reviewId
      // then call `.remover` to delete the review
      groceries.list.id(listId).remove()
      // Another syntax to delete our review subdocument
      // restaurant.reviews.pull(reviewId)
      // save our deletion
      return groceries.save()
    })
    // respond with the status 204 no content (there is no cotent, because we deleted the review)
    .then(() => res.sendStatus(204))
    // If an error occurs, call the next middleware, which is the error handler
    .catch(next)
})

// UPDATE a review
// Updating uses the method patch and takes the id of the review we want to update
router.patch('/list/:id', (req, res, next) => {
  const listId = req.params.id

  // extract the review data from the req.body
  const listData = req.body.list

  Groceries.findOne({ 'list._id': listId })
  // cause an error if the restaurant
    .then(handle404)
    .then(groceries => {
      // store the review with the id reviewId
      const review = groceries.list.id(listId)

      // review.title = reviewData.title
      // review.content = reviewData.content

      // set the properties of our review, to be the properties from the incoming
      // request's review data
      review.set(listData)

      // to save the subdocument, you have to save the parent document that owns
      // that document. i.e to save our review, we have to save its parent `restaurant`
      return groceries.save()

      // Does not save. The review is only saved, when the restaurant is saved
      // return review.save()
    })
  // Respond with a 204 no content
    .then(() => res.sendStatus(204))
  // could have also responded with the restaurant that contains an updated review
  // .then(restaurant => res.json({ restaurant }))
  // handle any errors
    .catch(next)
})

// export our router
module.exports = router
