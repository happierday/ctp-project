const express = require('express');
const router  = express.Router();

//login page
router.get('/', (req, res, next) => {
    res.send('This is the login page');
});


module.exports = router;