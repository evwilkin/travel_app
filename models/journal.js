'use strict';
module.exports = function(sequelize, DataTypes) {
  var journal = sequelize.define('journal', {
    title: DataTypes.TEXT,
    place: DataTypes.TEXT,
    text: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        models.journal.belongsTo(models.user);
      }
    }
  });
  return journal;
};