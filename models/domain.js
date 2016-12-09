'use strict';
module.exports = function (sequelize, DataTypes) {
    const Domain = sequelize.define('Domain', {
        owner: DataTypes.STRING,
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: [1, 128]
            }
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 64]
            }
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 128]
            }
        },
        backgroundImage: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 2000]
            }
        }
    });
    return Domain;
};