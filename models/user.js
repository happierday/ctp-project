'use strict';
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define('User', {
        externalID: DataTypes.STRING,
        email: DataTypes.STRING,
        name: DataTypes.STRING,
        picture: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return User;
};