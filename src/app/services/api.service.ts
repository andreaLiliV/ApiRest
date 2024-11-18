import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = "http://localhost:3000/locations";

  constructor(private http: HttpClient) { }

  //Método GET
  getUsers(): Observable<any> {
    return this.http.get<any[]>(this.apiUrl);
  }




}
