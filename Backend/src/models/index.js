const sequelize = require('../../config/database');
const Medico = require('./medico');
const Cita = require('./cita');

// Asociaciones
Medico.hasMany(Cita, { foreignKey: 'medicoId', as: 'citas' });
Cita.belongsTo(Medico, { foreignKey: 'medicoId', as: 'medico' });

module.exports = { sequelize, Medico, Cita };
