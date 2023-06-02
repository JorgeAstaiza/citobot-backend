const { Router } = require('express');
const { getSSL } = require('../controllers/ssl.controller');
const router = Router();

router.get('/.well-known/pki-validation/AC28822CE4F02AE6E290E5322AD73EE8.txt', getSSL);

module.exports = router;