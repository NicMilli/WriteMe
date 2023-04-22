const router = require('express').Router();
const controller = require('../Controllers/formController');

router.post('/', controller.getReadMe);

module.exports = router;
