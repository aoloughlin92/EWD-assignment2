'use strict';

const Rating = require('../models/rating');
const Boom = require('@hapi/boom');
const utils = require('./utils.js');

const Ratings = {
  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const ratings = await Rating.find();
      return ratings;
    }
  },
  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const rating = await Rating.findOne({ _id: request.params.id });
        if (!rating) {
          return Boom.notFound('No rating with this id');
        }
        return rating;
      } catch (err){
        return Boom.notFound('No rating with this id');
      }
    }
  },
  create:{
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let rating = new Rating();
      rating.rating = request.payload.rating;
      rating.reviewer = userId;
      rating.review = request.payload.review;
      rating = await rating.save();
      return rating;
    }
  }
}
module.exports = Ratings;