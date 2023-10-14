const { Router } = require('express');
const { getSSL } = require('../controllers/ssl.controller');
const router = Router();

router.get('/.well-known/pki-validation/E47563CD58A1705D29BB63CBE2714737.txt', getSSL);

module.exports = router;