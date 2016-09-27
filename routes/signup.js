const express = require('express');
const router = express.Router();

//get into sign up page

router.get('/', (req, res, next) => {
    res.send('this is sign up page');
});

module.exports = router;