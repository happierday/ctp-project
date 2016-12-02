'use strict';
module.exports = function (sequelize, DataTypes) {
    var Domain = sequelize.define('Domain', {
        owner: DataTypes.INTEGER,
        name: {
            type: DataTypes.STRING,
            validate: {
                isAlphanumeric: true,
                notNull: true,
                len: [1, 128]
            }
        },
        title: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                len: [1, 64]
            }
        },
        description: {
            type: DataTypes.STRING,
            validate: {
                notNull: true,
                len: [1, 128]
            }
        }
    });
    return Domain;
};