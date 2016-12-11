'use strict';
module.exports = function (sequelize, DataTypes) {
    const BlogPost = sequelize.define('BlogPost', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        domain: {
            allowNull: false,
            type: DataTypes.STRING
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
            associate: function ({BlogPost, Domain, User}) {
                BlogPost.belongsTo(Domain, {foreignKey: 'domain', as: 'home'});
                BlogPost.belongsTo(User, {foreignKey: 'owner', as: 'user'});
            }
        }
    });
    return BlogPost;
};