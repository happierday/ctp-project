'use strict';
module.exports = function (sequelize, DataTypes) {
    var Domain = sequelize.define('Domain', {
        owner: DataTypes.STRING,
        name: DataTypes.STRING,
        title: DataTypes.STRING,
        description: DataTypes.STRING
    });
    return Domain;
};