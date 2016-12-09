'use strict';
module.exports = function (sequelize, DataTypes) {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        type: {
            allowNull: false,
            type: DataTypes.STRING
        },
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