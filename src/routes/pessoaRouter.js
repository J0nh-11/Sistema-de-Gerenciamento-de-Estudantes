const express = require('express');
const router = express.Router();
const controller_pessoa = require('../controller/controller-pessoa');


router.post('/pessoas', controller_pessoa.create);
router.get('/pessoas', controller_pessoa.list);
router.put('/pessoas', controller_pessoa.update);
router.delete('/pessoas', controller_pessoa.Delete);

module.exports = router;