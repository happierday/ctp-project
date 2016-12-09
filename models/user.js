'use strict';
module.exports = function (sequelize, DataTypes) {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
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