const router = require('express').Router();


router.get('/', (req, res) => {
    res.send('Hello World!');
});
router.get('/ping', (req, res) => {
    res.send('pong');
});

router.use('/users', require('./users'));

module.exports = router;
