'use strict';
module.exports = function (sequelize, DataTypes) {
    const Domain = sequelize.define('Domain', {
        name: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                isAlphanumeric: true,
                len: [1, 128]
            }
        },
        owner: {
            allowNull: false,
            type: DataTypes.STRING
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
    }, {
        classMethods: {
            associate: function ({Domain, User}) {
                Domain.belongsTo(User, {foreignKey: 'owner', as: 'user'});
            }
        }
    });
    return Domain;
};