import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnService {
  private readonly urlBaseApi: string = 'http://localhost/api/persons';

  constructor(private http: HttpClient) {}

  public get(endpoint: string): Observable<any> {
    return this.http.get(`${this.urlBaseApi}${endpoint}`);
  }

  public post(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.urlBaseApi}${endpoint}`, data);
  }

  public put(endpoint: string, data: any): Observable<any> {
    return this.http.put(`${this.urlBaseApi}${endpoint}`, data);
  }

  public delete(endpoint: string): Observable<any> {
    return this.http.delete(`${this.urlBaseApi}${endpoint}`);
  }
}
