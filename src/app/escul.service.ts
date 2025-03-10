import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Escultura } from './esculInterface';

@Injectable({
  providedIn: 'root'
})
export class EsculService {
  private apiUrl = 'https://localhost:7097/api/Esculturas';

  constructor(private http: HttpClient) {}

  // Obtener todas las esculturas
  getEsculturas(): Observable<Escultura[]> {
    return this.http.get<Escultura[]>(this.apiUrl);
  }

  // Obtener una escultura por su ID
  getEsculturaById(id: number): Observable<Escultura> {
    return this.http.get<Escultura>(`${this.apiUrl}/${id}`);
  }
}
