const express = require('express');
const router = express.Router();

const ciudadanosRoutes = require('./ciudadanos');

router.use('/ciudadanos', ciudadanosRoutes);

module.exports = router;
