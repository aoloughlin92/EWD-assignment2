'use strict';

const User = require('../models/user');
const POI = require('../models/poi');
const Notice = require('../models/notice');
const Comment = require('../models/comment');
const Rating = require('../models/rating');
const Boom = require('@hapi/boom');
const utils = require('./utils.js');

const Users = {

  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const users = await User.find();
      return users;
    }
  },
  current:{
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      //const user = this.findOne(userId);
      return userId;
    }
  },
  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const user = await User.findOne({ _id: request.params.id });
        if (!user) {
          return Boom.notFound('No User with this id');
        }
        return user;
      } catch (err) {
        return Boom.notFound('No User with this id');
      }
    }
  },
  findByEmail: {
    auth: false,
    handler: async function(request, h) {
      try {
        const user = await User.findOne({ email: request.payload });
        if (!user) {
          return Boom.notFound('No User with this email');
        }
        return user;
      } catch (err) {
        return Boom.notFound('No User with this email');
      }
    }
  },
  update:{
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const user = await User.findOne({ _id: request.payload.id });
      user.firstName = request.payload.firstName;
      user.lastName = request.payload.lastName;
      user.email = request.payload.email;
      user.password = request.payload.password;
      await user.save();
      return user;
    }
  },
  create: {
    auth: false,
    handler: async function(request, h) {
      const newUser = new User(request.payload);
      const user = await newUser.save();
      if (user) {
        return h.response(user).code(201);
      }
      return Boom.badImplementation('error creating user');
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await User.deleteMany({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await POI.deleteMany({ creator: request.params.id });
      await Notice.deleteMany({ user: request.params.id });
      await Comment.deleteMany({ commenter: request.params.id });
      await Rating.deleteMany({ reviewer: request.params.id });
      const user = await User.deleteOne({ _id: request.params.id });
      if (user) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  },
  authenticate: {
    auth: false,
    handler: async function (request, h) {
      try {
        const user = await User.findOne({ email: request.payload.email });
        if (!user) {
          return Boom.unauthorized('User not found');
        } else if (user.password !== request.payload.password) {
          return Boom.unauthorized('Invalid password');
        } else {
          const token = utils.createToken(user);
          return h.response({ success: true, token: token }).code(201);
        }
      } catch (err) {
        return Boom.notFound('internal db failure');
      }
    }
  }
};

module.exports = Users;