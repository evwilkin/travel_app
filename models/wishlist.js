'use strict';
module.exports = function(sequelize, DataTypes) {
  var wishlist = sequelize.define('wishlist', {
    name: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.wishlist.belongsTo(models.user);
        models.wishlist.hasMany(models.attraction);
        models.wishlist.hasMany(models.category);
        models.wishlist.belongsToMany(models.tag, {through: "wishlistsTags"});
      }
    }
  });
  return wishlist;
};