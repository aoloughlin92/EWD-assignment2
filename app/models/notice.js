'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const noticeSchema = Schema({
  heading: String,
  body: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'Comment'
  }]
});

module.exports = Mongoose.model('Notice', noticeSchema);