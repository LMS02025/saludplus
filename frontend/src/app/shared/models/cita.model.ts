import { Medico } from './medico.model';

export type EstadoCita = 'Confirmada' | 'Realizada' | 'Cancelada';

export interface Cita {
  id?: number;
  paciente: string;
  medicoId: number;
  medico?: Medico;
  fecha: string;
  hora: string;
  estado?: EstadoCita;
  motivo?: string;
}
