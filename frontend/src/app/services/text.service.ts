import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Text } from '../models/text';

@Injectable({
  providedIn: 'root'
})
export class TextService {

  private static SERVER_BASE_URL = 'http://localhost/api/v1';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}`})
  };

  constructor(
    private http: HttpClient
  ) { }

  public getTexts(): Observable<Array<Text>> {
    return this.http.get<Array<Text>>(`${TextService.SERVER_BASE_URL}/texts`, this.httpOptions);
  }
}
