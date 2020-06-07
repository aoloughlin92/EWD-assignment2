'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const locationSchema = Schema({
  lat: Number,
  lng: Number
});

module.exports = Mongoose.model('Location', locationSchema);