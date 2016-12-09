'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('BlogPosts', {
            id: {
                type: Sequelize.STRING,
                primaryKey: true
            },
            type: {
                allowNull: false,
                type: Sequelize.STRING
            },
            url: {
                type: Sequelize.DATE
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