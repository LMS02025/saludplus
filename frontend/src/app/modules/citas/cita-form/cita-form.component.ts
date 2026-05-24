import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitasService } from '../../../shared/services/citas.service';
import { Cita } from '../../../shared/models/cita.model';
import { Medico } from '../../../shared/models/medico.model';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
})
export class CitaFormComponent implements OnInit {
  form!: FormGroup;
  horas: string[] = [];

  constructor(
    private fb: FormBuilder,
    private citasService: CitasService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CitaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cita: Cita | null; medicos: Medico[] },
  ) {}

  ngOnInit() {
    // Generar horas de 8:00 a 18:00 cada 30 min
    for (let h = 8; h <= 17; h++) {
      this.horas.push(`${String(h).padStart(2, '0')}:00`);
      this.horas.push(`${String(h).padStart(2, '0')}:30`);
    }
    this.horas.push('18:00');

    const cita = this.data.cita;
    this.form = this.fb.group({
      paciente: [cita?.paciente || '', Validators.required],
      medicoId: [cita?.medicoId || '', Validators.required],
      fecha: [cita?.fecha || '', Validators.required],
      hora: [cita?.hora || '', Validators.required],
      motivo: [cita?.motivo || ''],
    });
  }

  guardar() {
    if (this.form.invalid) return;
    const val = this.form.value;
    // Formatear fecha si es objeto Date
    if (val.fecha instanceof Date) {
      val.fecha = val.fecha.toISOString().split('T')[0];
    }

    const obs = this.data.cita?.id
      ? this.citasService.update(this.data.cita.id, val)
      : this.citasService.create(val);

    obs.subscribe({
      next: () => {
        this.snackBar.open(this.data.cita ? 'Cita actualizada' : 'Cita registrada', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: err => this.snackBar.open('Error: ' + (err.error?.error || 'desconocido'), 'Cerrar', { duration: 4000 }),
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
