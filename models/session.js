'use strict';
module.exports = function (sequelize, DataTypes) {
    var Session = sequelize.define('Session', {
        data: DataTypes.STRING(50000),
        expires: DataTypes.DATE
    });
    return Session;
};