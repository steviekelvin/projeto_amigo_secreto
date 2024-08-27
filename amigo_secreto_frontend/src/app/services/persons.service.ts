import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConnService } from './conn.service';

@Injectable({
  providedIn: 'root',
})
export class PersonsService {
  constructor(private conn: ConnService) {}

  public getPersons(): Observable<any> {
    return this.conn.get('/');
  }

  public getPerson(id: string): Observable<any> {
    return this.conn.get(`/${id}`);
  }

  public createPerson(data: any): Observable<any> {
    return this.conn.post('/', data);
  }

  public updatePerson(id: string, data: any): Observable<any> {
    return this.conn.put(`/${id}`, data);
  }

  public deletePerson(id: string): Observable<any> {
    return this.conn.delete(`/${id}`);
  }

  public change(): Observable<any> {
    return this.conn.get('/change');
  }

  public clear(): Observable<any> {
    return this.conn.get('/clear');
  }
}
