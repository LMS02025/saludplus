import { Component, OnInit } from '@angular/core';
import { StatsService, Resumen } from '../../shared/services/stats.service';
import { CitasService } from '../../shared/services/citas.service';
import { Cita } from '../../shared/models/cita.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  resumen: Resumen = { citasSemana: 0, citasMes: 0, proximasCitas: 0 };
  proximasCitas: Cita[] = [];
  loading = true;

  constructor(
    private statsService: StatsService,
    private citasService: CitasService,
  ) {}

  ngOnInit() {
    const hoy = new Date().toISOString().split('T')[0];
    this.statsService.getResumen().subscribe(r => {
      this.resumen = r;
    });
    this.citasService.getAll({ fechaInicio: hoy, estado: 'Confirmada' }).subscribe(citas => {
      this.proximasCitas = citas.slice(0, 5);
      this.loading = false;
    });
  }
}
