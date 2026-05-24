const { DataTypes } = require('sequelize');
const sequelize = require('../../config/database');

const Cita = sequelize.define('Cita', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  paciente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  medicoId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  hora: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Confirmada', 'Realizada', 'Cancelada'),
    defaultValue: 'Confirmada',
  },
  motivo: {
    type: DataTypes.TEXT,
  },
}, {
  tableName: 'citas',
  timestamps: true,
});

module.exports = Cita;
