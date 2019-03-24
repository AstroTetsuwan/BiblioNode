var router = require('express').Router();
var loggedIn = require('../../auth/loggedIn');
var userLevel = require('../../auth/userLevel');


router.post('/add', loggedIn, (req, res, next) => {

});

router.post('/update', loggedIn, (req, res, next) => {
    
});

router.get('/delete/:id', loggedIn, userLevel('RESPONSABLE'), (req, res, next) => {
    
});

router.get('/find/:id', loggedIn, (req, res, next) => {
    
});

router.get('/search/:keywords', loggedIn, (req, res, next) => {
    
});

router.get('/update-cotisation', loggedIn, (req, res, next) => {
    
});



module.exports = router;