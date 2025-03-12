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

  // Obtener esculturas por estado vendido (true o false)
  getEsculturasVendidas(estado: boolean): Observable<Escultura[]> {
    return this.http.get<Escultura[]>(`${this.apiUrl}/vendido/${estado}`);
  }

  // Obtener esculturas que tengan dimensiones definidas (Alto y Ancho)
  getEsculturasConDimensiones(): Observable<Escultura[]> {
    return this.http.get<Escultura[]>(`${this.apiUrl}/dimensiones`);
  }

  // Obtener esculturas por precio exacto
  getEsculturasPorPrecio(precio: string): Observable<Escultura[]> {
    return this.http.get<Escultura[]>(`${this.apiUrl}/precio/${precio}`);
  }

  // Obtener esculturas cuyo nombre contenga una cadena (búsqueda parcial)
  getEsculturasPorNombre(nombre: string): Observable<Escultura[]> {
    return this.http.get<Escultura[]>(`${this.apiUrl}/nombre/${nombre}`);
  }
}