require('dotenv').config();
const { sequelize, Medico, Cita } = require('./src/models');

async function seed() {
  await sequelize.sync({ force: true });
  console.log('📦 Base de datos limpiada y sincronizada');

  const medicos = await Medico.bulkCreate([
    { nombre: 'Dr. Carlos Mendoza', especialidad: 'Medicina General', email: 'c.mendoza@saludplus.cl', telefono: '+56 9 1111 1111' },
    { nombre: 'Dra. Ana Rodríguez', especialidad: 'Cardiología', email: 'a.rodriguez@saludplus.cl', telefono: '+56 9 2222 2222' },
    { nombre: 'Dr. Jorge Pérez', especialidad: 'Dermatología', email: 'j.perez@saludplus.cl', telefono: '+56 9 3333 3333' },
    { nombre: 'Dra. María Silva', especialidad: 'Pediatría', email: 'm.silva@saludplus.cl', telefono: '+56 9 4444 4444' },
    { nombre: 'Dr. Luis Torres', especialidad: 'Neurología', email: 'l.torres@saludplus.cl', telefono: '+56 9 5555 5555' },
  ]);
  console.log('👨‍⚕️ Médicos creados:', medicos.length);

  const hoy = new Date().toISOString().split('T')[0];
  const manana = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  await Cita.bulkCreate([
    { paciente: 'Luis Medina', medicoId: medicos[0].id, fecha: hoy, hora: '09:00:00', estado: 'Confirmada', motivo: 'Control general' },
    { paciente: 'María López', medicoId: medicos[0].id, fecha: hoy, hora: '10:00:00', estado: 'Confirmada', motivo: 'Gripe' },
    { paciente: 'Pedro Martínez', medicoId: medicos[1].id, fecha: hoy, hora: '09:30:00', estado: 'Confirmada', motivo: 'Control cardíaco' },
    { paciente: 'Ana Soto', medicoId: medicos[2].id, fecha: hoy, hora: '11:00:00', estado: 'Realizada', motivo: 'Revisión piel' },
    { paciente: 'Luis Díaz', medicoId: medicos[0].id, fecha: manana, hora: '08:00:00', estado: 'Confirmada', motivo: 'Chequeo' },
    { paciente: 'Carmen Ruiz', medicoId: medicos[3].id, fecha: manana, hora: '09:00:00', estado: 'Confirmada', motivo: 'Control niño' },
    { paciente: 'Roberto Vega', medicoId: medicos[1].id, fecha: manana, hora: '10:30:00', estado: 'Cancelada', motivo: 'ECG' },
  ]);
  console.log('📅 Citas de ejemplo creadas');
  console.log('✅ Seed completado exitosamente');
  process.exit(0);
}

seed().catch(err => {
  console.error('❌ Error en seed:', err);
  process.exit(1);
});
