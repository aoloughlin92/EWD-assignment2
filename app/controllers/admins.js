'use strict';
const POI = require('../models/poi');
const User = require('../models/user');
const ImageStore = require('../utils/image-store');
const Admin = require('../models/admin');
const Joi = require('@hapi/joi');
const Category = require('../models/category');

const Admins = {
    home: {
        handler: async function(request, h) {
            try {
                const users = await User.find().lean();
                return h.view('admin', {
                    title: 'View Users',
                    users: users
                });
            }catch(err){
                return h.view('admin', { errors: [{ message: err.message }] });
            }
        }
    },
    categories: {
        handler: async function(request, h) {
            try {
                const categories = await Category.find().lean();
                return h.view('categories', {
                    title: 'View/Create Categories',
                    categories: categories
                });
            }catch(err){
                return h.view('home', { errors: [{ message: err.message }] });
            }
        }
    },
    viewUser: {
        handler: async function(request, h) {
            try{
                const user = await User.findById(request.params.id).lean();
                const pois = await POI.findByCreator(user).populate('creator').populate('category').lean();
                return h.view('viewUser', {
                    title: user.firstName +" "+ user.lastName,
                    user: user,
                    pois: pois
                });
            }catch(err){
                return h.view('admin', { errors: [{ message: err.message }] });
            }
        }
    },
    editUser: {
        handler: async function(request, h) {
            try {
                const user = await User.findById(request.params.id).lean();
                return h.view('editUser', {
                    title: user.firstName +" "+ user.lastName,
                    user: user,
                });
            }catch(err){
                return h.view('admin', { errors: [{ message: err.message }] });
            }
        }
    },




};

module.exports = Admins;