const { Router } = require('express');
const { consutarEnum } = require('../controllers/enums.controller');

const router = Router();

router.get("/consultar", consutarEnum);

module.exports = router;