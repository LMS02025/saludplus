import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Medico } from '../models/medico.model';

@Injectable({ providedIn: 'root' })
export class MedicosService {
  private url = `${environment.apiUrl}/medicos`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Medico[]> {
    return this.http.get<Medico[]>(this.url);
  }

  getById(id: number): Observable<Medico> {
    return this.http.get<Medico>(`${this.url}/${id}`);
  }

  create(medico: Medico): Observable<Medico> {
    return this.http.post<Medico>(this.url, medico);
  }

  update(id: number, medico: Partial<Medico>): Observable<Medico> {
    return this.http.put<Medico>(`${this.url}/${id}`, medico);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }
}
