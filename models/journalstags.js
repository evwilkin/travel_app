'use strict';
module.exports = function(sequelize, DataTypes) {
  var journalsTags = sequelize.define('journalsTags', {
    journalId: DataTypes.INTEGER,
    tagId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return journalsTags;
};