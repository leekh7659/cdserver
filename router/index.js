const router = require('express').Router();

router.get('/', (req, res) => {
  res.end('ok');
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/signout', require('./signout'));
router.use('/users', require('./users'));

module.exports = router;
