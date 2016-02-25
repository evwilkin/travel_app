'use strict';
module.exports = function(sequelize, DataTypes) {
  var tag = sequelize.define('tag', {
    tagname: DataTypes.TEXT
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.tag.belongsToMany(models.wishlist, {through: "wishlistsTags"});
        models.tag.belongsToMany(models.journal, {through: "wishlistsTags"});
      }
    }
  });
  return tag;
};