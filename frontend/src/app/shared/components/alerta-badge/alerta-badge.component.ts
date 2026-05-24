import { Component, OnInit, OnDestroy } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { interval, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-alerta-badge',
  template: `
    <button mat-icon-button [matBadge]="count > 0 ? count : null" matBadgeColor="warn" matTooltip="Citas próximas hoy">
      <mat-icon>notifications</mat-icon>
    </button>
  `,
})
export class AlertaBadgeComponent implements OnInit, OnDestroy {
  count = 0;
  private sub!: Subscription;

  constructor(private citasService: CitasService) {}

  ngOnInit() {
    this.cargar();
    this.sub = interval(60000).subscribe(() => this.cargar());
  }

  cargar() {
    const hoy = new Date().toISOString().split('T')[0];
    this.citasService.getAll({ fechaInicio: hoy, fechaFin: hoy, estado: 'Confirmada' }).subscribe(c => {
      this.count = c.length;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }
}
