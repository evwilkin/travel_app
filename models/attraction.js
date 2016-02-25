'use strict';
module.exports = function(sequelize, DataTypes) {
  var attraction = sequelize.define('attraction', {
    item: DataTypes.TEXT,
    wishlistId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.attraction.belongsTo(models.wishlist);
        models.attraction.belongsTo(models.category);
      }
    }
  });
  return attraction;
};