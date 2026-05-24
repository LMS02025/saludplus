const { Op } = require('sequelize');
const { Cita, Medico } = require('../models');

// GET /api/citas
exports.getAll = async (req, res) => {
  try {
    const { paciente, medicoId, estado, especialidad, fechaInicio, fechaFin } = req.query;
    const where = {};
    const medicoWhere = {};

    if (paciente) where.paciente = { [Op.iLike]: `%${paciente}%` };
    if (medicoId) where.medicoId = medicoId;
    if (estado) where.estado = estado;
    if (fechaInicio && fechaFin) {
      where.fecha = { [Op.between]: [fechaInicio, fechaFin] };
    } else if (fechaInicio) {
      where.fecha = { [Op.gte]: fechaInicio };
    }
    if (especialidad) medicoWhere.especialidad = { [Op.iLike]: `%${especialidad}%` };

    const citas = await Cita.findAll({
      where,
      include: [{ model: Medico, as: 'medico', where: Object.keys(medicoWhere).length ? medicoWhere : undefined }],
      order: [['fecha', 'ASC'], ['hora', 'ASC']],
    });
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/citas/:id
exports.getById = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id, {
      include: [{ model: Medico, as: 'medico' }],
    });
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    res.json(cita);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST /api/citas
exports.create = async (req, res) => {
  try {
    const { medicoId, fecha, hora } = req.body;

    // Validar solapamiento
    const conflicto = await Cita.findOne({
      where: { medicoId, fecha, hora, estado: { [Op.ne]: 'Cancelada' } },
    });
    if (conflicto) {
      return res.status(409).json({ error: 'El médico ya tiene una cita en ese horario' });
    }

    const cita = await Cita.create(req.body);
    const citaConMedico = await Cita.findByPk(cita.id, {
      include: [{ model: Medico, as: 'medico' }],
    });
    res.status(201).json(citaConMedico);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT /api/citas/:id
exports.update = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });

    // Si se cambia horario, validar solapamiento
    const { medicoId, fecha, hora } = req.body;
    if (medicoId || fecha || hora) {
      const nuevoMedicoId = medicoId || cita.medicoId;
      const nuevaFecha = fecha || cita.fecha;
      const nuevaHora = hora || cita.hora;

      const conflicto = await Cita.findOne({
        where: {
          medicoId: nuevoMedicoId,
          fecha: nuevaFecha,
          hora: nuevaHora,
          estado: { [Op.ne]: 'Cancelada' },
          id: { [Op.ne]: cita.id },
        },
      });
      if (conflicto) {
        return res.status(409).json({ error: 'El médico ya tiene una cita en ese horario' });
      }
    }

    await cita.update(req.body);
    const citaActualizada = await Cita.findByPk(cita.id, {
      include: [{ model: Medico, as: 'medico' }],
    });
    res.json(citaActualizada);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE /api/citas/:id
exports.remove = async (req, res) => {
  try {
    const cita = await Cita.findByPk(req.params.id);
    if (!cita) return res.status(404).json({ error: 'Cita no encontrada' });
    await cita.update({ estado: 'Cancelada' });
    res.json({ message: 'Cita cancelada correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/citas/calendario/:fecha
exports.getCalendario = async (req, res) => {
  try {
    const { medicoId } = req.query;
    const where = { fecha: req.params.fecha };
    if (medicoId) where.medicoId = medicoId;

    const citas = await Cita.findAll({
      where,
      include: [{ model: Medico, as: 'medico' }],
      order: [['hora', 'ASC']],
    });
    res.json(citas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
