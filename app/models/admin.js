'use strict';

const Boom = require('@hapi/boom');
const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;
const bcrypt = require('bcrypt');

const adminSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String
});

adminSchema.statics.findByEmail = function(email) {
    return this.findOne({ email : email});
};

adminSchema.methods.comparePassword = async function(candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
};

module.exports = Mongoose.model('Admin', adminSchema);