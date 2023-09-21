const router = require('express').Router();

router.use('/api-docs', require('./swagger'));
router.get('/', (req, res) => {
    //#swagger.tag=['Hello World]
    res.send('Hello World!');
});
router.get('/ping', (req, res) => {
    res.send('pong');
});

router.use('/users', require('./users'));

module.exports = router;
