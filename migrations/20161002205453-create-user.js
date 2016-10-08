'use strict';
module.exports = {
    up: function (queryInterface, Sequelize) {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            externalID: {
                allowNull: false,
                type: Sequelize.STRING,
                unique: true
            },
            email: {
                allowNull: false,
                type: Sequelize.STRING
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            picture: {
                allowNull: false,
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
        return queryInterface.dropTable('Users');
    }
};