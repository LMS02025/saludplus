import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitasService, FiltrosCita } from '../../shared/services/citas.service';
import { MedicosService } from '../../shared/services/medicos.service';
import { Cita } from '../../shared/models/cita.model';
import { Medico } from '../../shared/models/medico.model';
import { CitaFormComponent } from './cita-form/cita-form.component';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent implements OnInit {
  citas: Cita[] = [];
  medicos: Medico[] = [];
  displayedColumns = ['paciente', 'medico', 'especialidad', 'fecha', 'hora', 'estado', 'acciones'];
  loading = true;

  filtros: FiltrosCita = {};
  busqueda = '';
  filtroEstado = '';
  filtroMedico: number | undefined;
  filtroEspecialidad = '';

  estados = ['Confirmada', 'Realizada', 'Cancelada'];
  especialidades = ['Medicina General', 'Cardiología', 'Dermatología', 'Neurología', 'Pediatría', 'Traumatología', 'Ginecología', 'Oftalmología'];

  constructor(
    private citasService: CitasService,
    private medicosService: MedicosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.medicosService.getAll().subscribe(m => this.medicos = m);
    this.cargarCitas();
  }

  cargarCitas() {
    this.loading = true;
    const filtros: FiltrosCita = {
      paciente: this.busqueda || undefined,
      medicoId: this.filtroMedico,
      estado: this.filtroEstado || undefined,
      especialidad: this.filtroEspecialidad || undefined,
    };
    this.citasService.getAll(filtros).subscribe(c => {
      this.citas = c;
      this.loading = false;
    });
  }

  abrirFormulario(cita?: Cita) {
    const ref = this.dialog.open(CitaFormComponent, {
      width: '520px',
      data: { cita: cita || null, medicos: this.medicos },
    });
    ref.afterClosed().subscribe(result => {
      if (result) this.cargarCitas();
    });
  }

  cambiarEstado(cita: Cita, estado: string) {
    this.citasService.update(cita.id!, { estado: estado as any }).subscribe(() => {
      this.snackBar.open(`Cita marcada como ${estado}`, 'Cerrar', { duration: 3000 });
      this.cargarCitas();
    });
  }

  cancelar(cita: Cita) {
    if (confirm(`¿Cancelar la cita de ${cita.paciente}?`)) {
      this.citasService.cancelar(cita.id!).subscribe(() => {
        this.snackBar.open('Cita cancelada', 'Cerrar', { duration: 3000 });
        this.cargarCitas();
      });
    }
  }

  limpiarFiltros() {
    this.busqueda = '';
    this.filtroEstado = '';
    this.filtroMedico = undefined;
    this.filtroEspecialidad = '';
    this.cargarCitas();
  }

  colorEstado(estado: string): string {
    switch (estado) {
      case 'Confirmada': return 'primary';
      case 'Realizada': return 'accent';
      case 'Cancelada': return 'warn';
      default: return '';
    }
  }
}
