'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const ratingSchema = Schema({
  rating: Number,
  review: String,
  reviewer: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Mongoose.model('Rating', ratingSchema);