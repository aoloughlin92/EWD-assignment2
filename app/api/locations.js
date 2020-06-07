'use strict';

const Location = require('../models/location');
const Boom = require('@hapi/boom');

const Locations = {
  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const locations = await Location.find();
      return locations;
    }
  },
  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const location = await Location.findOne({ _id: request.params.id });
        if (!location) {
          return Boom.notFound('No location with this id');
        }
        return location;
      } catch (err){
        return Boom.notFound('No location with this id');
      }
    }
  },
}
module.exports = Locations;