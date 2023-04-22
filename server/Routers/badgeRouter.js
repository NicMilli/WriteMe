const router = require('express').Router();
const controller = require('../Controllers/badgeController');

router.get('/', controller.getBadges);

module.exports = router;
