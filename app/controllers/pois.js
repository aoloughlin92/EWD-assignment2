'use strict';
const POI = require('../models/poi');
const User = require('../models/user');

const POIs = {
    home: {
        handler: function(request, h) {
            return h.view('home', { title: 'Create a Point of Interest' });
        }
    },
    view: {
        handler: async function(request, h) {
            const pois = await POI.find().populate('creator').lean();
            return h.view('view', {
                title:'POIs so far',
                pois: pois
            });
        }
    },
    create: {
        handler: async function(request, h){
            try {
                const id = request.auth.credentials.id;
                const user = await User.findById(id);
                const data = request.payload;
                const newPOI = new POI({
                    name: data.name,
                    category: data.category,
                    description: data.description,
                    creator: user._id
                });
                await newPOI.save();
                return h.redirect('/view');
            } catch(err){
                return h.view('main', { errors: [{ message: err.message }] });
            }
        }
    }
};

module.exports = POIs;