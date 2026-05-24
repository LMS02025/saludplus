import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SaludPlus';
  menuOpen = true;

  navItems = [
    { label: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { label: 'Médicos', icon: 'medical_services', route: '/medicos' },
    { label: 'Citas', icon: 'event', route: '/citas' },
    { label: 'Calendario', icon: 'calendar_month', route: '/calendario' },
  ];
}
