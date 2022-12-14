import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudyGroup } from '../models/study_group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private static SERVER_BASE_URL = 'http://localhost/api/v1';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('jwt')}`})
  };

  constructor(
    private http: HttpClient
  ) { }

  public getGroups(): Observable<Array<StudyGroup>> {
    return this.http.get<Array<StudyGroup>>(`${GroupService.SERVER_BASE_URL}/study-groups`, this.httpOptions);
  }
}
