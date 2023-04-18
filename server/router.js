const router = require('express').Router();
const controller = require('./controller');

router.post('/', controller.getReadMe);

module.exports = router;
