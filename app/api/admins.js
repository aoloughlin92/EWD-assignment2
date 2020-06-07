'use strict';

const Admin = require('../models/admin');
const Boom = require('@hapi/boom');
const adminUtils = require('./adminutils.js');
const utils = require('./utils.js');

const Admins = {
  find: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const admin = await Admin.find();
      return admin;
    }
  },
  current:{
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const adminId = utils.getAdminIdFromRequest(request);
      const admin = await Admin.findOne({ _id: adminId});
      return admin;
    }
  },
  findOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      try {
        const admin = await Admin.findOne({ _id: request.params.id });
        if (!admin) {
          return Boom.notFound('No Admin with this id');
        }
        return admin;
      } catch (err) {
        return Boom.notFound('No Admin with this id');
      }
    }
  },
  findByEmail: {
    auth: false,
    handler: async function(request, h) {
      try {
        const admin = await Admin.findOne({ email: request.payload });
        if (!admin) {
          return Boom.notFound('No User with this email');
        }
        return admin;
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
      const adminId = utils.getAdminIdFromRequest(request);
      const admin = await Admin.findOne({ _id: adminId });
      admin.firstName = request.payload.firstName;
      admin.lastName = request.payload.lastName;
      admin.email = request.payload.email;
      admin.password = request.payload.password;
      await admin.save();
      return admin;
    }
  },
  create: {
    auth: false,
    handler: async function(request, h) {
      const newAdmin = new Admin(request.payload);
      const admin = await newAdmin.save();
      if (admin) {
        return h.response(admin).code(201);
      }
      return Boom.badImplementation('error creating admin');
    }
  },

  deleteAll: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      await Admin.deleteMany({});
      return { success: true };
    }
  },

  deleteOne: {
    auth: {
      strategy: 'jwt',
    },
    handler: async function(request, h) {
      const admin = await Admin.deleteOne({ _id: request.params.id });
      if (admin) {
        return { success: true };
      }
      return Boom.notFound('id not found');
    }
  },
  authenticate: {
    auth: false,
    handler: async function (request, h) {
      try {
        const admin = await Admin.findOne({ email: request.payload.email });
        if (!admin) {
          return Boom.unauthorized('Admin not found');
        } else if (admin.password !== request.payload.password) {
          return Boom.unauthorized('Invalid password');
        } else {
          const token = adminUtils.createToken(admin);
          return h.response({ success: true, token: token }).code(201);
        }
      } catch (err) {
        return Boom.notFound('internal db failure');
      }
    }
  }
};

module.exports = Admins;