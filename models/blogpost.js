'use strict';
module.exports = function (sequelize, DataTypes) {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        owner: {
            allowNull: false,
            type: DataTypes.STRING
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING
        },
        title: {
            allowNull: false,
            type: DataTypes.STRING
        },
        text: DataTypes.STRING,
        url: DataTypes.STRING
    }, {
        classMethods: {
            associate: function (models) {
                // associations can be defined here
            }
        }
    });
    return BlogPost;
};