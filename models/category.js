'use strict';
module.exports = function(sequelize, DataTypes) {
  var category = sequelize.define('category', {
    categoryname: DataTypes.TEXT,
    wishlistId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.category.belongsTo(models.wishlist);
        models.category.hasMany(models.attraction);
      }
    }
  });
  return category;
};