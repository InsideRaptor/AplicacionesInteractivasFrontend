import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estante } from '../models/estante';

@Injectable({
  providedIn: 'root'
})
export class EstanteService {

  private url = 'http://localhost:8080/estante'

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url)
  }
  
  add(estante: Estante): Observable<any> {
    return this.http.post(this.url + '/addEstante', estante)
  }
  
  edit(estante: Estante): Observable<any> {
    return this.http.post(this.url + '/' + estante.id + '/update', estante)
  }
  
  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null)
  }
  
}
