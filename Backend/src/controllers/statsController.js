const { Op, fn, col, literal } = require('sequelize');
const { Cita, Medico, sequelize } = require('../models');
const moment = require('moment');

// GET /api/stats/resumen
exports.getResumen = async (req, res) => {
  try {
    const hoy = moment().format('YYYY-MM-DD');
    const inicioSemana = moment().startOf('isoWeek').format('YYYY-MM-DD');
    const finSemana = moment().endOf('isoWeek').format('YYYY-MM-DD');
    const inicioMes = moment().startOf('month').format('YYYY-MM-DD');
    const finMes = moment().endOf('month').format('YYYY-MM-DD');

    const [semana, mes, proximas] = await Promise.all([
      Cita.count({
        where: { fecha: { [Op.between]: [inicioSemana, finSemana] }, estado: { [Op.ne]: 'Cancelada' } },
      }),
      Cita.count({
        where: { fecha: { [Op.between]: [inicioMes, finMes] }, estado: { [Op.ne]: 'Cancelada' } },
      }),
      Cita.count({
        where: { fecha: { [Op.gte]: hoy }, estado: 'Confirmada' },
      }),
    ]);

    res.json({ citasSemana: semana, citasMes: mes, proximasCitas: proximas });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
