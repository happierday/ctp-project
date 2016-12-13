'use strict';

module.exports = {
    up: function (queryInterface, Sequelize) {
        /*
         Add altering commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkInsert('Person', [{
         name: 'John Doe',
         isBetaMember: false
         }], {});
         */
        return queryInterface.bulkInsert('Users', userSeeds).then(function () {
            return queryInterface.bulkInsert('Domains', domainSeeds);
        }).then(function () {
            return queryInterface.bulkInsert('BlogPosts', blogPostsSeed);
        });
    },

    down: function (queryInterface, Sequelize) {
        /*
         Add reverting commands here.
         Return a promise to correctly handle asynchronicity.

         Example:
         return queryInterface.bulkDelete('Person', null, {});
         */

        return queryInterface.bulkDelete('Users', userSeeds).then(function () {
            return queryInterface.bulkDelete('Domains', domainSeeds);
        }).then(function () {
            return queryInterface.bulkDelete('BlogPosts', blogPostsSeed);
        });
    }
};

const userSeeds = [{
    id: 'google-oauth2|117765899881245476091',
    email: 'JLAO43941@bths.edu',
    name: 'JOHNNY LAO',
    picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: 'google-oauth2|117765899881245476092',
    email: 'JLAO43942@bths.edu',
    name: 'MAX VALANTE',
    picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: 'google-oauth2|117765899881245476093',
    email: 'JLAO43943@bths.edu',
    name: 'JIANCHENG WU',
    picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: 'google-oauth2|117765899881245476094',
    email: 'JLAO43944@bths.edu',
    name: 'WEI SHI',
    picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: 'google-oauth2|117765899881245476095',
    email: 'JLAO43945@bths.edu',
    name: 'JACK BAUER',
    picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: 'google-oauth2|117765899881245476096',
    email: 'JLAO43946@bths.edu',
    name: 'HUE HONEY',
    picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: 'google-oauth2|117765899881245476097',
    email: 'JLAO43947@bths.edu',
    name: 'VIC VINEGAR',
    picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: 'google-oauth2|117765899881245476098',
    email: 'JLAO43948@bths.edu',
    name: 'GOLDEN GOD',
    picture: 'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg',
    createdAt: new Date(),
    updatedAt: new Date()
}];

const domainSeeds = [{
    name: 'cats',
    owner: 'google-oauth2|117765899881245476091',
    title: 'Cool Cats',
    description: 'Cats',
    backgroundImage: 'https://images.unsplash.com/photo-1467685790346-20bfe73a81f0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=aec75dd3a99a9b6708bedcd9ca55460f',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    name: 'broccoli',
    owner: 'google-oauth2|117765899881245476092',
    title: 'Veggies Lover',
    description: 'Really like veggies',
    backgroundImage: 'https://images.unsplash.com/photo-1423944152736-59d9ce1d6328?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=e06c4a75d25756b63f67fa0bdf7de65a',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    name: 'bringo',
    owner: 'google-oauth2|117765899881245476093',
    title: 'Ringo with a B',
    description: 'Bringo!!!',
    backgroundImage: 'https://images.unsplash.com/photo-1463510700316-7272c1721f86?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=551c9754ce27f0ea6091085b6c11834d',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    name: 'snakeoil',
    owner: 'google-oauth2|117765899881245476094',
    title: 'Get Your Snake Oil Here!',
    description: 'Bringo!!!',
    backgroundImage: 'https://images.unsplash.com/uploads/1412190972423ad18096f/085f9bf0?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=79a8df4d004d1fa851c8ddbabbb13f00',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    name: 'nothing',
    owner: 'google-oauth2|117765899881245476095',
    title: 'Nothing',
    description: "There's nothing here",
    backgroundImage: 'https://images.unsplash.com/photo-1438505111876-3a2fdcf3d0e7?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=ccd4e0d4d62f1cc935d8cd6dfaedb49f',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    name: 'mountains',
    owner: 'google-oauth2|117765899881245476096',
    title: 'Mountain Climbing Club',
    description: 'Nature is neat.',
    backgroundImage: 'https://images.unsplash.com/photo-1451154488477-d20dee2a4e46?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=d5c008c0f29b2c1a4d7386e21ab7dfd1',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    name: 'manlookingatlake',
    owner: 'google-oauth2|117765899881245476097',
    title: "Man looking at lake!",
    description: "There's a man looking at a lake in the background!",
    backgroundImage: 'https://images.unsplash.com/photo-1456428199391-a3b1cb5e93ab?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=3ce83d35c12306fc515b090a3c6f106e',
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    name: 'dogs',
    owner: 'google-oauth2|117765899881245476098',
    title: 'Funny Dogs',
    description: 'Dogs with funny faces.',
    backgroundImage: 'https://images.unsplash.com/photo-1466921583968-f07aa80c526e?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1600&h=900&fit=crop&s=ab8d5effeb725e3e6356006fd0fc6f11',
    createdAt: new Date(),
    updatedAt: new Date()
}];

const blogPostsSeed = [{
    id: '1481659071230-cats',
    domain: 'cats',
    owner: 'google-oauth2|117765899881245476091',
    type: 'text',
    title: 'Cats Are Cool',
    text: 'Yes cats are cool.',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071231-cats',
    domain: 'cats',
    owner: 'google-oauth2|117765899881245476091',
    type: 'text',
    title: 'Also cats are cool',
    text: 'yes!',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071230-broccoli',
    domain: 'broccoli',
    owner: 'google-oauth2|117765899881245476092',
    type: 'text',
    title: 'Really enjoy brocolli',
    text: "Broccoli is mispelled.",
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071232-broccoli',
    domain: 'broccoli',
    owner: 'google-oauth2|117765899881245476092',
    type: 'text',
    title: 'Broc',
    text: 'coli',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071230-bringo',
    domain: 'bringo',
    owner: 'google-oauth2|117765899881245476093',
    type: 'text',
    title: 'bringo',
    text: 'bringo',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071230-snakeoil',
    domain: 'snakeoil',
    owner: 'google-oauth2|117765899881245476094',
    type: 'text',
    title: 'give me your money',
    text: 'fghfgh',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071231-snakeoil',
    domain: 'snakeoil',
    owner: 'google-oauth2|117765899881245476094',
    type: 'text',
    title: 'haha',
    text: 'fghfgh',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071230-mountains',
    domain: 'mountains',
    owner: 'google-oauth2|117765899881245476096',
    type: "text",
    title: "Mountains I don't mind",
    text: 'all of them',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071231-mountains',
    domain: 'mountains',
    owner: 'google-oauth2|117765899881245476096',
    type: 'text',
    title: 'mountains I mind',
    text: 'None',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071231-dogs',
    domain: 'dogs',
    owner: 'google-oauth2|117765899881245476098',
    type: 'text',
    title: 'dogs are great',
    text: 'no debate',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}, {
    id: '1481659071230-dogs',
    domain: 'dogs',
    owner: 'google-oauth2|117765899881245476098',
    type: 'text',
    title: 'great dogs',
    text: 'yes',
    url: null,
    createdAt: new Date(),
    updatedAt: new Date()
}];