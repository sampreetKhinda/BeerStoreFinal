const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a beer
const beerSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  brand: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['Lager', 'Ale', 'Stout', 'Porter', 'Pilsner', 'Wheat', 'Sour', 'Other'],
  },
  alcoholContent: {
    type: Number,
    required: true,
    min: 0,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  },
});

// Middleware to update the updated_at field on save
beerSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

// Create the Beer model using the beerSchema
const Beer = mongoose.model('Beer', beerSchema);

module.exports = Beer;