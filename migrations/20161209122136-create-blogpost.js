'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('BlogPosts', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            owner: {
                allowNull: false,
                type: Sequelize.STRING
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            title: {
                allowNull: false,
                type: Sequelize.STRING
            },
            text: {
                type: Sequelize.STRING
            },
            url: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('BlogPosts');
    }
};