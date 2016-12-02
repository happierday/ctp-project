'use strict';
module.exports = function (sequelize, DataTypes) {
    const Session = sequelize.define('Session', {
        data: DataTypes.STRING(50000),
        expires: DataTypes.DATE
    });
    return Session;
};