const { Router } = require('express');
const { getSSL } = require('../controllers/ssl.controller');
const router = Router();

router.get('/.well-known/pki-validation/590FA4162D798F2C4B3DED515776A14B.txt', getSSL);

module.exports = router;
