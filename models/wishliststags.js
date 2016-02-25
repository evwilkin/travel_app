'use strict';
module.exports = function(sequelize, DataTypes) {
  var wishlistsTags = sequelize.define('wishlistsTags', {
    wishlistId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return wishlistsTags;
};