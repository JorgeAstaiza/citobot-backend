const { Router } = require('express');
const { getSSL } = require('../controllers/ssl.controller');
const router = Router();

router.get('/.well-known/pki-validation/F746520E45C85532499CBEA4CA728FF8.txt', getSSL);

module.exports = router;