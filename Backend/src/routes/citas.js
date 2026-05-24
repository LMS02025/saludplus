const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/citasController');

router.get('/', ctrl.getAll);
router.get('/calendario/:fecha', ctrl.getCalendario);
router.get('/:id', ctrl.getById);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

module.exports = router;
