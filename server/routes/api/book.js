var router = require('express').Router();

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/add', (req, res, next) => {
    res.json({data:'add book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/update/:bookId', (req, res, next) => {
    res.json({data:'update book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.get('/delete/:bookId', (req, res, next) => {
    res.json({data:'delete book'});
});

router.get('/get/:bookId', (req, res, next) => {
    res.json({data:'get book'});
});

router.get('/search/:keywords', (req, res, next) => {
    res.json({data:'search book'});
});

//PROTECTED
router.get('/loan-history/:bookId', (req, res, next) => {
    res.json({data:'loan history book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/add-exemplaire/:bookId', (req, res, next) => {
    res.json({data:'add-exemplaire book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.post('/update-exemplaire/:exemplaireId', (req, res, next) => {
    res.json({data:'add-exemplaire book'});
});

//PROTECTED GESTIONNAIRE DE FONDS
router.get('/delete-exemplaire/:exemplaireId', (req, res, next) => {
    res.json({data:'delete exemplaire book'});
});

module.exports = router;