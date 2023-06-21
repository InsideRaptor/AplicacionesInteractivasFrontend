import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  
  private url = 'http://localhost:8080/libro'

  constructor(private http: HttpClient) {}

  getAll(): Observable<any> {
    return this.http.get(this.url)
  }
  
  add(libro: Libro): Observable<any> {
    return this.http.post(this.url + '/addLibro', libro)
  }
  
  edit(libro: Libro): Observable<any> {
    return this.http.post(this.url + '/' + libro.id + '/update', libro)
  }
  
  delete(id: number): Observable<any> {
    return this.http.post(this.url + '/' + id + '/delete', null)
  }

}
