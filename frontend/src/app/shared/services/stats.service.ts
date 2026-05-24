import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface Resumen {
  citasSemana: number;
  citasMes: number;
  proximasCitas: number;
}

@Injectable({ providedIn: 'root' })
export class StatsService {
  private url = `${environment.apiUrl}/stats`;

  constructor(private http: HttpClient) {}

  getResumen(): Observable<Resumen> {
    return this.http.get<Resumen>(`${this.url}/resumen`);
  }
}
