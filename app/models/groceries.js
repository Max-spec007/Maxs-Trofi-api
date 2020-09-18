const mongoose = require('mongoose')

// require the review schema so we can setup our subdocuments
// const listSchema = require('./list')

const groceryListSchema = new mongoose.Schema({
  nameOfFood: {
    type: String,
    required: true
  },
  dateOfPurchase: {
    type: String,
    required: true
  },
  quantity: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
})

// const Groceries = mongoose.model('Groceries', groceryListSchema)

// module.exports = mongoose.modelmodel('Restaurant', restaurantSchema)

module.exports = mongoose.model('Groceries', groceryListSchema)
