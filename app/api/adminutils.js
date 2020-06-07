const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

exports.createToken = function (admin) {
  return jwt.sign({ id: admin._id, email: admin.email }, 'secretpasswordnotrevealedtoanyone', {
    algorithm: 'HS256',
    expiresIn: '1h',
  });
};

exports.decodeToken = function (token) {
  var adminInfo = {};
  try {
    var decoded = jwt.verify(token, 'secretpasswordnotrevealedtoanyone');
    adminInfo.adminId = decoded.id;
    adminInfo.email = decoded.email;
  } catch (e) {
  }

  return adminInfo;
};


