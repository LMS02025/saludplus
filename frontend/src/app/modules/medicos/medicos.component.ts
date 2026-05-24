import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicosService } from '../../shared/services/medicos.service';
import { Medico } from '../../shared/models/medico.model';
import { MedicoFormComponent } from './medico-form/medico-form.component';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styleUrls: ['./medicos.component.scss'],
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  displayedColumns = ['nombre', 'especialidad', 'email', 'telefono', 'acciones'];
  loading = true;

  constructor(
    private medicosService: MedicosService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this.loading = true;
    this.medicosService.getAll().subscribe(m => {
      this.medicos = m;
      this.loading = false;
    });
  }

  abrirFormulario(medico?: Medico) {
    const ref = this.dialog.open(MedicoFormComponent, {
      width: '480px',
      data: medico || null,
    });
    ref.afterClosed().subscribe(result => {
      if (result) this.cargarMedicos();
    });
  }

  eliminar(medico: Medico) {
    if (confirm(`¿Desactivar al médico ${medico.nombre}?`)) {
      this.medicosService.delete(medico.id!).subscribe(() => {
        this.snackBar.open('Médico desactivado', 'Cerrar', { duration: 3000 });
        this.cargarMedicos();
      });
    }
  }
}
