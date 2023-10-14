const { Router } = require('express');
const { getSSL } = require('../controllers/ssl.controller');
const router = Router();

router.get('/.well-known/pki-validation/3C354193A6BA8D8627B16431AA041FB2.txt', getSSL);

module.exports = router;