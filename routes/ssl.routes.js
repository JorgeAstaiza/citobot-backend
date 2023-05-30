const { Router } = require('express');
const { getSSL } = require('../controllers/ssl.controller');
const router = Router();

router.get('/.well-known/pki-validation/2A6C7761D4D4C8DAFD0E56D4048937B4.txt', getSSL);

module.exports = router;
