'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    password: DataTypes.TEXT,
    email: DataTypes.TEXT,
    username: DataTypes.TEXT
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