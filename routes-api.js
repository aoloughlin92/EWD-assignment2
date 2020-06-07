const Categories = require('./app/api/categories');
const Users= require('./app/api/users');
const Admins= require('./app/api/admins');
const POIs = require('./app/api/pois');
const Locations = require('./app/api/locations');
const Notices = require('./app/api/notices');
const Ratings = require('./app/api/ratings');
const Comments = require('./app/api/comments');

module.exports = [
  { method: 'GET', path: '/api/categories', config: Categories.find },
  { method: 'GET', path: '/api/categories/{id}', config: Categories.findOne },
  { method: 'POST', path: '/api/categories', config: Categories.create },
  { method: 'DELETE', path: '/api/categories/{id}', config: Categories.deleteOne },
  { method: 'DELETE', path: '/api/categories', config: Categories.deleteAll },

  { method: 'GET', path: '/api/locations', config: Locations.find },
  { method: 'GET', path: '/api/locations/{id}', config: Locations.findOne },

  { method: 'GET', path: '/api/users', config: Users.find },
  { method: 'GET', path: '/api/user', config: Users.current},
  { method: 'GET', path: '/api/users/{id}', config: Users.findOne },
  { method: 'POST', path: '/api/users', config: Users.create },
  { method: 'POST', path: '/api/users/email', config: Users.findByEmail },
  { method: 'POST', path: '/api/user/update', config: Users.update },
  { method: 'DELETE', path: '/api/users/{id}', config: Users.deleteOne },
  { method: 'DELETE', path: '/api/users', config: Users.deleteAll },
  { method: 'POST', path: '/api/users/authenticate', config: Users.authenticate },

  { method: 'POST', path: '/api/admins/authenticate', config: Admins.authenticate },
  { method: 'POST', path: '/api/admins/email', config: Admins.findByEmail },
  { method: 'POST', path: '/api/admin/update', config: Admins.update },
  { method: 'GET', path: '/api/admin', config: Admins.current},


  { method: 'GET', path: '/api/pois', config: POIs.findAll },
  { method: 'GET', path: '/api/pois/{id}', config: POIs.findOne },
  {  method: 'POST', path: '/api/pois/{id}', config: POIs.edit },
  {  method: 'POST', path: '/api/pois/{id}/addimage', config: POIs.addImage },
  { method: 'POST', path: '/api/pois/{id}/deleteimage', config: POIs.deleteImage },
  { method: 'DELETE', path: '/api/pois/{id}', config: POIs.deleteOne },
  { method: 'GET', path: '/api/pois/{id}/ratings', config: POIs.getRatings },
  { method: 'GET', path: '/api/categories/{id}/pois', config: POIs.findByCategory },
  { method: 'GET', path: '/api/users/{id}/pois', config: POIs.findByCreator },
  { method: 'POST', path: '/api/categories/{id}/pois', config: POIs.makePOI },
  { method: 'DELETE', path: '/api/pois', config: POIs.deleteAll },


  { method: 'GET', path: '/api/ratings', config: Ratings.find},
  { method: 'POST', path: '/api/ratings', config: Ratings.create},
  {  method: 'POST', path: '/api/pois/ratings', config: POIs.addRating },

  { method: 'GET', path: '/api/notices', config: Notices.find},
  { method: 'POST', path: '/api/notices', config: Notices.create},
  { method: 'POST', path: '/api/notices/comment', config: Notices.addComment},

  { method: 'GET', path: '/api/comments', config: Comments.find},
  { method: 'POST', path: '/api/comments', config: Comments.create}

  ];