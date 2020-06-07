'use strict';

const ImageStore = require('../utils/image-store');

const POI = require('../models/poi');
const Location = require('../models/location')
const Category = require('../models/category')
const Boom = require('@hapi/boom');
const utils = require('./utils.js');

const POIs = {
  findAll: {
    auth:{
      strategy: 'jwt',
    },

    handler: async function (request, h) {
      try{
        const pois = await POI.find();//.populate('location').lean();
        return pois;

      }catch(err){
        return Boom.badImplementation('error fetching');
      }
    }
  },
  findOne: {
    auth:{
      strategy: 'jwt',
    },
    handler: async function (request, h) {
      try{
        const poi = await POI.findOne({ _id: request.params.id });//.populate('location').lean();
        return poi;
      }catch(err){
        return Boom.badImplementation('error fetching');
      }
    }
  },
  findByCategory: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const pois = await POI.find({ category: request.params.id });
      return pois;
    }
  },
  findByCreator: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const pois = await POI.find({ creator: request.params.id });
      return pois;
    }
  },
  makePOI: {
    auth:
    {
      strategy: 'jwt',
    }
    ,
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let poi = new POI(request.payload);
      const category = await Category.findOne({ _id: request.params.id });
      if (!category) {
        return Boom.notFound('No Category with this id');
      }
      let location = new Location(request.payload.location);
      location = await location.save();
      poi.category = category._id;
      poi.creator = userId;
      poi.location = location;
      poi = await poi.save();
      return poi;
    }
  },
  edit: {
    auth:
    {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      let poi = await POI.findOne({ _id: request.params.id });
      poi.name = request.payload.name;
      poi.description = request.payload.description;
      poi.category = request.payload.category;
      if(request.payload.location != null) {
        poi.location = request.payload.location;
      }
      poi = await poi.save();
      return poi;
    }
  },
  addImage: {
    auth:
    {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      let poi = await POI.findOne({ _id: request.params.id });
      const imageid= request.payload.imageid;
      const imageurl = request.payload.imageurl;
      poi.imageids.push(imageid);
      poi.imageurls.push(imageurl);
      poi = await poi.save();
      return poi;
    }
  },
  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await POI.deleteMany({});
      return { success: true };
    }
  },
  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await POI.deleteOne({_id: request.params.id});
      return { success: true };
    }
  },
  getRatings:{
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      let poi = await POI.findOne({ _id: request.params.id }).populate('ratings');
      let ratings = poi.ratings;
      return ratings;
    }
  },
  addRating:{
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      let poiId = request.payload.poiId;
      let ratingId = request.payload.ratingId;
      let poi = await POI.findOne({ _id: poiId });
      poi.ratings.push(ratingId);
      poi=await poi.save();
      return poi;

    }
  },
  deleteImage:{
    auth: {
      strategy: 'jwt',
    },
    handler: async function (request, h) {
      try{
        const index = request.payload.index;
        const poi = await POI.findById(request.params.id);
        if(index > -1){
          poi.imageids.splice(index,1);
          poi.imageurls.splice(index,1);
        }
        await poi.save();
        return poi;
      }catch(err){
        return ("Error deleting image")
      }
    }
  },
};

module.exports = POIs;