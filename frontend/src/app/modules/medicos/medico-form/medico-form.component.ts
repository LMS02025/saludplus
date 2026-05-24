import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MedicosService } from '../../../shared/services/medicos.service';
import { Medico } from '../../../shared/models/medico.model';

@Component({
  selector: 'app-medico-form',
  templateUrl: './medico-form.component.html',
})
export class MedicoFormComponent implements OnInit {
  form!: FormGroup;
  especialidades = ['Medicina General', 'Cardiología', 'Dermatología', 'Neurología', 'Pediatría', 'Traumatología', 'Ginecología', 'Oftalmología'];

  constructor(
    private fb: FormBuilder,
    private medicosService: MedicosService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<MedicoFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Medico | null,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: [this.data?.nombre || '', Validators.required],
      especialidad: [this.data?.especialidad || '', Validators.required],
      email: [this.data?.email || '', Validators.email],
      telefono: [this.data?.telefono || ''],
    });
  }

  guardar() {
    if (this.form.invalid) return;
    const obs = this.data?.id
      ? this.medicosService.update(this.data.id, this.form.value)
      : this.medicosService.create(this.form.value);

    obs.subscribe({
      next: () => {
        this.snackBar.open(this.data ? 'Médico actualizado' : 'Médico creado', 'Cerrar', { duration: 3000 });
        this.dialogRef.close(true);
      },
      error: err => this.snackBar.open('Error: ' + err.error?.error, 'Cerrar', { duration: 4000 }),
    });
  }

  cancelar() {
    this.dialogRef.close(false);
  }
}
