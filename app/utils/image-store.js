'use strict';

const cloudinary = require('cloudinary');
const fs = require('fs');
const util = require('util');
const writeFile = util.promisify(fs.writeFile);

const ImageStore = {
    configure: function() {
        const credentials = {
            cloud_name: process.env.name,
            api_key: process.env.key,
            api_secret: process.env.secret
        };
        cloudinary.config(credentials);
    },

    getAllImages: async function() {
        const result = await cloudinary.v2.api.resources();
        return result.resources;
    },

    getImageById: async function(imageId){
      const result  = await cloudinary.v2.api.resources_by_ids([imageId]);
      return result.resources;
    },

    getImagesByArray: async function(imageIds){
        const result  = await cloudinary.v2.api.resources_by_ids(imageIds);
        return result.resources;
    },

    uploadImage: async function(imagefile) {
        console.log("IMAGE" + imagefile);
        await writeFile('./public/temp.img', imagefile);
        const response = await cloudinary.uploader.upload('./public/temp.img');
        return response.public_id;
    },
    uploadAPIImage: async function(imagefile) {
        console.log("here"+imagefile);
        await writeFile('./public/temp.img', imagefile);
        const response = await cloudinary.uploader.upload(imagefile);
        return response.public_id;
    },

    deleteImage: async function(id) {
        await cloudinary.v2.uploader.destroy(id, {});
    },

};

module.exports = ImageStore;