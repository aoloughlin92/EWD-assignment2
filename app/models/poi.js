'use strict';

const Mongoose = require('mongoose');
const Schema = Mongoose.Schema;

const poiSchema = new Schema({
    name: String,
    description: String,
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    creator:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    location:{
        type: Schema.Types.ObjectId,
        ref: 'Location'
    },
    imageids: [String],
    imageurls: [String]
});

poiSchema.statics.findByCreator = function(user) {
    return this.find({ creator: user});
};

poiSchema.statics.findByCategory = function(user, category) {
    return this.find({
        creator: user,
        category: category
    });
};

module.exports = Mongoose.model('POI', poiSchema);