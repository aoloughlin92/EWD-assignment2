'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const commentSchema = Schema({
  comment: String,
  commenter: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
});

module.exports = Mongoose.model('Comment', commentSchema);