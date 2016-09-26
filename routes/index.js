let express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    res.render('index', {title: 'Express'});
});

/* GET Public Profile */
router.get('/profile', (req, res, next) => {
    res.render('public_profile', {username: 'John Doe', degrees: "Ph.D Fishing"});
});

/* GET Shared User Content. */
router.get('/profile/sharedContent', (req, res, next) => {
    res.render('shared_content');
});

module.exports = router;
