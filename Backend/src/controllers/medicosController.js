const { Medico } = require('../models');

// GET /api/medicos
exports.getAll = async (req, res) => {
  try {
    const medicos = await Medico.findAll({ where: { activo: true } });
    res.json(medicos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/medicos/:id
exports.getById = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    res.json(medico);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/medicos
exports.create = async (req, res) => {
  try {
    const medico = await Medico.create(req.body);
    res.status(201).json(medico);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/medicos/:id
exports.update = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    await medico.update(req.body);
    res.json(medico);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/medicos/:id
exports.remove = async (req, res) => {
  try {
    const medico = await Medico.findByPk(req.params.id);
    if (!medico) return res.status(404).json({ error: 'Médico no encontrado' });
    await medico.update({ activo: false });
    res.json({ message: 'Médico desactivado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
