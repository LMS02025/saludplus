import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MedicosComponent } from './modules/medicos/medicos.component';
import { CitasComponent } from './modules/citas/citas.component';
import { CalendarioComponent } from './modules/calendario/calendario.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'medicos', component: MedicosComponent },
  { path: 'citas', component: CitasComponent },
  { path: 'calendario', component: CalendarioComponent },
  { path: '**', redirectTo: '/dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
