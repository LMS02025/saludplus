import { Component, OnInit } from '@angular/core';
import { CitasService } from '../../shared/services/citas.service';
import { MedicosService } from '../../shared/services/medicos.service';
import { Cita } from '../../shared/models/cita.model';
import { Medico } from '../../shared/models/medico.model';

interface HorarioSlot {
  hora: string;
  cita?: Cita;
  disponible: boolean;
}

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss'],
})
export class CalendarioComponent implements OnInit {
  medicos: Medico[] = [];
  medicoSeleccionado?: number;
  fechaSeleccionada: string = new Date().toISOString().split('T')[0];
  slots: HorarioSlot[] = [];
  loading = false;

  constructor(
    private citasService: CitasService,
    private medicosService: MedicosService,
  ) {}

  ngOnInit() {
    this.medicosService.getAll().subscribe(m => {
      this.medicos = m;
      if (m.length > 0) {
        this.medicoSeleccionado = m[0].id;
        this.cargarCalendario();
      }
    });
  }

  cargarCalendario() {
    this.loading = true;
    const horas: string[] = [];
    for (let h = 8; h <= 17; h++) {
      horas.push(`${String(h).padStart(2, '0')}:00:00`);
      horas.push(`${String(h).padStart(2, '0')}:30:00`);
    }
    horas.push('18:00:00');

    this.citasService.getCalendario(this.fechaSeleccionada, this.medicoSeleccionado).subscribe(citas => {
      this.slots = horas.map(hora => {
        const cita = citas.find(c => c.hora === hora || c.hora === hora.substring(0, 5));
        return { hora: hora.substring(0, 5), cita, disponible: !cita };
      });
      this.loading = false;
    });
  }

  onFechaChange(event: any) {
    const d: Date = event.value;
    this.fechaSeleccionada = d.toISOString().split('T')[0];
    this.cargarCalendario();
  }
}
