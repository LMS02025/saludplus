import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Cita } from '../models/cita.model';

export interface FiltrosCita {
  paciente?: string;
  medicoId?: number;
  estado?: string;
  especialidad?: string;
  fechaInicio?: string;
  fechaFin?: string;
}

@Injectable({ providedIn: 'root' })
export class CitasService {
  private url = `${environment.apiUrl}/citas`;

  constructor(private http: HttpClient) {}

  getAll(filtros?: FiltrosCita): Observable<Cita[]> {
    let params = new HttpParams();
    if (filtros) {
      Object.entries(filtros).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== '') {
          params = params.set(k, String(v));
        }
      });
    }
    return this.http.get<Cita[]>(this.url, { params });
  }

  getCalendario(fecha: string, medicoId?: number): Observable<Cita[]> {
    let params = new HttpParams();
    if (medicoId) params = params.set('medicoId', medicoId);
    return this.http.get<Cita[]>(`${this.url}/calendario/${fecha}`, { params });
  }

  getById(id: number): Observable<Cita> {
    return this.http.get<Cita>(`${this.url}/${id}`);
  }

  create(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.url, cita);
  }

  update(id: number, cita: Partial<Cita>): Observable<Cita> {
    return this.http.put<Cita>(`${this.url}/${id}`, cita);
  }

  cancelar(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
