const mongoose = require('mongoose')

// require the review schema so we can setup our subdocuments
const listSchema = require('./list')

const groceriesSchema = new mongoose.Schema({
  name: {
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
  // This creates a subdocument relationship, where one restaurant can have many
  // reviews
  list: [listSchema],

  // Add an owner reference, this creates a one-to-many relationship
  // where one User (owner) can have many restaurants
  user: {
    // Best practice: When creating a reference, use the type ObjectId
    type: mongoose.Schema.Types.ObjectId,

    // the ref option, refers to the model's name of this reference
    // Since we want a reference to a user, we type the user model's name (ex. 'User')
    ref: 'User'
  }
}, {
  timestamps: true
})

const Groceries = mongoose.model('Groceries', groceriesSchema)

// module.exports = mongoose.modelmodel('Restaurant', restaurantSchema)

module.exports = Groceries
