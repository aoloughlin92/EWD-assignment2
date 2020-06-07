'use strict';

const Comment = require('../models/comment');
const Boom = require('@hapi/boom');
const utils = require('./utils.js');

const Comments = {
  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const comments = await Comment.find();//.populate('commenter').lean();
      return comments;
    }
  },
  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const comment = await Comment.findOne({ _id: request.params.id }).populate('commenter').lean();
        if (!comment) {
          return Boom.notFound('No comment with this id');
        }
        return comment;
      } catch (err){
        return Boom.notFound('No comment with this id');
      }
    }
  },
  create:{
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let comment = new Comment();
      comment.comment = request.payload;
      comment.commenter = userId;
      comment = await comment.save();
      return comment;
    }
  }
}
module.exports = Comments;