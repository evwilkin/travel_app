'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    username: DataTypes.TEXT,
    password: DataTypes.TEXT,
    email: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.user.hasMany(models.wishlist);
        models.user.hasMany(models.journal);
      }
    }
  });
  return user;
};