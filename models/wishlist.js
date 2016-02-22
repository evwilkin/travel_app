'use strict';
module.exports = function(sequelize, DataTypes) {
  var wishlist = sequelize.define('wishlist', {
    name: DataTypes.TEXT,
    category: DataTypes.TEXT,
    item: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.wishlist.belongsTo(models.user);
      }
    }
  });
  return wishlist;
};