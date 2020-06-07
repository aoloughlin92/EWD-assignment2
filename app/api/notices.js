'use strict';

const Notice = require('../models/notice');
const Comment = require('../models/notice');
const Boom = require('@hapi/boom');
const utils = require('./utils.js');

const Notices = {
  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function (request, h) {
      try{
        const notices = await Notice.find();
        return notices;
      }catch(err){
        return Boom.badImplementation('error fetching');
      }
    }
  },
  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const notice = await Notice.findOne({ _id: request.params.id }).populate('user').lean();
        if (!notice) {
          return Boom.notFound('No notice with this id');
        }
        return notice;
      } catch (err){
        return Boom.notFound('No notice with this id');
      }
    }
  },
  create:{
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const userId = utils.getUserIdFromRequest(request);
      let notice = new Notice(request.payload);
      notice.user = userId;
      notice = await notice.save();
      return notice;
    }
  },
  addComment: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request,h){
      const noticeId = request.payload.noticeId;
      const commentId = request.payload.commentId;
      let notice = await Notice.findOne({ _id: noticeId });
      notice.comments.push(commentId);
      notice=await notice.save();
      return notice;
    }
  }
}
module.exports = Notices;